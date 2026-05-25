from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
    )
    page = ctx.new_page()
    page.goto("https://www.designrush.com/agency/social-media-marketing", wait_until="networkidle", timeout=45000)
    page.wait_for_timeout(2000)
    html = page.content()
    soup = BeautifulSoup(html, "html.parser")

    card = soup.select_one("article.js-agency-item")
    if card:
        # Test each selector
        print("slogan:", card.select_one("h4.item-slogan"))
        print("description:", card.select_one(".item-description"))
        services = [s.get_text(strip=True) for s in card.select(".item-services li span")]
        print("services:", services)
        print("location:", card.select_one(".item-location, .location, [class*='location']"))
        print("employees:", card.select_one("[class*='employee'], [class*='size'], .item-size"))
        print("rating:", card.select_one("[class*='rating'], [class*='score'], .item-score"))
        print("reviews:", card.select_one("[class*='review'], .reviews-count"))

        # Print all text with class containing key terms
        for el in card.find_all(True):
            cls = " ".join(el.get("class", []))
            if any(k in cls for k in ["location", "employee", "rating", "score", "review", "budget", "hourly"]):
                print(f"  [{cls}]: {el.get_text(strip=True)[:80]}")

    browser.close()
