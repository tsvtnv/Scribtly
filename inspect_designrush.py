from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
import re

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        viewport={"width": 1280, "height": 900},
    )
    page = ctx.new_page()
    page.goto("https://www.designrush.com/agency/social-media-marketing", wait_until="networkidle", timeout=45000)
    page.wait_for_timeout(3000)
    html = page.content()
    soup = BeautifulSoup(html, "html.parser")

    print(f"Page length: {len(html)}")

    # Look for agency listings
    print("\n=== Elements with agency-related classes ===")
    found = []
    for el in soup.find_all(True):
        classes = " ".join(el.get("class", []))
        if any(kw in classes.lower() for kw in ["agency", "provider", "company", "listing", "card", "firm"]):
            found.append((el.name, classes[:60], el.get_text()[:60].strip()))
    for item in found[:15]:
        print(f"  <{item[0]} class='{item[1]}'> {item[2]!r}")

    # External links
    print("\n=== External agency links ===")
    count = 0
    for a in soup.find_all("a", href=True):
        href = a.get("href", "")
        if href.startswith("http") and "designrush" not in href and "google" not in href and "cookie" not in href.lower():
            count += 1
            if count <= 10:
                print(f"  {href!r}  text={a.get_text()[:40].strip()!r}")
    print(f"  Total external links: {count}")

    browser.close()
