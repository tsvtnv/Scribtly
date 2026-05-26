"""
extract_emails.py  —  maximum coverage email finder

Per domain, runs ALL of these in order until an email is found:
  1. Scrape 25+ URL paths (incl. EU imprint pages, team, careers)
  2. mailto: link extraction
  3. JSON-LD / schema.org structured data
  4. data-email / data-cfemail attributes
  5. Obfuscated email patterns (at/dot substitutions, HTML entities)
  6. HTTP fallback if HTTPS fails
  7. www. subdomain fallback
  8. SMTP guess — tries 20 common prefixes against the live mail server

All results stored in DB immediately. Resumes safely with --resume.

Usage:
    python3.11 extract_emails.py
    python3.11 extract_emails.py --resume     # skip already-found emails
    python3.11 extract_emails.py --workers 16
"""
import asyncio
import argparse
import csv
import html as html_module
import multiprocessing
import os
import re
import smtplib
import socket
import time
import threading
from pathlib import Path

import aiohttp
import dns.resolver
import psycopg2
import psycopg2.extras
from bs4 import BeautifulSoup


# ── config ────────────────────────────────────────────────────────────────────

def load_env(path=".env.local"):
    result = {}
    try:
        for line in Path(path).read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line: continue
            k, v = line.split("=", 1)
            result[k.strip()] = v.strip().strip('"').strip("'")
    except FileNotFoundError:
        pass
    return result

_env          = load_env()
DATABASE_URL  = _env.get("DATABASE_URL") or os.environ.get("DATABASE_URL", "")
BASE_URL      = (_env.get("SCRIPTER_BASE_URL") or "https://scribtly.com").rstrip("/")

WORKERS        = 16
CONCURRENCY    = 35
DOMAIN_TIMEOUT = 15
OUTPUT_CSV     = "instantly_import.csv"

# 25+ paths covering all common CMS structures + EU legal pages
CONTACT_PATHS = [
    "/contact", "/contact-us", "/contactus", "/contacts",
    "/about", "/about-us", "/aboutus", "/about/contact",
    "/team", "/our-team", "/meet-the-team", "/about/team", "/about-the-team",
    "/people", "/leadership", "/staff", "/founders",
    "/get-in-touch", "/reach-us", "/reach-out", "/connect",
    "/lets-talk", "/talk-to-us", "/say-hello", "/hello",
    "/work-with-us", "/hire-us", "/start-a-project", "/start-project",
    "/partner", "/partnerships", "/new-business",
    "/imprint", "/impressum",   # EU legal pages — often have real emails
    "/company", "/who-we-are",
]

# Standard email regex
EMAIL_RE = re.compile(r"[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}")

# Obfuscated variants
OBFUSCATED_PATTERNS = [
    # info [at] domain.com  /  info (at) domain.com
    re.compile(r"([a-zA-Z0-9._%+\-]+)\s*[\[\(]\s*at\s*[\]\)]\s*([a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})"),
    # info at domain dot com
    re.compile(r"([a-zA-Z0-9._%+\-]+)\s+at\s+([a-zA-Z0-9.\-]+)\s+dot\s+([a-zA-Z]{2,})"),
    # info[at]domain[dot]com
    re.compile(r"([a-zA-Z0-9._%+\-]+)\[at\]([a-zA-Z0-9.\-]+)\[dot\]([a-zA-Z]{2,})"),
]

GENERIC_PREFIXES = {
    "noreply", "no-reply", "donotreply", "postmaster", "abuse",
    "bounce", "mailer", "daemon", "root", "newsletter", "unsubscribe",
    "notification", "notifications", "billing", "invoice", "legal",
}

# Preferred prefixes — tried first when multiple found
PREFERRED_PREFIXES = [
    "contact", "hello", "info", "hi", "team", "media", "press",
    "studio", "agency", "work", "projects",
]

# SMTP guess prefixes — tried in order against mail server
SMTP_GUESSES = [
    "info", "contact", "hello", "hi", "team", "media", "press",
    "studio", "agency", "work", "projects", "business", "enquiries",
    "enquiry", "hey", "sales", "marketing", "digital", "growth",
    "partner", "partnerships", "new-business", "bd",
]

MX_PROVIDERS = [
    (["google.com", "googlemail.com"],                    "Google Workspace"),
    (["outlook.com", "hotmail.com", "microsoft.com",
      "protection.outlook.com"],                          "Microsoft 365"),
    (["zoho.com", "zohomail.com"],                        "Zoho Mail"),
    (["protonmail.ch", "proton.me"],                      "Proton Mail"),
    (["fastmail.com", "fastmail.fm"],                     "Fastmail"),
    (["icloud.com", "apple.com"],                         "Apple iCloud"),
    (["mxroute.com"],                                     "MXroute"),
    (["amazonses.com"],                                   "Amazon SES"),
    (["sendgrid.net"],                                    "SendGrid"),
    (["mailgun.org"],                                     "Mailgun"),
]


def log(msg):
    print(f"[{time.strftime('%H:%M:%S')}] {msg}", flush=True)


# ── DB ─────────────────────────────────────────────────────────────────────────

def fetch_leads(skip_existing=False):
    conn = psycopg2.connect(DATABASE_URL)
    cur  = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    if skip_existing:
        cur.execute('SELECT "leadId","agencyName","agencyWebsite" FROM "ReferralLead" WHERE "contactEmail" IS NULL ORDER BY "createdAt"')
    else:
        cur.execute('SELECT "leadId","agencyName","agencyWebsite" FROM "ReferralLead" ORDER BY "createdAt"')
    rows = [dict(r) for r in cur.fetchall()]
    cur.close(); conn.close()
    return rows


def save_to_db(db_url, lead_id, email, provider, valid_mx):
    conn = psycopg2.connect(db_url)
    try:
        cur = conn.cursor()
        cur.execute(
            'UPDATE "ReferralLead" SET "contactEmail"=%s, "emailProvider"=%s, "emailValidMx"=%s WHERE "leadId"=%s',
            (email, provider, valid_mx, lead_id)
        )
        conn.commit()
        cur.close()
    finally:
        conn.close()


# ── DNS / MX helpers ──────────────────────────────────────────────────────────

_mx_cache: dict[str, list] = {}
_mx_lock  = threading.Lock()

def get_mx_records(domain: str) -> list[str]:
    with _mx_lock:
        if domain in _mx_cache:
            return _mx_cache[domain]
    try:
        records = dns.resolver.resolve(domain, "MX", lifetime=5)
        result  = [str(r.exchange).rstrip(".").lower()
                   for r in sorted(records, key=lambda r: r.preference)]
    except Exception:
        result = []
    with _mx_lock:
        _mx_cache[domain] = result
    return result


def detect_provider(mx_hosts: list[str]) -> str:
    joined = " ".join(mx_hosts)
    for patterns, name in MX_PROVIDERS:
        if any(p in joined for p in patterns):
            return name
    return "Custom / Other"


# ── SMTP verification ─────────────────────────────────────────────────────────

def smtp_verify(email: str, mx_hosts: list[str]) -> bool:
    for mx in mx_hosts[:2]:
        try:
            with smtplib.SMTP(mx, port=25, timeout=6) as smtp:
                smtp.ehlo_or_helo_if_needed()
                smtp.mail("verify@scribtly.com")
                code, _ = smtp.rcpt(email)
                return code in (250, 251, 252)
        except smtplib.SMTPRecipientsRefused:
            return False
        except Exception:
            continue
    return False


def guess_email(domain: str, mx_hosts: list[str]) -> str | None:
    if not mx_hosts:
        return None
    for prefix in SMTP_GUESSES:
        candidate = f"{prefix}@{domain}"
        if smtp_verify(candidate, mx_hosts):
            return candidate
    return None


# ── HTML email extraction ─────────────────────────────────────────────────────

def decode_cloudflare_email(encoded: str) -> str:
    """Decode Cloudflare's data-cfemail obfuscation."""
    try:
        enc = bytes.fromhex(encoded)
        key = enc[0]
        return "".join(chr(b ^ key) for b in enc[1:])
    except Exception:
        return ""


def extract_emails_from_html(html: str, domain: str) -> set[str]:
    emails: set[str] = set()
    if not html:
        return emails

    # Decode HTML entities first
    decoded = html_module.unescape(html)

    # 1. Standard regex
    emails.update(EMAIL_RE.findall(decoded.lower()))

    # 2. Obfuscated patterns
    for pat in OBFUSCATED_PATTERNS:
        for m in pat.finditer(decoded.lower()):
            groups = m.groups()
            if len(groups) == 2:
                emails.add(f"{groups[0]}@{groups[1]}")
            elif len(groups) == 3:
                emails.add(f"{groups[0]}@{groups[1]}.{groups[2]}")

    # 3. BeautifulSoup for structured extraction
    try:
        soup = BeautifulSoup(html, "html.parser")

        # mailto: links
        for a in soup.find_all("a", href=True):
            href = a["href"]
            if href.startswith("mailto:"):
                addr = href[7:].split("?")[0].strip().lower()
                if "@" in addr:
                    emails.add(addr)

        # data-email attributes (common obfuscation)
        for el in soup.find_all(attrs={"data-email": True}):
            val = el["data-email"].strip().lower()
            if "@" in val:
                emails.add(val)

        # Cloudflare email obfuscation
        for el in soup.find_all(attrs={"data-cfemail": True}):
            decoded_email = decode_cloudflare_email(el["data-cfemail"])
            if "@" in decoded_email:
                emails.add(decoded_email.lower())

        # JSON-LD structured data
        import json
        for script in soup.find_all("script", type="application/ld+json"):
            try:
                data = json.loads(script.string or "")
                # Flatten JSON and search for email keys
                def find_emails_in_obj(obj):
                    if isinstance(obj, dict):
                        for k, v in obj.items():
                            if k.lower() in ("email", "contactemail") and isinstance(v, str) and "@" in v:
                                emails.add(v.lower())
                            find_emails_in_obj(v)
                    elif isinstance(obj, list):
                        for item in obj:
                            find_emails_in_obj(item)
                find_emails_in_obj(data)
            except Exception:
                pass

        # meta tags with email
        for meta in soup.find_all("meta"):
            content = meta.get("content", "")
            if "@" in content:
                emails.update(EMAIL_RE.findall(content.lower()))

    except Exception:
        pass

    return emails


def pick_email(emails: set[str], domain: str) -> str | None:
    domain_emails = {
        e for e in emails
        if e.split("@")[-1] == domain or e.split("@")[-1].endswith("." + domain)
    }
    domain_emails = {e for e in domain_emails if e.split("@")[0] not in GENERIC_PREFIXES}
    if not domain_emails:
        return None
    for prefix in PREFERRED_PREFIXES:
        for e in domain_emails:
            if e.split("@")[0] == prefix:
                return e
    return sorted(domain_emails)[0]


# ── async fetching ────────────────────────────────────────────────────────────

async def fetch_page(session, url):
    try:
        async with session.get(
            url,
            timeout=aiohttp.ClientTimeout(total=8),
            allow_redirects=True,
            headers={
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5",
            },
        ) as r:
            if r.status >= 400:
                return ""
            return await r.text(encoding="utf-8", errors="ignore")
    except Exception:
        return ""


async def scrape_domain(session, domain) -> str | None:
    # Try https first, then http as fallback
    for scheme in ("https", "http"):
        base = f"{scheme}://{domain}"
        urls = [base] + [f"{base}{p}" for p in CONTACT_PATHS]
        try:
            pages = await asyncio.wait_for(
                asyncio.gather(*[fetch_page(session, u) for u in urls]),
                timeout=DOMAIN_TIMEOUT,
            )
        except asyncio.TimeoutError:
            continue

        all_emails: set[str] = set()
        for html in pages:
            all_emails.update(extract_emails_from_html(html, domain))
        email = pick_email(all_emails, domain)
        if email:
            return email

    # www. subdomain fallback (if domain doesn't start with www.)
    if not domain.startswith("www."):
        www_domain = f"www.{domain}"
        try:
            pages = await asyncio.wait_for(
                asyncio.gather(*[fetch_page(session, f"https://{www_domain}{p}") for p in ["", "/contact", "/about"]]),
                timeout=10,
            )
            all_emails = set()
            for html in pages:
                all_emails.update(extract_emails_from_html(html, domain))
            email = pick_email(all_emails, domain)
            if email:
                return email
        except Exception:
            pass

    return None


# ── worker ────────────────────────────────────────────────────────────────────

def worker(leads_chunk: list, worker_id: int, result_queue: multiprocessing.Queue,
           resume_set: set, db_url: str):
    async def run():
        connector = aiohttp.TCPConnector(limit=CONCURRENCY, ttl_dns_cache=300)
        semaphore = asyncio.Semaphore(CONCURRENCY)
        found_count = 0

        async with aiohttp.ClientSession(connector=connector) as session:
            async def process(lead):
                nonlocal found_count
                website = lead["agencyWebsite"]
                if website in resume_set:
                    return
                domain = website.replace("https://", "").replace("http://", "").rstrip("/")

                async with semaphore:
                    email = await scrape_domain(session, domain)

                # SMTP guess if scraping came up empty
                if not email:
                    mx = await asyncio.get_event_loop().run_in_executor(None, get_mx_records, domain)
                    if mx:
                        email = await asyncio.get_event_loop().run_in_executor(None, guess_email, domain, mx)

                if email:
                    email_domain = email.split("@")[-1]
                    mx = await asyncio.get_event_loop().run_in_executor(None, get_mx_records, email_domain)
                    valid    = len(mx) > 0
                    provider = detect_provider(mx) if valid else "Invalid MX"
                    first_name = (lead["agencyName"] or "").split()[0] or "there"
                    try:
                        save_to_db(db_url, lead["leadId"], email, provider, valid)
                    except Exception:
                        pass
                    found_count += 1
                    result_queue.put({
                        "email":      email,
                        "first_name": first_name,
                        "website":    website,
                        "ref_url":    f"{BASE_URL}/ref/{lead['leadId']}",
                        "provider":   provider,
                        "valid_mx":   "yes" if valid else "no",
                    })
                else:
                    result_queue.put(None)

            await asyncio.gather(*[process(l) for l in leads_chunk])
        result_queue.put(f"DONE:{worker_id}:{found_count}")

    asyncio.run(run())


# ── main ──────────────────────────────────────────────────────────────────────

def main(num_workers: int, resume: bool):
    # Always skip leads that already have an email in DB
    leads = fetch_leads(skip_existing=True)
    log(f"Leads without email in DB: {len(leads)}")

    resume_set = set()
    if resume and Path(OUTPUT_CSV).exists():
        with open(OUTPUT_CSV, newline="", encoding="utf-8") as f:
            for row in csv.DictReader(f):
                resume_set.add(row.get("website", ""))
        log(f"Also skipping {len(resume_set)} already in CSV")

    todo = [l for l in leads if l["agencyWebsite"] not in resume_set]
    log(f"{len(todo)} domains to process across {num_workers} workers")
    if not todo:
        log("Nothing to do!")
        return

    chunk_size = max(1, len(todo) // num_workers)
    chunks     = [todo[i:i + chunk_size] for i in range(0, len(todo), chunk_size)]

    q: multiprocessing.Queue = multiprocessing.Queue()
    procs = [
        multiprocessing.Process(target=worker, args=(chunk, i, q, resume_set, DATABASE_URL))
        for i, chunk in enumerate(chunks)
    ]
    for p in procs: p.start()
    log(f"Spawned {len(procs)} workers | methods: scrape(25 paths) + obfuscation + JSON-LD + CF decode + SMTP guess(20 prefixes)")

    fieldnames = ["email", "first_name", "website", "ref_url", "provider", "valid_mx"]
    mode = "a" if resume and Path(OUTPUT_CSV).exists() else "w"
    done_workers = found = processed = 0
    total = len(todo)

    with open(OUTPUT_CSV, mode, newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        if mode == "w":
            writer.writeheader()

        while done_workers < len(procs):
            item = q.get()
            if isinstance(item, str) and item.startswith("DONE:"):
                done_workers += 1
                parts = item.split(":")
                log(f"  Worker {parts[1]} done ({parts[2]} emails)")
            elif item is None:
                processed += 1
            else:
                processed += 1
                found += 1
                writer.writerow(item)
                f.flush()
            if processed % 500 == 0 and processed > 0:
                log(f"  {processed}/{total} | {found} emails ({found/processed*100:.1f}% hit rate)")

    for p in procs: p.join()
    log(f"Done. {found} emails from {total} domains -> {OUTPUT_CSV}")

    counts: dict[str, int] = {}
    with open(OUTPUT_CSV, newline="", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            p = row.get("provider", "Unknown")
            counts[p] = counts.get(p, 0) + 1
    log("Provider breakdown:")
    for p, c in sorted(counts.items(), key=lambda x: -x[1]):
        log(f"  {p}: {c}")


if __name__ == "__main__":
    multiprocessing.freeze_support()
    parser = argparse.ArgumentParser()
    parser.add_argument("--workers", type=int, default=WORKERS)
    parser.add_argument("--resume",  action="store_true")
    args = parser.parse_args()
    main(args.workers, args.resume)
