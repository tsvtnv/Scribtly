"""
parallel_push.py

Scrapes DesignRush categories NOT covered by the main vps_clutch.py run,
then pushes leads to the DB. Safe to run alongside vps_clutch.py.
"""
import asyncio
import aiohttp
import time
import os
from vps_clutch import scrape_directory_page, lead_id, load_env_file, log, SKIP_DOMAINS, BATCH_SIZE
from playwright.sync_api import sync_playwright
import random

_env = load_env_file()
API_KEY = _env.get("OUTREACH_API_KEY") or os.environ.get("OUTREACH_API_KEY", "")
BASE_URL = (_env.get("SCRIPTER_BASE_URL") or "https://scribtly.com").rstrip("/")
API_URL = f"{BASE_URL}/api/v1/outreach/leads/bulk"

# Categories NOT in the main pipeline
PARALLEL_SOURCES = [
    ("https://www.designrush.com/agency/email-marketing",           80),
    ("https://www.designrush.com/agency/seo",                      120),
    ("https://www.designrush.com/agency/ppc",                       80),
    ("https://www.designrush.com/agency/branding",                  80),
    ("https://www.designrush.com/agency/advertising",               80),
    ("https://www.designrush.com/agency/public-relations",          50),
    ("https://www.designrush.com/agency/influencer-marketing",      50),
    ("https://www.designrush.com/agency/ecommerce-marketing",       60),
    ("https://www.designrush.com/agency/podcast-production",        30),
    ("https://www.designrush.com/agency/animation",                 40),
]


def scrape_parallel():
    all_agencies = {}
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        ctx = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
        )
        page = ctx.new_page()
        for base_url, max_pages in PARALLEL_SOURCES:
            log(f"Scraping {base_url} (up to {max_pages} pages)...")
            consecutive_empty = 0
            for page_num in range(max_pages):
                url = f"{base_url}?page={page_num}" if page_num > 0 else base_url
                found = scrape_directory_page(page, url)
                new = {k: v for k, v in found.items() if k not in all_agencies}
                all_agencies.update(new)
                log(f"  Page {page_num}: +{len(new)} (total: {len(all_agencies)})")
                if len(found) == 0:
                    consecutive_empty += 1
                    if consecutive_empty >= 3:
                        log(f"  3 empty pages, stopping")
                        break
                else:
                    consecutive_empty = 0
                time.sleep(random.uniform(1.5, 3.0))
        browser.close()
    return all_agencies


async def push_leads(agencies: dict):
    headers = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}
    batch = []
    pushed = 0

    async with aiohttp.ClientSession() as session:
        for domain, info in agencies.items():
            notes_parts = []
            if info.get("employees"): notes_parts.append(f"employees: {info['employees']}")
            if info.get("slogan"):    notes_parts.append(f"slogan: {info['slogan']}")
            if info.get("description"): notes_parts.append(f"description: {info['description']}")

            batch.append({
                "leadId": lead_id(domain),
                "agencyName": info["name"],
                "agencyWebsite": f"https://{domain}",
                "agencyServices": info.get("services") or "digital marketing",
                "outreachStatus": "NOT_CONTACTED",
                "sourceSearchQuery": "designrush.com",
                "notes": "\n".join(notes_parts),
            })
            if len(batch) >= BATCH_SIZE:
                async with session.post(API_URL, json={"leads": batch}, headers=headers,
                                        timeout=aiohttp.ClientTimeout(total=30)) as r:
                    body = await r.json()
                    inner = body.get("data", {})
                    log(f"[API] created:{inner.get('created',0)} updated:{inner.get('updated',0)}")
                pushed += len(batch)
                batch = []

        if batch:
            async with session.post(API_URL, json={"leads": batch}, headers=headers,
                                    timeout=aiohttp.ClientTimeout(total=30)) as r:
                body = await r.json()
                inner = body.get("data", {})
                log(f"[API] created:{inner.get('created',0)} updated:{inner.get('updated',0)}")
            pushed += len(batch)

    log(f"[+] Pushed {pushed} leads")


if __name__ == "__main__":
    if not API_KEY:
        log("ERROR: OUTREACH_API_KEY not set")
        raise SystemExit(1)
    log("=== Parallel Push (fresh categories) ===")
    agencies = scrape_parallel()
    log(f"Scraped {len(agencies)} unique agencies, pushing...")
    asyncio.run(push_leads(agencies))
    log("Done.")
