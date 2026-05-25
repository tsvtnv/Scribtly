# Clutch Lead Pipeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix and extend `vps_clutch.py` so it scrapes 5,000+ agencies from Clutch, extracts emails, pushes leads to the DB, and outputs `instantly_import.csv` ready for Instantly.ai.

**Architecture:** Three focused fixes to the existing `vps_clutch.py` — (1) read secrets from `.env.local` instead of hardcoding, (2) fix the API response parsing bug, (3) add more Clutch categories/pages and emit `instantly_import.csv`. Pure helper functions get unit tests.

**Tech Stack:** Python 3.11, playwright (sync), aiohttp, beautifulsoup4, requests, pytest

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `vps_clutch.py` | Modify | Main pipeline — scrape → extract emails → push to API → write CSV |
| `tests/test_vps_clutch.py` | Create | Unit tests for pure functions: `domain_from_url`, `pick_email`, `lead_id`, `load_env`, `first_name_from_agency` |

Python alias for all commands: `python3.11` = `C:\Users\tsvet\AppData\Local\Microsoft\WindowsApps\python3.11.exe`

---

## Task 1: Write failing tests for pure functions

**Files:**
- Create: `tests/test_vps_clutch.py`

- [ ] **Step 1.1: Create the test file**

```python
# tests/test_vps_clutch.py
import pytest
from vps_clutch import domain_from_url, pick_email, lead_id, first_name_from_agency, load_env_file


def test_domain_from_url_strips_www():
    assert domain_from_url("https://www.example-agency.com/about") == "example-agency.com"


def test_domain_from_url_no_www():
    assert domain_from_url("https://example-agency.com") == "example-agency.com"


def test_domain_from_url_invalid():
    assert domain_from_url("not-a-url") is None


def test_domain_from_url_none():
    assert domain_from_url(None) is None


def test_pick_email_prefers_contact():
    emails = {"noreply@ex.com", "info@ex.com", "contact@ex.com"}
    assert pick_email(emails, "ex.com") == "contact@ex.com"


def test_pick_email_skips_generic_prefixes():
    emails = {"noreply@ex.com", "postmaster@ex.com"}
    assert pick_email(emails, "ex.com") is None


def test_pick_email_filters_foreign_domains():
    emails = {"hello@ex.com", "user@gmail.com"}
    assert pick_email(emails, "ex.com") == "hello@ex.com"


def test_pick_email_empty():
    assert pick_email(set(), "ex.com") is None


def test_lead_id_is_deterministic():
    assert lead_id("example.com") == lead_id("example.com")


def test_lead_id_differs_for_different_domains():
    assert lead_id("agency-a.com") != lead_id("agency-b.com")


def test_lead_id_is_32_chars():
    assert len(lead_id("example.com")) == 32


def test_first_name_from_agency_simple():
    assert first_name_from_agency("Acme Agency") == "Acme"


def test_first_name_from_agency_single_word():
    assert first_name_from_agency("Velocify") == "Velocify"


def test_first_name_from_agency_empty():
    assert first_name_from_agency("") == "there"


def test_load_env_file_parses_key_value(tmp_path):
    env_file = tmp_path / ".env.local"
    env_file.write_text('OUTREACH_API_KEY=abc123\nSCRIPTER_BASE_URL=https://example.com\n')
    result = load_env_file(str(env_file))
    assert result["OUTREACH_API_KEY"] == "abc123"
    assert result["SCRIPTER_BASE_URL"] == "https://example.com"


def test_load_env_file_ignores_comments(tmp_path):
    env_file = tmp_path / ".env.local"
    env_file.write_text('# comment\nKEY=value\n')
    result = load_env_file(str(env_file))
    assert "# comment" not in result
    assert result["KEY"] == "value"


def test_load_env_file_missing_file():
    result = load_env_file("/nonexistent/.env.local")
    assert result == {}
```

- [ ] **Step 1.2: Run tests — expect failures (functions not yet updated)**

```
cd C:\Users\tsvet\Documents\Website Projects\Currently Workin On\scripter
C:\Users\tsvet\AppData\Local\Microsoft\WindowsApps\python3.11.exe -m pytest tests/test_vps_clutch.py -v 2>&1
```

Expected: ImportError or multiple FAILED — `first_name_from_agency` and `load_env_file` don't exist yet.

---

## Task 2: Add `load_env_file` and `first_name_from_agency`, fix API parsing, read key from env

**Files:**
- Modify: `vps_clutch.py`

- [ ] **Step 2.1: Replace the top of `vps_clutch.py` with these changes**

Replace lines 1–14 (imports + hardcoded constants) with:

```python
# vps_clutch.py
import asyncio
import aiohttp
import hashlib
import json
import os
import random
import re
import time
from pathlib import Path
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup


def load_env_file(path: str = ".env.local") -> dict:
    """Read key=value pairs from a .env file. Returns empty dict if file missing."""
    result = {}
    try:
        for line in Path(path).read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            result[k.strip()] = v.strip().strip('"').strip("'")
    except FileNotFoundError:
        pass
    return result


_env = load_env_file()

API_KEY = _env.get("OUTREACH_API_KEY") or os.environ.get("OUTREACH_API_KEY", "")
BASE_URL = (_env.get("SCRIPTER_BASE_URL") or os.environ.get("SCRIPTER_BASE_URL", "https://scribtly.com")).rstrip("/")
API_URL = f"{BASE_URL}/api/v1/outreach/leads/bulk"

CONCURRENCY = 100
BATCH_SIZE = 50
CONTACT_PATHS = ["/contact", "/contact-us", "/contactus", "/about", "/about-us"]
EMAIL_RE = re.compile(r"[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}")
GENERIC_PREFIXES = {"noreply", "no-reply", "donotreply", "postmaster", "abuse", "bounce"}
PREFERRED_PREFIXES = ["contact", "hello", "info", "hi", "team", "media", "press"]

SKIP_DOMAINS = {
    "clutch.co", "designrush.com", "sortlist.com", "upcity.com",
    "google.com", "facebook.com", "linkedin.com", "twitter.com",
    "instagram.com", "youtube.com", "tiktok.com",
}

SOURCES = [
    ("https://clutch.co/agencies/social-media", 80),
    ("https://clutch.co/agencies/social-media-marketing", 80),
    ("https://clutch.co/agencies/content-marketing", 60),
    ("https://clutch.co/agencies/video-production", 60),
    ("https://clutch.co/agencies/digital-marketing", 80),
    ("https://www.designrush.com/agency/social-media-marketing", 20),
    ("https://upcity.com/profiles/social-media-agencies", 10),
]
```

- [ ] **Step 2.2: Add `first_name_from_agency` helper after `pick_email`**

Add this function immediately after the `pick_email` function (after line ~61):

```python
def first_name_from_agency(agency_name: str) -> str:
    """Extract first word of agency name for email personalisation."""
    if not agency_name:
        return "there"
    return agency_name.split()[0]
```

- [ ] **Step 2.3: Fix the API response parsing bug in `push_batch`**

The current code reads `data.get('created', 0)` but the bulk API wraps results under `data.data`. Replace the success branch in `push_batch`:

Old code (around line 182–185):
```python
                if r.status in (200, 201):
                    data = await r.json()
                    log(f"[API] Pushed {len(batch)} -> created:{data.get('created',0)} updated:{data.get('updated',0)}")
                    return True
```

New code:
```python
                if r.status in (200, 201):
                    body = await r.json()
                    inner = body.get("data", {})
                    log(f"[API] Pushed {len(batch)} -> created:{inner.get('created',0)} updated:{inner.get('updated',0)}")
                    return True
```

- [ ] **Step 2.4: Run failing tests — expect fewer failures**

```
C:\Users\tsvet\AppData\Local\Microsoft\WindowsApps\python3.11.exe -m pytest tests/test_vps_clutch.py -v 2>&1
```

Expected: `test_load_env_file_*` and `test_first_name_from_agency_*` now pass. `test_domain_from_url_none` may still fail if `domain_from_url` doesn't guard against None.

- [ ] **Step 2.5: Fix `domain_from_url` to handle None input**

Current code:
```python
def domain_from_url(url):
    try:
        d = urlparse(url).netloc.lower()
        return d[4:] if d.startswith("www.") else d
    except Exception:
        return None
```

Replace with:
```python
def domain_from_url(url):
    if not url:
        return None
    try:
        d = urlparse(url).netloc.lower()
        if not d:
            return None
        return d[4:] if d.startswith("www.") else d
    except Exception:
        return None
```

- [ ] **Step 2.6: Run tests — all should pass**

```
C:\Users\tsvet\AppData\Local\Microsoft\WindowsApps\python3.11.exe -m pytest tests/test_vps_clutch.py -v 2>&1
```

Expected: All PASSED.

- [ ] **Step 2.7: Commit**

```
git add vps_clutch.py tests/test_vps_clutch.py
git commit -m "fix: read API key from env, fix response parsing, add test helpers"
```

---

## Task 3: Add `instantly_import.csv` output

**Files:**
- Modify: `vps_clutch.py` — `extract_and_push` function + `main`

The goal: collect `(email, agency_name, domain, lead_id)` for every lead that gets an email, then write `instantly_import.csv` at the end.

- [ ] **Step 3.1: Update `extract_and_push` to collect instantly rows**

Replace the entire `extract_and_push` function with:

```python
async def extract_and_push(agencies: dict) -> list[dict]:
    """Extract emails, push leads to API. Returns list of instantly rows."""
    connector = aiohttp.TCPConnector(limit=CONCURRENCY)
    instantly_rows: list[dict] = []

    async with aiohttp.ClientSession(connector=connector) as session:
        domains = list(agencies.keys())
        batch = []
        pushed = 0
        failed = []

        chunk_size = 50
        for i in range(0, len(domains), chunk_size):
            chunk = domains[i:i + chunk_size]
            emails = await asyncio.gather(*[get_email(session, d) for d in chunk])

            for domain, email in zip(chunk, emails):
                if not email:
                    continue
                info = agencies[domain]
                lid = lead_id(domain)
                batch.append({
                    "leadId": lid,
                    "agencyName": info["name"],
                    "agencyWebsite": f"https://{domain}",
                    "outreachStatus": "NOT_CONTACTED",
                    "agencyServices": "social media marketing",
                    "sourceSearchQuery": "clutch.co",
                    "notes": f"employees: {info.get('employees', '')}",
                })
                instantly_rows.append({
                    "email": email,
                    "first_name": first_name_from_agency(info["name"]),
                    "website": f"https://{domain}",
                    "ref_url": f"{BASE_URL}/ref/{lid}",
                })
                if len(batch) >= BATCH_SIZE:
                    ok = await push_batch(session, batch)
                    if not ok:
                        failed.extend(b["agencyWebsite"] for b in batch)
                    pushed += len(batch)
                    batch = []

            log(f"Progress: {min(i+chunk_size, len(domains))}/{len(domains)} domains processed")

        if batch:
            ok = await push_batch(session, batch)
            if not ok:
                failed.extend(b["agencyWebsite"] for b in batch)
            pushed += len(batch)

        if failed:
            with open("clutch_failed.txt", "a") as f:
                f.write("\n".join(failed) + "\n")

        log(f"Done. {pushed} leads pushed, {len(failed)} failures.")

    return instantly_rows
```

- [ ] **Step 3.2: Update `main` to write `instantly_import.csv`**

Replace the entire `main` function with:

```python
async def main():
    import csv

    if not API_KEY:
        log("ERROR: OUTREACH_API_KEY not set in .env.local or environment")
        return

    log("=== Clutch Agency Scraper ===")
    log(f"Target: {API_URL}")
    agencies = scrape_all_sources()

    log(f"Found {len(agencies)} unique agencies")
    with open("clutch_agencies.txt", "w") as f:
        for domain, info in sorted(agencies.items()):
            f.write(f"{domain}|{info['name']}|{info.get('employees','')}\n")

    if not agencies:
        log("No agencies found — check if Playwright/Chromium is installed")
        return

    instantly_rows = await extract_and_push(agencies)

    instantly_path = "instantly_import.csv"
    with open(instantly_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["email", "first_name", "website", "ref_url"])
        writer.writeheader()
        writer.writerows(instantly_rows)

    log(f"[+] Instantly.ai import saved to {instantly_path} ({len(instantly_rows)} rows)")
    log("[+] Pipeline complete. Import instantly_import.csv into your Instantly campaign.")
```

- [ ] **Step 3.3: Run existing tests to make sure nothing broke**

```
C:\Users\tsvet\AppData\Local\Microsoft\WindowsApps\python3.11.exe -m pytest tests/test_vps_clutch.py -v 2>&1
```

Expected: All PASSED (pure functions unchanged).

- [ ] **Step 3.4: Commit**

```
git add vps_clutch.py
git commit -m "feat: output instantly_import.csv, expand Clutch sources to 7 categories"
```

---

## Task 4: Smoke-test with a single Clutch page

Before running the full pipeline (which takes hours), verify the scraper works against one page.

- [ ] **Step 4.1: Run a quick smoke test**

```
C:\Users\tsvet\AppData\Local\Microsoft\WindowsApps\python3.11.exe -c "
from vps_clutch import scrape_directory_page, log
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_context().new_page()
    results = scrape_directory_page(page, 'https://clutch.co/agencies/social-media')
    log(f'Found {len(results)} agencies on page 1')
    for domain, info in list(results.items())[:3]:
        print(f'  {domain}: {info[\"name\"]}')
    browser.close()
" 2>&1
```

Expected: Prints 10–30 agency domains with names. If 0 results, the CSS selectors need updating (see Step 4.2).

- [ ] **Step 4.2 (conditional): Fix selectors if smoke test returns 0 results**

Only do this if Step 4.1 returned 0 results. Run this to inspect the actual Clutch HTML structure:

```
C:\Users\tsvet\AppData\Local\Microsoft\WindowsApps\python3.11.exe -c "
from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_context().new_page()
    page.goto('https://clutch.co/agencies/social-media', wait_until='domcontentloaded')
    page.wait_for_timeout(3000)
    html = page.content()
    soup = BeautifulSoup(html, 'html.parser')
    # Print first 3 li tags with class containing 'provider'
    rows = soup.find_all('li', limit=5)
    for r in rows:
        if r.get('class'):
            print(r.get('class'), r.get_text()[:80])
    browser.close()
" 2>&1
```

Then update `scrape_directory_page` in `vps_clutch.py` to use the correct selectors based on what you see. The key selectors to fix are in the `rows = (...)` block and the `# Name` + `# Website` comments within the for loop.

- [ ] **Step 4.3: Commit smoke test result (no code change needed if Step 4.1 passed)**

If selectors were fixed in 4.2:
```
git add vps_clutch.py
git commit -m "fix: update Clutch HTML selectors for current page structure"
```

---

## Task 5: Run the full pipeline

- [ ] **Step 5.1: Run the full scraper**

This takes 2–4 hours depending on internet speed and Clutch rate limits. Run it:

```
C:\Users\tsvet\AppData\Local\Microsoft\WindowsApps\python3.11.exe vps_clutch.py 2>&1
```

Watch for:
- `[HH:MM:SS] Scraping https://clutch.co/...` — scraping in progress
- `[HH:MM:SS] Found N unique agencies` — scraping complete
- `[HH:MM:SS] Progress: N/M domains processed` — email extraction in progress
- `[HH:MM:SS] [API] Pushed 50 -> created:X updated:Y` — leads being pushed
- `[HH:MM:SS] [+] Instantly.ai import saved to instantly_import.csv (N rows)` — done

- [ ] **Step 5.2: Verify outputs**

```
C:\Users\tsvet\AppData\Local\Microsoft\WindowsApps\python3.11.exe -c "
import csv
with open('instantly_import.csv') as f:
    rows = list(csv.DictReader(f))
print(f'Total rows: {len(rows)}')
for r in rows[:3]:
    print(r)
" 2>&1
```

Expected: 500–5,000+ rows, each with `email`, `first_name`, `website`, `ref_url`.

- [ ] **Step 5.3: Verify leads in admin dashboard**

Open `https://scribtly.com/admin/outreach` — confirm leads appear with correct agency names and NOT_CONTACTED status.

- [ ] **Step 5.4: Import `instantly_import.csv` into Instantly.ai**

1. Open Instantly.ai → Campaigns → your campaign → Leads tab
2. Click "Import leads" → upload `instantly_import.csv`
3. Map columns: `email` → Email, `first_name` → First Name, `ref_url` → custom variable `{{ref_url}}`
4. In email body, use `{{ref_url}}` as the CTA link

---

## Email Copy Starter (for Instantly.ai sequence)

**Email 1 (Day 0):**
```
Subject: scripts for {{first_name}}'s clients

Hey {{first_name}},

Quick one — do you currently write scripts for your clients' social media videos?

I built Scribtly to handle exactly that. It learns each client's voice and generates client-ready scripts in under 60 seconds. PDF export, pipeline tracking, client share links for approvals — all included.

You can try it free here (I set up a page for you): {{ref_url}}

Worth 2 minutes if scripts are part of your workflow.

[Your name]
```

**Email 2 (Day 3):**
```
Subject: re: scripts

Hey {{first_name}}, just wanted to bump this in case it got buried.

{{ref_url}} — free to try, no card needed.

[Your name]
```
