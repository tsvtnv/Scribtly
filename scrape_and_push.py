"""
scrape_and_push.py

Scrapes DesignRush and pushes leads to DB immediately after each page —
no email extraction, no waiting. Fast and visible progress.
Email extraction for instantly_import.csv runs separately via vps_clutch.py
or can be added as a second pass.
"""
import os
import random
import time
import requests
from vps_clutch import scrape_directory_page, lead_id, load_env_file, log, BATCH_SIZE
from playwright.sync_api import sync_playwright

_env = load_env_file()
API_KEY = _env.get("OUTREACH_API_KEY") or os.environ.get("OUTREACH_API_KEY", "")
BASE_URL = (_env.get("SCRIPTER_BASE_URL") or "https://scribtly.com").rstrip("/")
API_URL  = f"{BASE_URL}/api/v1/outreach/leads/bulk"

SOURCES = [
    ("https://www.designrush.com/agency/social-media-marketing", 215),
    ("https://www.designrush.com/agency/content-marketing",      100),
    ("https://www.designrush.com/agency/video-production",        80),
    ("https://www.designrush.com/agency/digital-marketing",      150),
    ("https://www.designrush.com/agency/email-marketing",         80),
    ("https://www.designrush.com/agency/seo",                    120),
    ("https://www.designrush.com/agency/ppc",                     80),
    ("https://www.designrush.com/agency/branding",                80),
    ("https://www.designrush.com/agency/advertising",             80),
    ("https://www.designrush.com/agency/public-relations",        50),
    ("https://www.designrush.com/agency/influencer-marketing",    50),
    ("https://www.designrush.com/agency/ecommerce-marketing",     60),
    ("https://www.designrush.com/agency/podcast-production",      30),
    ("https://www.designrush.com/agency/animation",               40),
]


_pushed = 0

def push_batch(batch):
    global _pushed
    if not batch:
        return
    headers = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}
    for attempt in range(3):
        try:
            r = requests.post(API_URL, json={"leads": batch}, headers=headers, timeout=30)
            if r.status_code in (200, 201):
                inner = r.json().get("data", {})
                _pushed += len(batch)
                log(f"[API] created:{inner.get('created',0)} updated:{inner.get('updated',0)} | total: {_pushed}")
                return
        except Exception as e:
            log(f"[API] error attempt {attempt+1}: {e}")
        time.sleep(2 ** attempt)


def build_lead(domain, info):
    notes_parts = []
    if info.get("employees"):   notes_parts.append(f"employees: {info['employees']}")
    if info.get("slogan"):      notes_parts.append(f"slogan: {info['slogan']}")
    if info.get("description"): notes_parts.append(f"description: {info['description']}")
    return {
        "leadId":            lead_id(domain),
        "agencyName":        info["name"],
        "agencyWebsite":     f"https://{domain}",
        "agencyServices":    info.get("services") or "digital marketing",
        "outreachStatus":    "NOT_CONTACTED",
        "sourceSearchQuery": "designrush.com",
        "notes":             "\n".join(notes_parts),
    }


def scrape_and_push():
    all_domains = set()
    batch = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        ctx = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
        )
        page = ctx.new_page()

        for base_url, max_pages in SOURCES:
            log(f"--- {base_url} ---")
            consecutive_empty = 0

            for page_num in range(max_pages):
                url = f"{base_url}?page={page_num}" if page_num > 0 else base_url
                found = scrape_directory_page(page, url)
                new = {k: v for k, v in found.items() if k not in all_domains}
                all_domains.update(new.keys())

                for domain, info in new.items():
                    batch.append(build_lead(domain, info))

                # Push immediately after every page
                if batch:
                    push_batch(batch)
                    batch = []

                log(f"  p{page_num}: +{len(new)} | total unique: {len(all_domains)}")

                if len(found) == 0:
                    consecutive_empty += 1
                    if consecutive_empty >= 3:
                        log("  3 empty pages, next source")
                        break
                else:
                    consecutive_empty = 0

                time.sleep(random.uniform(1.5, 3.0))

        browser.close()

    log(f"[+] Done. {len(all_domains)} unique agencies scraped, {_pushed} leads pushed.")


if __name__ == "__main__":
    if not API_KEY:
        log("ERROR: OUTREACH_API_KEY not set"); raise SystemExit(1)
    log("=== Scrape & Push (push after every page) ===")
    scrape_and_push()
