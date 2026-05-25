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
    page.goto("https://clutch.co/agencies/social-media", wait_until="networkidle", timeout=45000)
    page.wait_for_timeout(3000)

    # Try to accept/dismiss cookie dialog
    for sel in ["#CybotCookiebotDialogBodyButtonAccept", "button[id*='Accept']", "button[id*='accept']"]:
        try:
            btn = page.query_selector(sel)
            if btn:
                btn.click()
                print(f"Clicked cookie button: {sel}")
                page.wait_for_timeout(2000)
                break
        except Exception:
            pass

    page.wait_for_timeout(3000)
    html = page.content()
    soup = BeautifulSoup(html, "html.parser")

    print(f"Total page length: {len(html)}")

    # Look for any div/article/section with 'provider' or 'agency' in class
    print("\n=== Elements with 'provider' or 'company' in class ===")
    for el in soup.find_all(True, limit=500):
        classes = " ".join(el.get("class", []))
        if any(kw in classes.lower() for kw in ["provider", "company", "agency", "firm", "listing"]):
            tag = el.name
            text = el.get_text()[:60].strip()
            print(f"  <{tag} class='{classes}'> {text!r}")
            if len([e for e in soup.find_all(True) if any(kw in " ".join(e.get("class", [])).lower() for kw in ["provider", "company", "agency", "firm", "listing"])]) > 10:
                break

    # Find all external links to non-clutch sites
    print("\n=== External links (non-clutch, non-cookie) ===")
    count = 0
    for a in soup.find_all("a", href=True):
        href = a.get("href", "")
        if href.startswith("http") and "clutch.co" not in href and "cookiebot" not in href and "linkedin" not in href and "google" not in href:
            count += 1
            if count <= 10:
                print(f"  {href!r}  text={a.get_text()[:40].strip()!r}")
    print(f"  Total external links: {count}")

    browser.close()
