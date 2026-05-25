"""
extract_emails.py

Reads all leads from DB, extracts + validates emails, detects provider,
outputs instantly_import.csv. Uses 16 parallel processes × 40 concurrent
connections each = 640 simultaneous requests.

Validation:
  - MX record check (domain actually receives email)
  - Provider detection (Google, Microsoft, Zoho, etc.)

Usage:
    python3.11 extract_emails.py
    python3.11 extract_emails.py --resume   # skip already-processed websites
    python3.11 extract_emails.py --workers 8
"""
import asyncio
import argparse
import csv
import multiprocessing
import os
import re
import time
import threading
from pathlib import Path

import aiohttp
import dns.resolver
import psycopg2
import psycopg2.extras
import psycopg2.pool


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
CONCURRENCY    = 40   # per worker → 16×40 = 640 total concurrent
DOMAIN_TIMEOUT = 12
OUTPUT_CSV     = "instantly_import.csv"
CONTACT_PATHS  = ["/contact", "/contact-us", "/contactus", "/about", "/about-us"]
EMAIL_RE       = re.compile(r"[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}")
GENERIC_PREFIXES  = {"noreply", "no-reply", "donotreply", "postmaster", "abuse",
                     "bounce", "support", "admin", "webmaster", "mailer", "daemon"}
PREFERRED_PREFIXES = ["contact", "hello", "info", "hi", "team", "media", "press"]

# MX → provider mapping
MX_PROVIDERS = [
    (["google.com", "googlemail.com"],          "Google Workspace"),
    (["outlook.com", "hotmail.com", "microsoft.com", "protection.outlook.com"], "Microsoft 365"),
    (["zoho.com", "zohomail.com"],               "Zoho Mail"),
    (["mxroute.com"],                            "MXroute"),
    (["mailchimp.com", "mandrillapp.com"],       "Mailchimp"),
    (["sendgrid.net"],                           "SendGrid"),
    (["amazonses.com", "amazon-smtp.amazon.com"],"Amazon SES"),
    (["protonmail.ch", "proton.me"],             "Proton Mail"),
    (["fastmail.com", "fastmail.fm"],            "Fastmail"),
    (["icloud.com", "apple.com"],                "Apple iCloud"),
]


def log(msg):
    print(f"[{time.strftime('%H:%M:%S')}] {msg}", flush=True)


# ── DB ─────────────────────────────────────────────────────────────────────────

def fetch_leads():
    conn = psycopg2.connect(DATABASE_URL)
    cur  = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute('SELECT "leadId","agencyName","agencyWebsite" FROM "ReferralLead" ORDER BY "createdAt"')
    rows = [dict(r) for r in cur.fetchall()]
    cur.close(); conn.close()
    return rows


# ── email helpers ─────────────────────────────────────────────────────────────

def pick_email(emails, domain):
    domain_emails = {e for e in emails
                     if e.split("@")[-1] == domain or e.split("@")[-1].endswith("." + domain)}
    domain_emails = {e for e in domain_emails if e.split("@")[0] not in GENERIC_PREFIXES}
    if not domain_emails:
        return None
    for prefix in PREFERRED_PREFIXES:
        for e in domain_emails:
            if e.split("@")[0] == prefix:
                return e
    return sorted(domain_emails)[0]


def detect_provider(email_domain: str) -> str:
    """Check MX records and return provider name."""
    try:
        mx_records = dns.resolver.resolve(email_domain, "MX", lifetime=5)
        mx_hosts   = " ".join(str(r.exchange).lower() for r in mx_records)
        for patterns, name in MX_PROVIDERS:
            if any(p in mx_hosts for p in patterns):
                return name
        return "Custom / Other"
    except Exception:
        return "Unknown"


_mx_cache: dict[str, str] = {}
_mx_lock  = threading.Lock()

def cached_provider(email_domain: str) -> str:
    with _mx_lock:
        if email_domain in _mx_cache:
            return _mx_cache[email_domain]
    provider = detect_provider(email_domain)
    with _mx_lock:
        _mx_cache[email_domain] = provider
    return provider


def validate_email_domain(email: str) -> bool:
    """Return True if the email domain has MX records (can receive mail)."""
    domain = email.split("@")[-1]
    try:
        dns.resolver.resolve(domain, "MX", lifetime=5)
        return True
    except Exception:
        return False


# ── async fetch ───────────────────────────────────────────────────────────────

async def fetch_page(session, url):
    try:
        async with session.get(
            url,
            timeout=aiohttp.ClientTimeout(total=8),
            allow_redirects=True,
            headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
        ) as r:
            if r.status >= 400:
                return ""
            return await r.text(encoding="utf-8", errors="ignore")
    except Exception:
        return ""


async def get_email_for_domain(session, domain):
    urls = [f"https://{domain}"] + [f"https://{domain}{p}" for p in CONTACT_PATHS]
    try:
        pages = await asyncio.wait_for(
            asyncio.gather(*[fetch_page(session, u) for u in urls]),
            timeout=DOMAIN_TIMEOUT
        )
    except asyncio.TimeoutError:
        return None
    all_emails = set()
    for html in pages:
        all_emails.update(EMAIL_RE.findall(html.lower()))
    return pick_email(all_emails, domain)


def save_to_db(db_url: str, lead_id: str, email: str, provider: str, valid_mx: bool):
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


# ── worker (runs in its own process) ─────────────────────────────────────────

def worker(leads_chunk: list, worker_id: int, result_queue: multiprocessing.Queue, resume_set: set, db_url: str):
    async def run():
        connector = aiohttp.TCPConnector(limit=CONCURRENCY, ttl_dns_cache=300)
        semaphore = asyncio.Semaphore(CONCURRENCY)
        results   = []

        async with aiohttp.ClientSession(connector=connector) as session:
            async def process(lead):
                website = lead["agencyWebsite"]
                if website in resume_set:
                    return
                domain = website.replace("https://", "").replace("http://", "").rstrip("/")
                async with semaphore:
                    email = await get_email_for_domain(session, domain)
                if email:
                    email_domain = email.split("@")[-1]
                    valid    = validate_email_domain(email_domain)
                    provider = cached_provider(email_domain) if valid else "Invalid MX"
                    first_name = (lead["agencyName"] or "").split()[0] or "there"
                    # Write to DB immediately
                    try:
                        save_to_db(db_url, lead["leadId"], email, provider, valid)
                    except Exception as e:
                        pass  # don't let DB errors kill the worker
                    row = {
                        "email":      email,
                        "first_name": first_name,
                        "website":    website,
                        "ref_url":    f"{BASE_URL}/ref/{lead['leadId']}",
                        "provider":   provider,
                        "valid_mx":   "yes" if valid else "no",
                    }
                    results.append(row)
                    result_queue.put(row)
                else:
                    result_queue.put(None)

            await asyncio.gather(*[process(l) for l in leads_chunk])

        result_queue.put(f"DONE:{worker_id}:{len(results)}")

    asyncio.run(run())


# ── main ──────────────────────────────────────────────────────────────────────

def main(num_workers: int, resume: bool):
    leads = fetch_leads()
    log(f"Loaded {len(leads)} leads from DB")

    resume_set = set()
    if resume and Path(OUTPUT_CSV).exists():
        with open(OUTPUT_CSV, newline="", encoding="utf-8") as f:
            for row in csv.DictReader(f):
                resume_set.add(row.get("website", ""))
        log(f"Resuming — {len(resume_set)} already done")

    todo = [l for l in leads if l["agencyWebsite"] not in resume_set]
    log(f"{len(todo)} domains to process across {num_workers} workers")

    # Split into chunks
    chunk_size = max(1, len(todo) // num_workers)
    chunks = [todo[i:i + chunk_size] for i in range(0, len(todo), chunk_size)]

    result_queue: multiprocessing.Queue = multiprocessing.Queue()

    # Spawn workers
    procs = []
    for i, chunk in enumerate(chunks):
        p = multiprocessing.Process(target=worker, args=(chunk, i, result_queue, resume_set, DATABASE_URL))
        p.start()
        procs.append(p)
    log(f"Spawned {len(procs)} workers")

    # Collect results
    fieldnames = ["email", "first_name", "website", "ref_url", "provider", "valid_mx"]
    mode = "a" if resume and Path(OUTPUT_CSV).exists() else "w"
    done_workers = 0
    found = 0
    processed = 0
    total = len(todo)

    with open(OUTPUT_CSV, mode, newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        if mode == "w":
            writer.writeheader()

        while done_workers < len(procs):
            item = result_queue.get()
            if isinstance(item, str) and item.startswith("DONE:"):
                done_workers += 1
                _, wid, wfound = item.split(":")
                log(f"  Worker {wid} finished ({wfound} emails)")
            elif item is None:
                processed += 1
            else:
                processed += 1
                found += 1
                writer.writerow(item)
                f.flush()

            if processed % 1000 == 0 and processed > 0:
                hit = found / processed * 100
                log(f"  {processed}/{total} processed | {found} emails ({hit:.1f}% hit rate)")

    for p in procs:
        p.join()

    log(f"[+] Done. {found} valid emails from {total} domains → {OUTPUT_CSV}")

    # Summary by provider
    provider_counts: dict[str, int] = {}
    with open(OUTPUT_CSV, newline="", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            p = row.get("provider", "Unknown")
            provider_counts[p] = provider_counts.get(p, 0) + 1
    log("Provider breakdown:")
    for p, c in sorted(provider_counts.items(), key=lambda x: -x[1]):
        log(f"  {p}: {c}")


if __name__ == "__main__":
    multiprocessing.freeze_support()
    parser = argparse.ArgumentParser()
    parser.add_argument("--workers", type=int, default=WORKERS)
    parser.add_argument("--resume",  action="store_true")
    args = parser.parse_args()
    main(args.workers, args.resume)
