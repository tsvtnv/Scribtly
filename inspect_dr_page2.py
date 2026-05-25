from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    )
    page = ctx.new_page()

    # Try pagination formats
    for url in [
        "https://www.designrush.com/agency/social-media-marketing/p/2",
        "https://www.designrush.com/agency/social-media-marketing?page=2",
    ]:
        page.goto(url, wait_until="networkidle", timeout=30000)
        page.wait_for_timeout(2000)
        html = page.content()
        soup = BeautifulSoup(html, "html.parser")
        articles = soup.select("article.js-agency-item")
        print(f"URL: {url}")
        print(f"  Articles found: {len(articles)}")
        if articles:
            # Show first one
            a = articles[0]
            ext_links = [l["href"] for l in a.find_all("a", href=True) if l["href"].startswith("http") and "designrush" not in l["href"]]
            name_el = a.select_one("a.gtm-name")
            print(f"  First agency: {name_el.get_text().strip() if name_el else 'N/A'}")
            print(f"  External links: {ext_links[:2]}")
            break
        print("  No articles — trying next URL format")

    browser.close()
