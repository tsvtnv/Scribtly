"""
Quick push: scrape 10 pages from each DesignRush category and push leads to the DB immediately.
No email extraction - just name + website. Runs alongside the main pipeline without conflict.
"""
import asyncio
import aiohttp
import time
from vps_clutch import scrape_directory_page, lead_id, first_name_from_agency, load_env_file, log, SKIP_DOMAINS
from playwright.sync_api import sync_playwright
import os

_env = load_env_file()
API_KEY = _env.get("OUTREACH_API_KEY") or os.environ.get("OUTREACH_API_KEY", "")
BASE_URL = (_env.get("SCRIPTER_BASE_URL") or "https://scribtly.com").rstrip("/")
API_URL = f"{BASE_URL}/api/v1/outreach/leads/bulk"

QUICK_SOURCES = [
    ("https://www.designrush.com/agency/social-media-marketing", 10),
    ("https://www.designrush.com/agency/content-marketing", 10),
    ("https://www.designrush.com/agency/video-production", 10),
    ("https://www.designrush.com/agency/digital-marketing", 10),
]


def scrape_quick():
    all_agencies = {}
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        ctx = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
        )
        page = ctx.new_page()
        for base_url, max_pages in QUICK_SOURCES:
            log(f"Quick scrape: {base_url}")
            for page_num in range(max_pages):
                url = f"{base_url}?page={page_num + 2}" if page_num > 0 else base_url
                found = scrape_directory_page(page, url)
                new = {k: v for k, v in found.items() if k not in all_agencies}
                all_agencies.update(new)
                log(f"  Page {page_num}: +{len(new)} (total: {len(all_agencies)})")
                time.sleep(1.5)
        browser.close()
    return all_agencies


async def push_leads(agencies: dict):
    headers = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}
    batch = []
    pushed = 0

    async with aiohttp.ClientSession() as session:
        for domain, info in agencies.items():
            batch.append({
                "leadId": lead_id(domain),
                "agencyName": info["name"],
                "agencyWebsite": f"https://{domain}",
                "agencyServices": "social media marketing",
                "outreachStatus": "NOT_CONTACTED",
                "sourceSearchQuery": "designrush.com",
            })
            if len(batch) >= 50:
                async with session.post(API_URL, json={"leads": batch}, headers=headers, timeout=aiohttp.ClientTimeout(total=30)) as r:
                    body = await r.json()
                    inner = body.get("data", {})
                    log(f"[API] created:{inner.get('created',0)} updated:{inner.get('updated',0)}")
                pushed += len(batch)
                batch = []

        if batch:
            async with session.post(API_URL, json={"leads": batch}, headers=headers, timeout=aiohttp.ClientTimeout(total=30)) as r:
                body = await r.json()
                inner = body.get("data", {})
                log(f"[API] created:{inner.get('created',0)} updated:{inner.get('updated',0)}")
            pushed += len(batch)

    log(f"[+] Pushed {pushed} leads to {BASE_URL}/admin/outreach")


if __name__ == "__main__":
    log("=== Quick Push ===")
    agencies = scrape_quick()
    log(f"Scraped {len(agencies)} agencies, pushing now...")
    asyncio.run(push_leads(agencies))
    log("Done.")
