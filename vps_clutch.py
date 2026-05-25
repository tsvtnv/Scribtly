# vps_clutch.py
import asyncio
import aiohttp
import csv
import hashlib
import os
import random
import re
import time
from pathlib import Path
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup


def load_env_file(path: str = ".env.local") -> dict:
    """Read key=value pairs from a .env file. Returns empty dict if file missing."""
    result = {}
    try:
        for line in Path(path).read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            result[k.strip()] = v.strip().strip('"').strip("'")
    except FileNotFoundError:
        pass
    return result


_env = load_env_file()

API_KEY = _env.get("OUTREACH_API_KEY") or os.environ.get("OUTREACH_API_KEY", "")
BASE_URL = (_env.get("SCRIPTER_BASE_URL") or os.environ.get("SCRIPTER_BASE_URL", "https://scribtly.com")).rstrip("/")
API_URL = f"{BASE_URL}/api/v1/outreach/leads/bulk"

CONCURRENCY = 100
BATCH_SIZE = 50
CONTACT_PATHS = ["/contact", "/contact-us", "/contactus", "/about", "/about-us"]
EMAIL_RE = re.compile(r"[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}")
GENERIC_PREFIXES = {"noreply", "no-reply", "donotreply", "postmaster", "abuse", "bounce"}
PREFERRED_PREFIXES = ["contact", "hello", "info", "hi", "team", "media", "press"]

SKIP_DOMAINS = {
    "clutch.co", "designrush.com", "sortlist.com", "upcity.com",
    "google.com", "facebook.com", "linkedin.com", "twitter.com",
    "instagram.com", "youtube.com", "tiktok.com",
}

SOURCES = [
    # DesignRush: 11,852 agencies, 55/page, ?page=N pagination
    ("https://www.designrush.com/agency/social-media-marketing", 215),
    ("https://www.designrush.com/agency/content-marketing", 100),
    ("https://www.designrush.com/agency/video-production", 80),
    ("https://www.designrush.com/agency/digital-marketing", 150),
]


def log(msg):
    print(f"[{time.strftime('%H:%M:%S')}] {msg}", flush=True)


def domain_from_url(url):
    if not url:
        return None
    try:
        d = urlparse(url).netloc.lower()
        if not d:
            return None
        return d[4:] if d.startswith("www.") else d
    except Exception:
        return None


def lead_id(domain):
    return hashlib.md5(domain.encode()).hexdigest()


def first_name_from_agency(agency_name: str) -> str:
    """Extract first word of agency name for email personalisation."""
    if not agency_name:
        return "there"
    return agency_name.split()[0]


def pick_email(emails, domain):
    domain_emails = {e for e in emails if e.split("@")[-1] == domain or e.split("@")[-1].endswith("." + domain)}
    domain_emails = {e for e in domain_emails if e.split("@")[0] not in GENERIC_PREFIXES}
    if not domain_emails:
        return None
    for prefix in PREFERRED_PREFIXES:
        for e in domain_emails:
            if e.split("@")[0] == prefix:
                return e
    return sorted(domain_emails)[0]


def scrape_directory_page(page, url):
    """Use Playwright to render a directory page and extract agency website links."""
    domains = {}
    try:
        page.goto(url, wait_until="networkidle", timeout=45000)
        page.wait_for_timeout(2000)
        html = page.content()
        soup = BeautifulSoup(html, "html.parser")

        # DesignRush uses article.js-agency-item; fall back to other known structures
        rows = (
            soup.select("article.js-agency-item") or
            soup.select("li.provider-row") or
            soup.select("li[data-company_name]") or
            soup.select(".agency-card") or
            soup.select("article.agency")
        )

        for row in rows:
            name = ""
            website = None
            employees = ""

            # Name — DesignRush uses a.gtm-name; fall back to common selectors
            for sel in ["a.gtm-name", "h3 a", "h2 a", ".company-name a", ".agency-name"]:
                el = row.select_one(sel)
                if el:
                    name = el.get_text(strip=True)
                    break

            # Website — prefer direct external links, then DesignRush referral links
            for a in row.find_all("a", href=True):
                href = a["href"]
                if not href.startswith("http"):
                    continue
                # Skip internal directory links
                if any(d in href for d in ["designrush.com", "clutch.co", "upcity.com"]):
                    continue
                website = href
                break

            if website:
                domain = domain_from_url(website)
                if domain and domain not in SKIP_DOMAINS and "." in domain:
                    domains[domain] = {"name": name or domain, "employees": employees}

    except Exception as e:
        log(f"  Page error {url}: {e}")

    return domains


def scrape_all_sources():
    """Scrape all directory sources using Playwright. Returns dict of domain -> info."""
    all_agencies = {}

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
        )
        page = context.new_page()

        for base_url, max_pages in SOURCES:
            log(f"Scraping {base_url} (up to {max_pages} pages)...")
            consecutive_empty = 0

            for page_num in range(max_pages):
                url = f"{base_url}?page={page_num}" if page_num > 0 else base_url
                found = scrape_directory_page(page, url)
                new = {k: v for k, v in found.items() if k not in all_agencies}
                all_agencies.update(new)
                log(f"  Page {page_num}: +{len(new)} agencies (total: {len(all_agencies)})")

                if len(found) == 0:
                    consecutive_empty += 1
                    if consecutive_empty >= 3:
                        log(f"  3 empty pages, stopping this source")
                        break
                else:
                    consecutive_empty = 0

                time.sleep(random.uniform(2.0, 4.0))

        browser.close()

    return all_agencies


# ── async email extraction ────────────────────────────────────────────────────

async def fetch_page(session, url):
    try:
        async with session.get(url, timeout=aiohttp.ClientTimeout(total=10), allow_redirects=True,
                               headers={"User-Agent": "Mozilla/5.0"}) as r:
            if r.status >= 400:
                return ""
            return await r.text(encoding="utf-8", errors="ignore")
    except Exception:
        return ""


async def get_email(session, domain):
    urls = [f"https://{domain}"] + [f"https://{domain}{p}" for p in CONTACT_PATHS]
    pages = await asyncio.gather(*[fetch_page(session, u) for u in urls])
    all_emails = set()
    for html in pages:
        all_emails.update(EMAIL_RE.findall(html.lower()))
    return pick_email(all_emails, domain)


async def push_batch(session, batch):
    headers = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}
    for attempt in range(3):
        try:
            async with session.post(API_URL, json={"leads": batch}, headers=headers,
                                    timeout=aiohttp.ClientTimeout(total=30)) as r:
                if r.status in (200, 201):
                    body = await r.json()
                    inner = body.get("data", {})
                    log(f"[API] Pushed {len(batch)} -> created:{inner.get('created',0)} updated:{inner.get('updated',0)}")
                    return True
                elif r.status == 409:
                    return True
                else:
                    log(f"[API] status={r.status} attempt={attempt+1}")
        except Exception as e:
            log(f"[API] error attempt={attempt+1}: {e}")
        await asyncio.sleep(2 ** attempt)
    return False


async def extract_and_push(agencies: dict) -> list[dict]:
    """Extract emails, push leads to API. Returns list of instantly rows."""
    connector = aiohttp.TCPConnector(limit=CONCURRENCY)
    instantly_rows: list[dict] = []

    async with aiohttp.ClientSession(connector=connector) as session:
        domains = list(agencies.keys())
        batch = []
        pushed = 0
        failed = []

        chunk_size = 50
        for i in range(0, len(domains), chunk_size):
            chunk = domains[i:i + chunk_size]
            emails = await asyncio.gather(*[get_email(session, d) for d in chunk])

            for domain, email in zip(chunk, emails):
                if not email:
                    continue
                info = agencies[domain]
                lid = lead_id(domain)
                batch.append({
                    "leadId": lid,
                    "agencyName": info["name"],
                    "agencyWebsite": f"https://{domain}",
                    "outreachStatus": "NOT_CONTACTED",
                    "agencyServices": "social media marketing",
                    "sourceSearchQuery": "clutch.co",
                    "notes": f"employees: {info.get('employees', '')}",
                })
                instantly_rows.append({
                    "email": email,
                    "first_name": first_name_from_agency(info["name"]),
                    "website": f"https://{domain}",
                    "ref_url": f"{BASE_URL}/ref/{lid}",
                })
                if len(batch) >= BATCH_SIZE:
                    ok = await push_batch(session, batch)
                    if not ok:
                        failed.extend(b["agencyWebsite"] for b in batch)
                    pushed += len(batch)
                    batch = []

            log(f"Progress: {min(i+chunk_size, len(domains))}/{len(domains)} domains processed")

        if batch:
            ok = await push_batch(session, batch)
            if not ok:
                failed.extend(b["agencyWebsite"] for b in batch)
            pushed += len(batch)

        if failed:
            with open("clutch_failed.txt", "a") as f:
                f.write("\n".join(failed) + "\n")

        log(f"Done. {pushed} leads pushed, {len(failed)} failures.")

    return instantly_rows


async def main():
    if not API_KEY:
        log("ERROR: OUTREACH_API_KEY not set in .env.local or environment")
        return

    log("=== Clutch Agency Scraper ===")
    log(f"Target: {API_URL}")
    agencies = scrape_all_sources()

    log(f"Found {len(agencies)} unique agencies")
    with open("clutch_agencies.txt", "w") as f:
        for domain, info in sorted(agencies.items()):
            f.write(f"{domain}|{info['name']}|{info.get('employees','')}\n")

    if not agencies:
        log("No agencies found — check if Playwright/Chromium is installed")
        return

    instantly_rows = await extract_and_push(agencies)

    instantly_path = "instantly_import.csv"
    with open(instantly_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["email", "first_name", "website", "ref_url"])
        writer.writeheader()
        writer.writerows(instantly_rows)

    log(f"[+] Instantly.ai import saved to {instantly_path} ({len(instantly_rows)} rows)")
    log("[+] Pipeline complete. Import instantly_import.csv into your Instantly campaign.")


if __name__ == "__main__":
    asyncio.run(main())
