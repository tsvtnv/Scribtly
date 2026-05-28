"""
Batch email scraper — reads URLs from a file, finds domain emails, outputs CSV.
Usage: python batch_email_scraper.py urls.txt [output.csv]
"""
import sys
import csv
import time
import re
from collections import deque
from urllib.parse import urlsplit

import requests
from bs4 import BeautifulSoup

try:
    from playwright.sync_api import sync_playwright
    PLAYWRIGHT_AVAILABLE = True
except ImportError:
    PLAYWRIGHT_AVAILABLE = False


def get_domain(url: str) -> str:
    return urlsplit(url).netloc.lower().lstrip("www.")


def get_base_url(url: str) -> str:
    p = urlsplit(url)
    return f"{p.scheme}://{p.netloc}"


def extract_emails(text: str) -> set:
    return set(re.findall(r"[a-z0-9.\-+_]+@[a-z0-9.\-+]+\.[a-z]{2,}", text, re.I))


CONTACT_PATHS = [
    "/contact", "/contactus", "/contact-us", "/get-in-touch",
    "/email", "/hello", "/inquiry", "/connect", "/reach-out",
    "/about", "/team", "/about-us",
]

LINK_PRIORITY = {
    "contact": 0, "contact-us": 0, "get-in-touch": 0, "email": 0,
    "about": 1, "team": 1, "about-us": 1,
    "services": 2, "work": 2, "portfolio": 2,
}


def link_priority(url: str, base: str) -> int:
    low = url.lower()
    for kw, pri in LINK_PRIORITY.items():
        if kw in low:
            return pri
    return 3 if url.startswith(base) else 999


def fetch(url: str, playwright_ctx=None) -> str | None:
    try:
        if playwright_ctx:
            page = playwright_ctx.new_page()
            page.goto(url, timeout=10000, wait_until="domcontentloaded")
            html = page.content()
            page.close()
            return html
        r = requests.get(url, timeout=6, headers={"User-Agent": "Mozilla/5.0"})
        r.raise_for_status()
        return r.text
    except Exception:
        return None


def find_email(start_url: str, playwright_ctx=None) -> str | None:
    base = get_base_url(start_url)
    domain = get_domain(start_url)
    if not domain:
        return None

    queue = deque()
    # Contact pages first
    for path in CONTACT_PATHS:
        queue.append(base + path)
    queue.append(start_url)

    seen = set()
    checked = 0

    while queue and checked < 20:
        url = queue.popleft()
        if url in seen or not url.startswith(base):
            continue
        seen.add(url)
        checked += 1

        html = fetch(url, playwright_ctx)
        if not html:
            continue

        for email in extract_emails(html):
            if email.split("@")[1].lower().lstrip("www.") == domain:
                return email.lower()

        soup = BeautifulSoup(html, "lxml")
        links = []
        for a in soup.find_all("a", href=True):
            href = a["href"].strip()
            if href.startswith("/"):
                href = base + href
            if href.startswith(base) and href not in seen:
                links.append((href, link_priority(href, base)))
        links.sort(key=lambda x: x[1])
        for lnk, _ in links[:15]:
            queue.append(lnk)

    return None


def process_url(url: str) -> dict:
    if not url.startswith("http"):
        url = "https://" + url
    domain = get_domain(url)
    print(f"  → {domain}", end=" ... ", flush=True)
    email = find_email(url)
    if not email and PLAYWRIGHT_AVAILABLE:
        try:
            with sync_playwright() as p:
                browser = p.chromium.launch(headless=True)
                ctx = browser.new_context()
                email = find_email(url, playwright_ctx=ctx)
                browser.close()
        except Exception:
            pass
    status = email if email else "NOT_FOUND"
    print(status)
    return {"url": url, "domain": domain, "email": email or ""}


def main():
    if len(sys.argv) < 2:
        print("Usage: python batch_email_scraper.py urls.txt [output.csv]")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else "emails_found.csv"

    with open(input_file) as f:
        urls = [line.strip() for line in f if line.strip() and not line.startswith("#")]

    print(f"Processing {len(urls)} URLs → {output_file}\n")

    results = []
    for i, url in enumerate(urls, 1):
        print(f"[{i}/{len(urls)}]", end=" ")
        result = process_url(url)
        results.append(result)
        time.sleep(0.5)

    found = [r for r in results if r["email"]]
    print(f"\nDone. Found {len(found)}/{len(urls)} emails.")

    with open(output_file, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["url", "domain", "email"])
        writer.writeheader()
        writer.writerows(results)

    print(f"Saved to {output_file}")


if __name__ == "__main__":
    main()
