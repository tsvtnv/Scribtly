"""
verify_emails.py — multi-method email verifier (no port 25 required)

Per email, runs ALL applicable methods:
  1. Syntax check
  2. MX record lookup
  3. SPF + DMARC check (domains with proper config = higher confidence)
  4. Microsoft GetCredentialType API  (for Outlook/M365 emails — exact yes/no)
  5. Google account lookup            (for Google Workspace emails)
  6. Gravatar MD5 hash check          (profile = real email signal)
  7. Port 587 / 465 SMTP              (submission ports, less blocked than 25)
  8. Catch-all detection via port 587/465

Outputs:
  verified_emails.csv              — full results
  instantly_import_verified.csv    — clean safe-to-send list (confidence >= 60)

Usage:
    python3.11 verify_emails.py
    python3.11 verify_emails.py --workers 12 --resume
"""
import argparse
import asyncio
import csv
import hashlib
import json
import multiprocessing
import os
import random
import re
import smtplib
import socket
import string
import time
import threading
from pathlib import Path

import aiohttp
import dns.resolver
import psycopg2
import psycopg2.extras


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

_env         = load_env()
DATABASE_URL = _env.get("DATABASE_URL") or os.environ.get("DATABASE_URL", "")

WORKERS    = 12
OUTPUT_CSV = "verified_emails.csv"
CLEAN_CSV  = "instantly_import_verified.csv"
HELO_HOST  = "scribtly.com"
FROM_ADDR  = "verify@scribtly.com"

ROLE_PREFIXES = {
    "info", "contact", "hello", "hi", "team", "support", "help",
    "admin", "sales", "marketing", "press", "media", "enquiries",
    "enquiry", "billing", "accounts", "studio", "agency", "work",
}

SYNTAX_RE = re.compile(r"^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$")


def log(msg):
    print(f"[{time.strftime('%H:%M:%S')}] {msg}", flush=True)


# ── DB ─────────────────────────────────────────────────────────────────────────

def fetch_leads_with_email():
    conn = psycopg2.connect(DATABASE_URL)
    cur  = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute('''
        SELECT "leadId","agencyName","agencyWebsite","contactEmail","emailProvider"
        FROM "ReferralLead" WHERE "contactEmail" IS NOT NULL ORDER BY "createdAt"
    ''')
    rows = [dict(r) for r in cur.fetchall()]
    cur.close(); conn.close()
    return rows


def save_verification(db_url, lead_id, valid: bool):
    conn = psycopg2.connect(db_url)
    try:
        cur = conn.cursor()
        cur.execute('UPDATE "ReferralLead" SET "emailValidMx"=%s WHERE "leadId"=%s', (valid, lead_id))
        conn.commit()
        cur.close()
    finally:
        conn.close()


# ── DNS helpers ───────────────────────────────────────────────────────────────

_dns_cache: dict[str, dict] = {}
_dns_lock  = threading.Lock()

def get_dns_info(domain: str) -> dict:
    with _dns_lock:
        if domain in _dns_cache:
            return _dns_cache[domain]

    info = {"mx": [], "spf": False, "dmarc": False}

    try:
        mx = dns.resolver.resolve(domain, "MX", lifetime=5)
        info["mx"] = [str(r.exchange).rstrip(".").lower()
                      for r in sorted(mx, key=lambda r: r.preference)]
    except Exception:
        pass

    try:
        txt = dns.resolver.resolve(domain, "TXT", lifetime=5)
        for r in txt:
            val = str(r).lower()
            if "v=spf1" in val:
                info["spf"] = True
    except Exception:
        pass

    try:
        dmarc = dns.resolver.resolve(f"_dmarc.{domain}", "TXT", lifetime=5)
        for r in dmarc:
            if "v=dmarc1" in str(r).lower():
                info["dmarc"] = True
    except Exception:
        pass

    with _dns_lock:
        _dns_cache[domain] = info
    return info


def detect_provider(mx_hosts: list[str]) -> str:
    joined = " ".join(mx_hosts)
    if "google" in joined or "googlemail" in joined: return "google"
    if "outlook" in joined or "microsoft" in joined or "protection.outlook" in joined: return "microsoft"
    return "other"


# ── method 1: Microsoft GetCredentialType ─────────────────────────────────────

async def check_microsoft(session: aiohttp.ClientSession, email: str) -> str:
    """Returns 'valid', 'invalid', or 'unknown'."""
    try:
        payload = {"username": email, "isOtherIdpSupported": True}
        async with session.post(
            "https://login.microsoftonline.com/common/GetCredentialType",
            json=payload,
            timeout=aiohttp.ClientTimeout(total=8),
            headers={"Content-Type": "application/json"},
        ) as r:
            if r.status == 200:
                data = await r.json()
                exists = data.get("IfExistsResult", -1)
                # 0 = exists, 1 = not found, 5 = exists (different tenant), 6 = exists
                if exists in (0, 5, 6):
                    return "valid"
                elif exists == 1:
                    return "invalid"
    except Exception:
        pass
    return "unknown"


# ── method 2: Google account lookup ──────────────────────────────────────────

async def check_google(session: aiohttp.ClientSession, email: str) -> str:
    """
    Uses Google's signin lookup. Returns 'valid', 'invalid', or 'unknown'.
    Google returns different responses for existing vs non-existing accounts.
    """
    try:
        async with session.post(
            "https://accounts.google.com/_/signin/sl/lookup",
            data={"f.req": json.dumps([None, json.dumps([[email, None, True, None, None]])]), "flowName": "GlifWebSignIn"},
            headers={"Content-Type": "application/x-www-form-urlencoded"},
            timeout=aiohttp.ClientTimeout(total=8),
        ) as r:
            text = await r.text()
            # Google returns error code 4 for non-existent accounts
            if '"4"' in text or ",4," in text:
                return "invalid"
            if r.status == 200 and len(text) > 100:
                return "valid"
    except Exception:
        pass
    return "unknown"


# ── method 3: Gravatar MD5 check ──────────────────────────────────────────────

async def check_gravatar(session: aiohttp.ClientSession, email: str) -> bool:
    """Returns True if a Gravatar profile exists for this email."""
    try:
        h = hashlib.md5(email.strip().lower().encode()).hexdigest()
        async with session.get(
            f"https://www.gravatar.com/avatar/{h}?d=404",
            timeout=aiohttp.ClientTimeout(total=5),
            allow_redirects=False,
        ) as r:
            return r.status == 200
    except Exception:
        return False


# ── method 4: port 587/465 SMTP ──────────────────────────────────────────────

_smtp_rate: dict[str, float] = {}
_smtp_lock = threading.Lock()

def smtp_check_submission(email: str, mx_hosts: list[str]) -> tuple[str, str]:
    """Try ports 587 and 465 — submission ports, less blocked than 25."""
    if not mx_hosts:
        return "unknown", "no_mx"

    for mx in mx_hosts[:2]:
        # Polite rate limiting per MX
        with _smtp_lock:
            last = _smtp_rate.get(mx, 0)
            wait = 0.5 - (time.time() - last)
            if wait > 0:
                time.sleep(wait)
            _smtp_rate[mx] = time.time()

        for port in (587, 465):
            try:
                if port == 465:
                    import ssl
                    ctx = ssl.create_default_context()
                    with smtplib.SMTP_SSL(mx, port, timeout=6, context=ctx) as smtp:
                        smtp.ehlo(HELO_HOST)
                        smtp.mail(FROM_ADDR)
                        code, msg = smtp.rcpt(email)
                        detail = msg.decode(errors="ignore")[:60] if isinstance(msg, bytes) else str(msg)[:60]
                        if code in (250, 251, 252):
                            return "valid", f"port465 {code}"
                        elif code >= 500:
                            return "invalid", f"port465 {code} {detail}"
                else:
                    with smtplib.SMTP(mx, port, timeout=6) as smtp:
                        smtp.ehlo(HELO_HOST)
                        try:
                            smtp.starttls()
                            smtp.ehlo(HELO_HOST)
                        except Exception:
                            pass
                        smtp.mail(FROM_ADDR)
                        code, msg = smtp.rcpt(email)
                        detail = msg.decode(errors="ignore")[:60] if isinstance(msg, bytes) else str(msg)[:60]
                        if code in (250, 251, 252):
                            return "valid", f"port587 {code}"
                        elif code >= 500:
                            return "invalid", f"port587 {code} {detail}"
            except smtplib.SMTPRecipientsRefused as e:
                vals = list(e.recipients.values())
                if vals:
                    c = vals[0][0]
                    d = vals[0][1].decode(errors="ignore")[:40] if isinstance(vals[0][1], bytes) else str(vals[0][1])[:40]
                    return "invalid", f"port{port} {c} {d}"
            except Exception:
                continue

    return "unknown", "ports_blocked"


def is_catch_all_submission(domain: str, mx_hosts: list[str]) -> bool:
    rand = "".join(random.choices(string.ascii_lowercase, k=18)) + f"@{domain}"
    status, _ = smtp_check_submission(rand, mx_hosts)
    return status == "valid"


# ── full verification pipeline ────────────────────────────────────────────────

async def verify_email(session: aiohttp.ClientSession, email: str, provider: str) -> dict:
    result = {
        "status": "unknown", "confidence": 0,
        "catch_all": False, "role_based": False,
        "methods": [], "detail": "",
    }

    if not SYNTAX_RE.match(email):
        return {**result, "status": "invalid", "detail": "bad_syntax"}

    prefix, domain = email.split("@", 1)
    result["role_based"] = prefix.lower() in ROLE_PREFIXES

    # DNS
    dns_info = await asyncio.get_event_loop().run_in_executor(None, get_dns_info, domain)
    if not dns_info["mx"]:
        return {**result, "status": "invalid", "detail": "no_mx"}

    mx_type  = detect_provider(dns_info["mx"])
    spf_ok   = dns_info["spf"]
    dmarc_ok = dns_info["dmarc"]
    base_conf = 30
    if spf_ok:   base_conf += 10
    if dmarc_ok: base_conf += 10

    # Run API checks + port 587 concurrently
    ms_task      = check_microsoft(session, email) if mx_type == "microsoft" else asyncio.sleep(0, result=None)
    google_task  = check_google(session, email)    if mx_type == "google"    else asyncio.sleep(0, result=None)
    gravatar_task = check_gravatar(session, email)

    ms_result, google_result, gravatar_result = await asyncio.gather(
        ms_task, google_task, gravatar_task
    )

    smtp_status, smtp_detail = await asyncio.get_event_loop().run_in_executor(
        None, smtp_check_submission, email, dns_info["mx"]
    )

    # Catch-all (only if SMTP returned valid)
    catch_all = False
    if smtp_status == "valid":
        catch_all = await asyncio.get_event_loop().run_in_executor(
            None, is_catch_all_submission, domain, dns_info["mx"]
        )
    result["catch_all"] = catch_all

    # Score all signals
    confidence = base_conf
    status = "unknown"

    if mx_type == "microsoft" and ms_result == "valid":
        confidence = 92
        status = "valid"
        result["methods"].append("microsoft_api")
    elif mx_type == "microsoft" and ms_result == "invalid":
        return {**result, "status": "invalid", "confidence": 0, "detail": "microsoft_api_rejected"}

    if mx_type == "google" and google_result == "valid":
        confidence = max(confidence, 85)
        status = "valid"
        result["methods"].append("google_lookup")
    elif mx_type == "google" and google_result == "invalid":
        return {**result, "status": "invalid", "confidence": 0, "detail": "google_lookup_rejected"}

    if smtp_status == "valid" and not catch_all:
        confidence = max(confidence, 88)
        status = "valid"
        result["methods"].append("smtp_587")
    elif smtp_status == "valid" and catch_all:
        confidence = max(confidence, 45)
        status = "catch_all"
        result["methods"].append("smtp_587_catchall")
    elif smtp_status == "invalid":
        return {**result, "status": "invalid", "confidence": 0, "detail": smtp_detail}

    if gravatar_result:
        confidence = min(100, confidence + 8)
        result["methods"].append("gravatar")

    if result["role_based"]:
        confidence = int(confidence * 0.85)

    result["confidence"] = confidence
    result["status"]     = status if status != "unknown" else ("valid" if confidence >= 50 else "unknown")
    result["detail"]     = smtp_detail or ""
    return result


# ── worker ────────────────────────────────────────────────────────────────────

def worker(leads_chunk: list, worker_id: int, q: multiprocessing.Queue,
           resume_set: set, db_url: str):
    async def run():
        connector = aiohttp.TCPConnector(limit=30, ssl=False)
        async with aiohttp.ClientSession(connector=connector) as session:
            for lead in leads_chunk:
                email = lead["contactEmail"]
                if email in resume_set:
                    q.put(None)
                    continue

                provider = (lead.get("emailProvider") or "").lower()
                res = await verify_email(session, email, provider)

                try:
                    save_verification(db_url, lead["leadId"], res["status"] in ("valid", "catch_all"))
                except Exception:
                    pass

                q.put({
                    "email":      email,
                    "status":     res["status"],
                    "confidence": res["confidence"],
                    "catch_all":  "yes" if res["catch_all"] else "no",
                    "role_based": "yes" if res["role_based"] else "no",
                    "methods":    ",".join(res["methods"]),
                    "detail":     res["detail"],
                    "provider":   lead.get("emailProvider", ""),
                    "agency":     lead.get("agencyName", ""),
                    "website":    lead.get("agencyWebsite", ""),
                    "first_name": (lead.get("agencyName") or "").split()[0] or "there",
                    "ref_url":    f"https://scribtly.com/ref/{lead['leadId']}",
                })

        found = 0
        q.put(f"DONE:{worker_id}:{found}")

    asyncio.run(run())


# ── main ──────────────────────────────────────────────────────────────────────

def main(num_workers: int, resume: bool):
    leads = fetch_leads_with_email()
    log(f"Loaded {len(leads)} leads with emails")

    resume_set = set()
    if resume and Path(OUTPUT_CSV).exists():
        with open(OUTPUT_CSV, newline="", encoding="utf-8") as f:
            for row in csv.DictReader(f):
                resume_set.add(row.get("email", ""))
        log(f"Resuming — skipping {len(resume_set)} already verified")

    todo = [l for l in leads if l["contactEmail"] not in resume_set]
    log(f"{len(todo)} emails to verify across {num_workers} workers")

    chunk_size = max(1, len(todo) // num_workers)
    chunks     = [todo[i:i + chunk_size] for i in range(0, len(todo), chunk_size)]

    q: multiprocessing.Queue = multiprocessing.Queue()
    procs = [
        multiprocessing.Process(target=worker, args=(chunk, i, q, resume_set, DATABASE_URL))
        for i, chunk in enumerate(chunks)
    ]
    for p in procs: p.start()
    log(f"Spawned {len(procs)} workers | methods: MS API + Google lookup + Gravatar + port 587/465 SMTP + SPF/DMARC scoring")

    fieldnames = ["email", "status", "confidence", "catch_all", "role_based",
                  "methods", "detail", "provider", "agency", "website", "first_name", "ref_url"]
    mode = "a" if resume and Path(OUTPUT_CSV).exists() else "w"
    done_workers = processed = 0
    counts = {"valid": 0, "invalid": 0, "catch_all": 0, "unknown": 0}
    total = len(todo)

    with open(OUTPUT_CSV, mode, newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        if mode == "w":
            writer.writeheader()

        while done_workers < len(procs):
            item = q.get()
            if isinstance(item, str) and item.startswith("DONE:"):
                done_workers += 1
                log(f"  Worker {item.split(':')[1]} done")
            elif item is None:
                processed += 1
            else:
                processed += 1
                writer.writerow(item)
                f.flush()
                s = item["status"]
                if s in counts: counts[s] += 1
                if processed % 500 == 0:
                    pct = processed / total * 100
                    log(f"  {processed}/{total} ({pct:.0f}%) | valid:{counts['valid']} catch_all:{counts['catch_all']} unknown:{counts['unknown']} invalid:{counts['invalid']}")

    for p in procs: p.join()

    total_found = counts["valid"] + counts["catch_all"]
    log(f"Done. {total_found} deliverable emails from {total} checked")
    log(f"  Valid (confirmed):   {counts['valid']}")
    log(f"  Catch-all (risky):   {counts['catch_all']}")
    log(f"  Unknown:             {counts['unknown']}")
    log(f"  Invalid:             {counts['invalid']}")

    # Write clean Instantly-ready CSV (confidence >= 60, exclude invalid)
    clean_rows = []
    with open(OUTPUT_CSV, newline="", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            if row["status"] == "invalid":
                continue
            if int(row["confidence"]) >= 60:
                clean_rows.append(row)

    with open(CLEAN_CSV, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["email", "first_name", "website", "ref_url",
                                                "provider", "confidence", "catch_all"])
        writer.writeheader()
        for row in clean_rows:
            writer.writerow({
                "email":      row["email"],
                "first_name": row["first_name"],
                "website":    row["website"],
                "ref_url":    row["ref_url"],
                "provider":   row["provider"],
                "confidence": row["confidence"],
                "catch_all":  row["catch_all"],
            })
    log(f"Clean Instantly list: {len(clean_rows)} emails -> {CLEAN_CSV}")


if __name__ == "__main__":
    multiprocessing.freeze_support()
    parser = argparse.ArgumentParser()
    parser.add_argument("--workers", type=int, default=WORKERS)
    parser.add_argument("--resume",  action="store_true")
    args = parser.parse_args()
    main(args.workers, args.resume)
