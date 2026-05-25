from vps_clutch import scrape_directory_page, log
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
    )
    page = ctx.new_page()
    results = scrape_directory_page(page, "https://www.designrush.com/agency/social-media-marketing")
    log(f"Found {len(results)} agencies on page 1")
    for domain, info in list(results.items())[:5]:
        name = info["name"]
        print(f"  {domain}: {name}")
    browser.close()
