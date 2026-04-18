# vps_extract.py
import asyncio
import aiohttp
import aiofiles
import re
import time
import random
from vps_config import (
    API_URL, API_KEY, QUEUE_FILE, FAILED_FILE, EXTRACTION_LOG,
    CONCURRENCY, BATCH_SIZE, CONTACT_PATHS, USER_AGENTS, domain_to_lead_id
)

EMAIL_RE = re.compile(r"[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}")
GENERIC_PREFIXES = {"noreply", "no-reply", "donotreply", "mailer-daemon", "postmaster", "abuse", "bounce"}


def _log(msg: str):
    line = f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] {msg}"
    print(line)
    with open(EXTRACTION_LOG, "a") as f:
        f.write(line + "\n")


def is_domain_email(email: str, domain: str) -> bool:
    email_domain = email.split("@")[-1].lower()
    return email_domain == domain or email_domain.endswith("." + domain)


def extract_emails_from_html(html: str, domain: str) -> set[str]:
    found = EMAIL_RE.findall(html)
    result = set()
    for email in found:
        email = email.lower().strip(".")
        prefix = email.split("@")[0]
        if prefix in GENERIC_PREFIXES:
            continue
        if is_domain_email(email, domain):
            result.add(email)
    return result


def build_lead_payload(domain: str, email: str | None, query: str) -> dict | None:
    if not email:
        return None
    name = domain.split(".")[0].title()
    return {
        "leadId": domain_to_lead_id(domain),
        "agencyName": name,
        "agencyWebsite": f"https://{domain}",
        "outreachStatus": "NOT_CONTACTED",
        "sourceSearchQuery": query,
        "notes": f"email: {email}",
    }


async def fetch_page(session: aiohttp.ClientSession, url: str) -> str:
    headers = {"User-Agent": random.choice(USER_AGENTS)}
    try:
        async with session.get(url, headers=headers, timeout=aiohttp.ClientTimeout(total=10), allow_redirects=True) as resp:
            if resp.status >= 400:
                return ""
            return await resp.text(errors="ignore")
    except Exception:
        return ""


async def extract_email_for_domain(session: aiohttp.ClientSession, domain: str) -> tuple[str, str | None]:
    urls = [f"https://{domain}"] + [f"https://{domain}{p}" for p in CONTACT_PATHS]
    pages = await asyncio.gather(*[fetch_page(session, u) for u in urls])
    for html in pages:
        emails = extract_emails_from_html(html, domain)
        if emails:
            return domain, sorted(emails)[0]
    return domain, None


async def push_batch(session: aiohttp.ClientSession, batch: list[dict]) -> bool:
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    }
    payload = {"leads": batch}
    for attempt in range(3):
        try:
            async with session.post(
                API_URL,
                json=payload,
                headers=headers,
                timeout=aiohttp.ClientTimeout(total=30)
            ) as resp:
                if resp.status in (200, 201):
                    data = await resp.json()
                    _log(f"[API] Pushed {len(batch)} leads -> created:{data.get('created',0)} updated:{data.get('updated',0)}")
                    return True
                elif resp.status == 409:
                    _log(f"[API] Batch already exists (409), skipping")
                    return True
                else:
                    body = await resp.text()
                    _log(f"[API] Push failed status={resp.status} attempt={attempt+1}: {body[:200]}")
        except Exception as e:
            _log(f"[API] Push error attempt={attempt+1}: {e}")
        await asyncio.sleep(2 ** attempt)
    return False


async def main():
    try:
        async with aiofiles.open(QUEUE_FILE, "r") as f:
            content = await f.read()
        domains = [d.strip() for d in content.splitlines() if d.strip()]
    except FileNotFoundError:
        _log(f"[Extract] {QUEUE_FILE} not found — run vps_discover.py first")
        return

    _log(f"[Extract] Processing {len(domains)} domains with concurrency={CONCURRENCY}")

    connector = aiohttp.TCPConnector(limit=CONCURRENCY, ssl=False)
    async with aiohttp.ClientSession(connector=connector) as session:
        batch: list[dict] = []
        processed = 0
        emails_found = 0
        failed_domains: list[str] = []

        chunk_size = 500
        for i in range(0, len(domains), chunk_size):
            chunk = domains[i:i + chunk_size]
            results = await asyncio.gather(*[extract_email_for_domain(session, d) for d in chunk])

            for domain, email in results:
                processed += 1
                if not email:
                    continue
                lead = build_lead_payload(domain, email, query="vps_discovery")
                if lead:
                    batch.append(lead)
                    emails_found += 1
                if len(batch) >= BATCH_SIZE:
                    success = await push_batch(session, batch)
                    if not success:
                        failed_domains.extend(b["agencyWebsite"] for b in batch)
                    batch = []

            _log(f"[Extract] Progress: {processed}/{len(domains)} domains, {emails_found} emails found")

        if batch:
            success = await push_batch(session, batch)
            if not success:
                failed_domains.extend(b["agencyWebsite"] for b in batch)

    if failed_domains:
        async with aiofiles.open(FAILED_FILE, "a") as f:
            for d in failed_domains:
                await f.write(d + "\n")
        _log(f"[Extract] {len(failed_domains)} domains failed to push -> {FAILED_FILE}")

    _log(f"[Extract] Done. {emails_found}/{len(domains)} had emails. {len(failed_domains)} push failures.")


if __name__ == "__main__":
    asyncio.run(main())
