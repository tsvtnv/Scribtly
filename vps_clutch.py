"""
vps_clutch.py — Clutch.co qualified social media agency scraper for Scribtly lead gen.
Scrapes agency listings, extracts emails, and pushes to Scribtly outreach API.
"""
import asyncio
import aiohttp
import aiofiles
import re
import random
import time
import hashlib
import json
from bs4 import BeautifulSoup

# --- Config ---
API_URL = "https://scribtly.com/api/v1/outreach/leads/bulk"
API_KEY = "ab36e7b012db83e769f32ee5e41722283fcb0c29ab9662f9e39a4d71d7080055"
AGENCIES_FILE = "clutch_agencies.txt"
FAILED_FILE = "clutch_failed.txt"
BATCH_SIZE = 50
CONCURRENCY = 100

SOURCES = [
    ("https://clutch.co/agencies/social-media", 50),
    ("https://clutch.co/agencies/social-media-marketing", 30),
]
FALLBACK_SOURCES = [
    "https://www.designrush.com/agency/social-media-marketing",
    "https://www.sortlist.com/social-media-agency",
    "https://upcity.com/profiles/social-media-agencies",
]

USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
]
CONTACT_PATHS = ["/contact", "/contact-us", "/about", "/"]
EMAIL_RE = re.compile(r"[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}")
GENERIC = {"noreply", "no-reply", "donotreply", "mailer-daemon", "postmaster", "abuse", "bounce"}


def _log(msg: str):
    print(f"[{time.strftime('%H:%M:%S')}] {msg}")


def domain_md5(domain: str) -> str:
    return hashlib.md5(domain.encode()).hexdigest()


def clean_domain(url: str) -> str | None:
    url = url.strip().lower()
    url = re.sub(r"^https?://", "", url)
    url = re.sub(r"^www\.", "", url)
    url = url.split("/")[0].split("?")[0]
    if "." not in url or "clutch.co" in url:
        return None
    return url


async def fetch(session: aiohttp.ClientSession, url: str, delay: float = 0) -> str:
    if delay:
        await asyncio.sleep(delay)
    headers = {"User-Agent": random.choice(USER_AGENTS), "Accept-Language": "en-US,en;q=0.9"}
    try:
        async with session.get(url, headers=headers, timeout=aiohttp.ClientTimeout(total=15), allow_redirects=True) as r:
            if r.status >= 400:
                return ""
            return await r.text(encoding="utf-8", errors="ignore")
    except Exception:
        return ""


def parse_clutch_page(html: str) -> list[dict]:
    soup = BeautifulSoup(html, "html.parser")
    agencies = []
    for listing in soup.select("li.provider-row, li[data-company_name], .provider"):
        name_el = listing.select_one("h3.company_info a, h3 a, .company-name a, .company_info a")
        if not name_el:
            continue
        name = name_el.get_text(strip=True)
        # Website link
        site_el = listing.select_one("a[data-link_type='website'], a.website-link, a[href*='http'][rel~='nofollow']")
        website = ""
        if site_el:
            website = site_el.get("href", "")
        if not website:
            # Try any external link in listing
            for a in listing.find_all("a", href=True):
                href = a["href"]
                if href.startswith("http") and "clutch.co" not in href:
                    website = href
                    break
        domain = clean_domain(website) if website else None
        # Employee count
        employees = ""
        text = listing.get_text(" ", strip=True)
        m = re.search(r"(\d[\d,\-\+]*)\s*[Ee]mployees?", text)
        if m:
            employees = m.group(0)
        if name and domain:
            agencies.append({"name": name, "domain": domain, "employees": employees})
    return agencies


def parse_fallback_page(html: str, source: str) -> list[dict]:
    """Generic fallback parser — extract agency names + external links."""
    soup = BeautifulSoup(html, "html.parser")
    agencies = []
    seen = set()
    for a in soup.find_all("a", href=True):
        href = a["href"]
        if not href.startswith("http"):
            continue
        domain = clean_domain(href)
        if not domain or domain in seen:
            continue
        if any(skip in domain for skip in ["designrush", "sortlist", "upcity", "google", "facebook", "linkedin", "twitter"]):
            continue
        seen.add(domain)
        name = a.get_text(strip=True) or domain
        agencies.append({"name": name, "domain": domain, "employees": ""})
    return agencies


async def scrape_clutch(session: aiohttp.ClientSession) -> list[dict]:
    all_agencies: list[dict] = []
    seen_domains: set[str] = set()
    consecutive_empty = 0

    for base_url, max_pages in SOURCES:
        _log(f"[Clutch] Scraping {base_url} (0-{max_pages-1})")
        for page in range(max_pages):
            url = f"{base_url}?page={page}"
            delay = random.uniform(2, 4)
            html = await fetch(session, url, delay=delay)
            agencies = parse_clutch_page(html) if html else []
            if not agencies:
                consecutive_empty += 1
                _log(f"[Clutch] Page {page}: empty (consecutive={consecutive_empty})")
                if consecutive_empty >= 3:
                    _log("[Clutch] 3 empty pages — stopping this source")
                    break
                continue
            consecutive_empty = 0
            new_count = 0
            for ag in agencies:
                if ag["domain"] not in seen_domains:
                    seen_domains.add(ag["domain"])
                    all_agencies.append(ag)
                    new_count += 1
            _log(f"[Clutch] Page {page}: {len(agencies)} listings, {new_count} new | total={len(all_agencies)}")

    return all_agencies


async def scrape_fallbacks(session: aiohttp.ClientSession) -> list[dict]:
    all_agencies: list[dict] = []
    seen: set[str] = set()
    for url in FALLBACK_SOURCES:
        _log(f"[Fallback] Scraping {url}")
        html = await fetch(session, url, delay=random.uniform(2, 4))
        if not html:
            continue
        agencies = parse_fallback_page(html, url)
        for ag in agencies:
            if ag["domain"] not in seen:
                seen.add(ag["domain"])
                all_agencies.append(ag)
        _log(f"[Fallback] {url}: {len(agencies)} found | total={len(all_agencies)}")
    return all_agencies


def extract_emails(html: str, domain: str) -> set[str]:
    found = EMAIL_RE.findall(html)
    result = set()
    for email in found:
        email = email.lower().strip(".")
        prefix = email.split("@")[0]
        if prefix in GENERIC:
            continue
        ed = email.split("@")[-1]
        if ed == domain or ed.endswith("." + domain):
            result.add(email)
    return result


PREFERRED = ["contact", "hello", "info", "hi", "team", "media", "press"]


def best_email(emails: set[str]) -> str:
    for p in PREFERRED:
        for e in emails:
            if e.split("@")[0] == p:
                return e
    return sorted(emails)[0]


async def get_email(session: aiohttp.ClientSession, domain: str) -> str | None:
    urls = [f"https://{domain}{p}" for p in CONTACT_PATHS]
    pages = await asyncio.gather(*[fetch(session, u) for u in urls])
    for html in pages:
        emails = extract_emails(html, domain)
        if emails:
            return best_email(emails)
    return None


async def push_batch(session: aiohttp.ClientSession, batch: list[dict], failed: list[str]) -> None:
    headers = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}
    for attempt in range(3):
        try:
            async with session.post(API_URL, json={"leads": batch}, headers=headers,
                                    timeout=aiohttp.ClientTimeout(total=30)) as r:
                if r.status in (200, 201):
                    data = await r.json()
                    _log(f"[API] Pushed {len(batch)} leads -> created:{data.get('created',0)} updated:{data.get('updated',0)}")
                    return
                elif r.status == 409:
                    _log(f"[API] 409 batch exists, skipping")
                    return
                else:
                    body = await r.text()
                    _log(f"[API] Push failed status={r.status}: {body[:200]}")
        except Exception as e:
            _log(f"[API] Error attempt {attempt+1}: {e}")
        await asyncio.sleep(2 ** attempt)
    failed.extend(lead["agencyWebsite"] for lead in batch)


async def main():
    connector = aiohttp.TCPConnector(limit=CONCURRENCY)
    async with aiohttp.ClientSession(connector=connector) as session:
        # Step 1: Scrape directory pages
        agencies = await scrape_clutch(session)
        if len(agencies) < 10:
            _log("[Main] Clutch returned < 10 results — trying fallback directories")
            agencies = await scrape_fallbacks(session)

        _log(f"[Main] Total unique agencies: {len(agencies)}")

        # Step 2: Save domains
        async with aiofiles.open(AGENCIES_FILE, "w") as f:
            for ag in agencies:
                await f.write(f"{ag['domain']}|{ag['name']}|{ag['employees']}\n")
        _log(f"[Main] Saved {len(agencies)} agencies to {AGENCIES_FILE}")

        # Step 3: Extract emails in chunks
        _log(f"[Main] Extracting emails (concurrency={CONCURRENCY})")
        leads: list[dict] = []
        failed: list[str] = []
        chunk_size = 20

        for i in range(0, len(agencies), chunk_size):
            chunk = agencies[i:i + chunk_size]
            emails = await asyncio.gather(*[get_email(session, ag["domain"]) for ag in chunk])
            for ag, email in zip(chunk, emails):
                if email:
                    leads.append({
                        "leadId": domain_md5(ag["domain"]),
                        "agencyName": ag["name"],
                        "agencyWebsite": f"https://{ag['domain']}",
                        "outreachStatus": "NOT_CONTACTED",
                        "sourceSearchQuery": "clutch.co/agencies/social-media",
                        "agencyServices": "social media marketing",
                        "notes": f"email: {email}",
                    })
            _log(f"[Main] Email progress: {min(i+chunk_size, len(agencies))}/{len(agencies)} | leads with email: {len(leads)}")

        # Step 4: Push in batches
        _log(f"[Main] Pushing {len(leads)} leads in batches of {BATCH_SIZE}")
        for i in range(0, len(leads), BATCH_SIZE):
            await push_batch(session, leads[i:i + BATCH_SIZE], failed)

        if failed:
            async with aiofiles.open(FAILED_FILE, "w") as f:
                for url in failed:
                    await f.write(url + "\n")
            _log(f"[Main] {len(failed)} failed pushes saved to {FAILED_FILE}")

        _log(f"[Main] Done. {len(agencies)} agencies scraped, {len(leads)} emails found, {len(failed)} push failures.")


if __name__ == "__main__":
    asyncio.run(main())
