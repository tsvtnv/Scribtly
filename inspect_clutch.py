from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
import re

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
    )
    page = ctx.new_page()
    page.goto("https://clutch.co/agencies/social-media", wait_until="domcontentloaded", timeout=30000)
    page.wait_for_timeout(4000)
    html = page.content()
    soup = BeautifulSoup(html, "html.parser")

    # Find all li elements with classes
    print("=== LI elements with classes ===")
    for li in soup.find_all("li", limit=20):
        classes = li.get("class", [])
        if classes:
            print(f"  <li class='{' '.join(classes)}'> text[:60]={li.get_text()[:60].strip()!r}")

    print("\n=== All external links (http, not clutch.co) ===")
    for a in soup.find_all("a", href=re.compile(r"^https?://(?!clutch\.co)"), limit=30):
        print(f"  href={a['href']!r}  class={a.get('class')}  text={a.get_text()[:40].strip()!r}")

    print("\n=== H3 elements ===")
    for h3 in soup.find_all("h3", limit=10):
        print(f"  class={h3.get('class')}  text={h3.get_text()[:60].strip()!r}")

    browser.close()
