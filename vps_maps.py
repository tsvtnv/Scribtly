# vps_maps.py
import asyncio
import aiohttp
import hashlib
import re
import time
import random
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup

API_URL = "https://scribtly.com/api/v1/outreach/leads/bulk"
API_KEY = "ab36e7b012db83e769f32ee5e41722283fcb0c29ab9662f9e39a4d71d7080055"
CONCURRENCY = 100
BATCH_SIZE = 50
CONTACT_PATHS = ["/contact", "/contact-us", "/contactus", "/about", "/about-us"]
EMAIL_RE = re.compile(r"[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}")
GENERIC_PREFIXES = {"noreply", "no-reply", "donotreply", "postmaster", "abuse", "bounce", "mailer-daemon"}
PREFERRED_PREFIXES = ["contact", "hello", "info", "hi", "team", "media", "press"]

SKIP_DOMAINS = {
    "google.com", "facebook.com", "linkedin.com", "twitter.com", "x.com",
    "instagram.com", "youtube.com", "tiktok.com", "yelp.com", "tripadvisor.com",
    "trustpilot.com", "clutch.co", "bark.com", "yell.com", "checkatrade.com",
}

SEARCHES = [
    "social media agency london", "social media agency manchester", "social media agency birmingham",
    "social media agency leeds", "social media agency glasgow", "social media agency edinburgh",
    "social media agency bristol", "social media agency sheffield", "social media agency liverpool",
    "digital marketing agency london", "digital marketing agency manchester", "digital marketing agency birmingham",
    "content marketing agency london", "video marketing agency london",
    "social media agency new york", "social media agency los angeles", "social media agency chicago",
    "social media agency houston", "social media agency miami", "social media agency seattle",
    "social media agency dallas", "social media agency austin", "social media agency boston",
    "social media agency atlanta", "social media agency denver", "social media agency philadelphia",
    "digital marketing agency new york", "digital marketing agency los angeles", "digital marketing agency chicago",
    "digital marketing agency miami", "digital marketing agency austin", "digital marketing agency seattle",
    "social media agency sydney", "social media agency melbourne", "social media agency brisbane",
    "digital marketing agency sydney", "digital marketing agency melbourne",
    "social media agency toronto", "social media agency vancouver",
    "digital marketing agency toronto", "digital marketing agency vancouver",
    "social media agency dublin", "social media agency amsterdam", "social media agency berlin",
    "social media agency singapore", "social media agency dubai",
    "tiktok marketing agency london", "tiktok marketing agency new york",
    "instagram marketing agency london", "instagram marketing agency new york",
    "ugc agency london", "ugc agency new york",
    "content creation agency london", "content creation agency new york",
    "video production agency london", "video production agency new york",
]


def log(msg):
    print(f"[{time.strftime('%H:%M:%S')}] {msg}", flush=True)


def domain_from_url(url):
    try:
        d = urlparse(url).netloc.lower()
        return d[4:] if d.startswith("www.") else d
    except Exception:
        return None


def lead_id(domain):
    return hashlib.md5(domain.encode()).hexdigest()


def pick_email(emails, domain):
    domain_emails = {
        e for e in emails
        if (e.split("@")[-1] == domain or e.split("@")[-1].endswith("." + domain))
        and e.split("@")[0] not in GENERIC_PREFIXES
    }
    if not domain_emails:
        return None
    for prefix in PREFERRED_PREFIXES:
        for e in domain_emails:
            if e.split("@")[0] == prefix:
                return e
    return sorted(domain_emails)[0]


def scrape_maps_query(page, query, max_results=40):
    """Scrape Google Maps for one query. Returns dict of domain -> name."""
    agencies = {}
    url = "https://www.google.com/maps/search/" + query.replace(" ", "+")

    try:
        page.goto(url, wait_until="domcontentloaded", timeout=30000)
        page.wait_for_timeout(3000)

        # Scroll results panel to load more
        for _ in range(3):
            try:
                feed = page.locator('[role="feed"]').first
                feed.evaluate("el => el.scrollBy(0, 2000)")
                page.wait_for_timeout(2000)
            except Exception:
                break

        # Get all result links
        results = page.locator('[role="feed"] a[href*="/maps/place/"]').all()
        log(f"  [{query}] {len(results)} results visible")

        for i, result in enumerate(results[:max_results]):
            try:
                result.click()
                page.wait_for_timeout(2500)

                name = ""
                website = ""

                # Extract business name
                try:
                    name = page.locator("h1.DUwDvf").first.inner_text(timeout=3000).strip()
                except Exception:
                    pass

                # Extract website link
                try:
                    website_el = page.locator('a[data-item-id="authority"]').first
                    website = website_el.get_attribute("href", timeout=3000) or ""
                except Exception:
                    pass

                if not website:
                    try:
                        website_el = page.locator('a[aria-label*="website" i], a[aria-label*="Website" i]').first
                        website = website_el.get_attribute("href", timeout=2000) or ""
                    except Exception:
                        pass

                if website and website.startswith("http"):
                    domain = domain_from_url(website)
                    if domain and domain not in SKIP_DOMAINS and "." in domain and domain not in agencies:
                        agencies[domain] = {"name": name or domain, "query": query}
                        log(f"    + {domain} ({name})")

            except Exception:
                continue

    except Exception as e:
        log(f"  [{query}] error: {e}")

    return agencies


def scrape_all(queue: asyncio.Queue, loop: asyncio.AbstractEventLoop, seen: set):
    """Playwright scraper — feeds discovered agencies into async queue immediately."""
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            locale="en-US",
        )
        page = context.new_page()

        # Accept Google consent popup (appears on first load from EU IPs)
        page.goto("https://www.google.com/maps", wait_until="domcontentloaded", timeout=30000)
        page.wait_for_timeout(3000)
        for btn_text in ["Accept all", "Alle akzeptieren", "I agree", "Zustimmen"]:
            try:
                btn = page.get_by_text(btn_text, exact=True).first
                if btn.is_visible(timeout=2000):
                    btn.click()
                    log(f"Accepted consent: {btn_text}")
                    page.wait_for_timeout(3000)
                    break
            except Exception:
                pass

        for i, query in enumerate(SEARCHES):
            log(f"[{i+1}/{len(SEARCHES)}] {query}")
            found = scrape_maps_query(page, query)
            new_count = 0
            for domain, info in found.items():
                if domain not in seen:
                    seen.add(domain)
                    new_count += 1
                    # Push into async queue immediately
                    asyncio.run_coroutine_threadsafe(
                        queue.put({"domain": domain, **info}), loop
                    ).result()
                    # Append to file
                    with open("maps_agencies.txt", "a") as f:
                        f.write(f"{domain}|{info['name']}|{info.get('query','')}\n")
            log(f"  +{new_count} new (total seen: {len(seen)})")
            time.sleep(random.uniform(3.0, 6.0))

        browser.close()

    # Signal worker that scraping is done
    asyncio.run_coroutine_threadsafe(queue.put(None), loop).result()


# ── async email extraction + API push ────────────────────────────────────────

async def fetch_page(session, url):
    try:
        async with session.get(
            url, timeout=aiohttp.ClientTimeout(total=10), allow_redirects=True,
            headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
        ) as r:
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


async def push_single(session, lead):
    headers = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}
    for attempt in range(3):
        try:
            async with session.post(
                API_URL, json={"leads": [lead]}, headers=headers,
                timeout=aiohttp.ClientTimeout(total=30)
            ) as r:
                if r.status in (200, 201):
                    data = await r.json()
                    log(f"[API] -> {lead['agencyName']} created:{data.get('created',0)}")
                    return True
                elif r.status == 409:
                    return True
                else:
                    log(f"[API] status={r.status} attempt={attempt+1}: {await r.text()[:100]}")
        except Exception as e:
            log(f"[API] error attempt={attempt+1}: {e}")
        await asyncio.sleep(2 ** attempt)
    return False


async def worker(queue: asyncio.Queue):
    """Async worker: pulls from queue, fetches email, pushes to API immediately."""
    connector = aiohttp.TCPConnector(limit=CONCURRENCY)
    async with aiohttp.ClientSession(connector=connector) as session:
        pushed = 0
        failed = []
        while True:
            item = await queue.get()
            if item is None:  # sentinel — scraping done
                break
            domain = item["domain"]
            email = await get_email(session, domain)
            if not email:
                log(f"  [skip] {domain} — no email found")
                continue
            lead = {
                "leadId": lead_id(domain),
                "agencyName": item["name"],
                "agencyWebsite": f"https://{domain}",
                "outreachStatus": "NOT_CONTACTED",
                "agencyServices": "social media marketing",
                "sourceSearchQuery": item.get("query", "google_maps"),
                "notes": f"email: {email}",
            }
            ok = await push_single(session, lead)
            if ok:
                pushed += 1
            else:
                failed.append(domain)
                with open("maps_failed.txt", "a") as f:
                    f.write(domain + "\n")

        log(f"[Worker] Done. {pushed} leads pushed, {len(failed)} failures.")


async def main():
    log("=== Google Maps Agency Scraper ===")
    queue: asyncio.Queue = asyncio.Queue()
    seen: set = set()
    loop = asyncio.get_event_loop()

    # Run Playwright scraper in thread, async worker in event loop — in parallel
    scraper_future = loop.run_in_executor(None, scrape_all, queue, loop, seen)
    worker_task = asyncio.create_task(worker(queue))

    await asyncio.gather(scraper_future, worker_task)
    log("All done.")


if __name__ == "__main__":
    asyncio.run(main())
