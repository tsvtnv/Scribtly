# Parallel Lead Discovery Engine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an async Python lead discovery engine that runs on a VPS, scrapes 1000+ digital marketing agency domains, extracts contact emails, and pushes them directly to the Scribtly outreach pipeline.

**Architecture:** Three async Python scripts run in parallel on the VPS — `vps_discover.py` finds domains from Google SERP, Bing SERP, and Common Crawl; `vps_extract.py` reads the domain queue and concurrently fetches contact pages to extract emails; both push results to `https://scribtly.com/api/v1/outreach/leads/bulk`. A shell script orchestrates both processes with auto-restart.

**Tech Stack:** Python 3.12, `aiohttp`, `asyncio`, `beautifulsoup4`, `aiofiles`, bash

---

## File Structure

| File | Responsibility |
|------|---------------|
| `vps_config.py` | All constants: API URL, key, concurrency, query list |
| `vps_discover.py` | Async domain discovery from Google, Bing, Common Crawl |
| `vps_extract.py` | Async email extraction + Scribtly API push |
| `vps_run.sh` | Orchestrator: runs both scripts in parallel, auto-restarts |
| `vps_setup.sh` | One-time VPS dependency installation |
| `tests/test_vps_discover.py` | Unit tests for URL parsing / domain extraction |
| `tests/test_vps_extract.py` | Unit tests for email extraction / lead building |

---

### Task 1: Config File

**Files:**
- Create: `vps_config.py`

- [ ] **Step 1: Create config**

```python
# vps_config.py
import hashlib

API_URL = "https://scribtly.com/api/v1/outreach/leads/bulk"
API_KEY = "ab36e7b012db83e769f32ee5e41722283fcb0c29ab9662f9e39a4d71d7080055"
CONCURRENCY = 200          # simultaneous aiohttp connections
BATCH_SIZE = 50            # leads per API push
QUEUE_FILE = "queue.txt"
FAILED_FILE = "failed.txt"
DISCOVERY_LOG = "discovery.log"
EXTRACTION_LOG = "extraction.log"

SEARCH_QUERIES = [
    # General digital marketing
    "digital marketing agency",
    "digital marketing agency services",
    "full service digital marketing agency",
    "online marketing agency",
    "internet marketing agency",
    # Social media
    "social media marketing agency",
    "social media management agency",
    "social media agency services",
    "instagram marketing agency",
    "tiktok marketing agency",
    "youtube marketing agency",
    "facebook ads agency",
    "linkedin marketing agency",
    # Content
    "content marketing agency",
    "content creation agency",
    "video content agency",
    "short form video agency",
    "reels production agency",
    # SEO / PPC
    "seo agency",
    "ppc agency",
    "google ads agency",
    "paid media agency",
    "performance marketing agency",
    # Influencer
    "influencer marketing agency",
    "creator marketing agency",
    "ugc agency",
    # Ecommerce
    "ecommerce marketing agency",
    "shopify marketing agency",
    "amazon marketing agency",
    # Location-based (UK)
    "digital marketing agency london",
    "digital marketing agency manchester",
    "digital marketing agency birmingham",
    "social media agency uk",
    # Location-based (US)
    "digital marketing agency new york",
    "digital marketing agency los angeles",
    "digital marketing agency chicago",
    "social media agency usa",
    # Location-based (other)
    "digital marketing agency australia",
    "digital marketing agency canada",
    "digital marketing agency dubai",
    # Niche
    "b2b digital marketing agency",
    "saas marketing agency",
    "startup marketing agency",
    "small business marketing agency",
    "local business marketing agency",
    "brand awareness agency",
    "growth marketing agency",
    "demand generation agency",
    # Services
    "email marketing agency",
    "marketing automation agency",
    "conversion rate optimisation agency",
    "web design and marketing agency",
    "creative marketing agency",
    "branding agency digital",
    "pr and digital marketing agency",
    "video marketing agency",
    "podcast marketing agency",
    # More specific
    "tiktok ads agency",
    "instagram reels agency",
    "youtube shorts agency",
    "organic social media agency",
    "paid social agency",
    "community management agency",
    "social listening agency",
    "analytics marketing agency",
    "data driven marketing agency",
    "omnichannel marketing agency",
]

CONTACT_PATHS = ["/contact", "/contact-us", "/contactus", "/about", "/about-us", "/get-in-touch", "/hello", "/work-with-us"]

USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3 Safari/605.1.15",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Edg/121.0.0.0",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (iPad; CPU OS 17_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/122.0",
    "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Safari/605.1.15",
    "Mozilla/5.0 (Windows NT 10.0; rv:109.0) Gecko/20100101 Firefox/115.0",
    "Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:122.0) Gecko/20100101 Firefox/122.0",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.90 Mobile Safari/537.36",
    "Mozilla/5.0 (Linux; Android 13; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.90 Mobile Safari/537.36",
]

SKIP_DOMAINS = {
    "google.com", "google.co.uk", "google.com.au", "bing.com", "yahoo.com",
    "facebook.com", "instagram.com", "twitter.com", "x.com", "linkedin.com",
    "youtube.com", "tiktok.com", "reddit.com", "wikipedia.org", "amazon.com",
    "github.com", "stackoverflow.com", "quora.com", "medium.com", "wordpress.com",
    "wix.com", "squarespace.com", "shopify.com", "hubspot.com", "mailchimp.com",
    "indeed.com", "glassdoor.com", "clutch.co", "upwork.com", "fiverr.com",
    "yelp.com", "trustpilot.com", "bbb.org", "forbes.com", "entrepreneur.com",
    "businessinsider.com", "techcrunch.com", "mashable.com", "adweek.com",
}


def domain_to_lead_id(domain: str) -> str:
    """Generate a stable 32-char lead ID from a domain."""
    return hashlib.md5(domain.encode()).hexdigest()
```

- [ ] **Step 2: Commit**

```bash
cd /path/to/repo  # on VPS after deploy
git add vps_config.py
git commit -m "feat: add vps lead discovery config"
```

---

### Task 2: Domain Discovery Script

**Files:**
- Create: `vps_discover.py`
- Create: `tests/test_vps_discover.py`

- [ ] **Step 1: Write failing tests**

```python
# tests/test_vps_discover.py
import pytest
from vps_discover import extract_domains_from_google_html, extract_domains_from_bing_html, parse_commoncrawl_line

GOOGLE_SAMPLE = '''
<div class="yuRUbf"><a href="https://www.example-agency.com/about"><h3>Example Agency</h3></a></div>
<div class="yuRUbf"><a href="https://www.google.com/search?q=test"><h3>Google</h3></a></div>
<div class="yuRUbf"><a href="https://another-agency.co.uk/services"><h3>Another</h3></a></div>
'''

BING_SAMPLE = '''
<li class="b_algo"><h2><a href="https://www.bingresult-agency.com">Bing Agency</a></h2></li>
<li class="b_algo"><h2><a href="https://www.bing.com/search?q=test">Bing</a></h2></li>
'''

COMMONCRAWL_SAMPLE = '{"url": "https://someagency.com/contact", "filename": "crawl-data/CC-MAIN-2024-51/segments/abc.warc.gz"}'

def test_extract_domains_from_google_html():
    domains = extract_domains_from_google_html(GOOGLE_SAMPLE)
    assert "example-agency.com" in domains
    assert "another-agency.co.uk" in domains
    assert "google.com" not in domains  # SKIP_DOMAINS filtered

def test_extract_domains_from_bing_html():
    domains = extract_domains_from_bing_html(BING_SAMPLE)
    assert "bingresult-agency.com" in domains
    assert "bing.com" not in domains  # SKIP_DOMAINS filtered

def test_parse_commoncrawl_line():
    domain = parse_commoncrawl_line(COMMONCRAWL_SAMPLE)
    assert domain == "someagency.com"

def test_parse_commoncrawl_line_invalid():
    assert parse_commoncrawl_line("not json") is None
    assert parse_commoncrawl_line('{"no_url": "x"}') is None
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
pytest tests/test_vps_discover.py -v
```
Expected: `ImportError` or `ModuleNotFoundError` — functions don't exist yet.

- [ ] **Step 3: Implement `vps_discover.py`**

```python
# vps_discover.py
import asyncio
import aiohttp
import aiofiles
import json
import random
import re
import time
from urllib.parse import urlparse
from bs4 import BeautifulSoup
from vps_config import (
    QUEUE_FILE, DISCOVERY_LOG, USER_AGENTS, SKIP_DOMAINS,
    SEARCH_QUERIES, CONCURRENCY
)

# ── helpers ──────────────────────────────────────────────────────────────────

def _log(msg: str):
    line = f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] {msg}"
    print(line)
    with open(DISCOVERY_LOG, "a") as f:
        f.write(line + "\n")


def _domain_from_url(url: str) -> str | None:
    try:
        parsed = urlparse(url)
        domain = parsed.netloc.lower().lstrip("www.")
        if not domain or "." not in domain:
            return None
        return domain
    except Exception:
        return None


def extract_domains_from_google_html(html: str) -> set[str]:
    soup = BeautifulSoup(html, "html.parser")
    domains = set()
    for a in soup.select("div.yuRUbf a, div.tF2Cxc a, h3 a, .r a"):
        href = a.get("href", "")
        if not href.startswith("http"):
            continue
        domain = _domain_from_url(href)
        if domain and domain not in SKIP_DOMAINS:
            domains.add(domain)
    return domains


def extract_domains_from_bing_html(html: str) -> set[str]:
    soup = BeautifulSoup(html, "html.parser")
    domains = set()
    for a in soup.select("li.b_algo h2 a, li.b_algo .b_title a"):
        href = a.get("href", "")
        if not href.startswith("http"):
            continue
        domain = _domain_from_url(href)
        if domain and domain not in SKIP_DOMAINS:
            domains.add(domain)
    return domains


def parse_commoncrawl_line(line: str) -> str | None:
    try:
        data = json.loads(line.strip())
        url = data.get("url", "")
        if not url:
            return None
        return _domain_from_url(url)
    except Exception:
        return None


# ── async fetchers ────────────────────────────────────────────────────────────

async def fetch_google(session: aiohttp.ClientSession, query: str) -> set[str]:
    url = f"https://www.google.com/search?q={query.replace(' ', '+')}&num=50"
    headers = {"User-Agent": random.choice(USER_AGENTS)}
    try:
        async with session.get(url, headers=headers, timeout=aiohttp.ClientTimeout(total=15)) as resp:
            if resp.status != 200:
                return set()
            html = await resp.text()
            domains = extract_domains_from_google_html(html)
            _log(f"[Google] '{query}' -> {len(domains)} domains")
            return domains
    except Exception as e:
        _log(f"[Google] '{query}' error: {e}")
        return set()


async def fetch_bing(session: aiohttp.ClientSession, query: str) -> set[str]:
    url = f"https://www.bing.com/search?q={query.replace(' ', '+')}&count=50"
    headers = {"User-Agent": random.choice(USER_AGENTS)}
    try:
        async with session.get(url, headers=headers, timeout=aiohttp.ClientTimeout(total=15)) as resp:
            if resp.status != 200:
                return set()
            html = await resp.text()
            domains = extract_domains_from_bing_html(html)
            _log(f"[Bing] '{query}' -> {len(domains)} domains")
            return domains
    except Exception as e:
        _log(f"[Bing] '{query}' error: {e}")
        return set()


async def fetch_commoncrawl(session: aiohttp.ClientSession, pattern: str) -> set[str]:
    url = f"https://index.commoncrawl.org/CC-MAIN-2024-51-index?url={pattern}&output=json&limit=5000"
    try:
        async with session.get(url, timeout=aiohttp.ClientTimeout(total=60)) as resp:
            if resp.status != 200:
                return set()
            text = await resp.text()
            domains = set()
            for line in text.strip().splitlines():
                domain = parse_commoncrawl_line(line)
                if domain and domain not in SKIP_DOMAINS:
                    domains.add(domain)
            _log(f"[CommonCrawl] '{pattern}' -> {len(domains)} domains")
            return domains
    except Exception as e:
        _log(f"[CommonCrawl] '{pattern}' error: {e}")
        return set()


# ── queue writer ──────────────────────────────────────────────────────────────

async def append_new_domains(new_domains: set[str], known: set[str]) -> set[str]:
    """Write only truly new domains to queue.txt, return updated known set."""
    actually_new = new_domains - known
    if actually_new:
        async with aiofiles.open(QUEUE_FILE, "a") as f:
            for d in sorted(actually_new):
                await f.write(d + "\n")
        _log(f"[Queue] Added {len(actually_new)} new domains (total known: {len(known) + len(actually_new)})")
    return known | actually_new


# ── main ──────────────────────────────────────────────────────────────────────

async def main():
    # Load already-known domains to avoid duplicates
    known: set[str] = set()
    try:
        async with aiofiles.open(QUEUE_FILE, "r") as f:
            content = await f.read()
            known = {line.strip() for line in content.splitlines() if line.strip()}
        _log(f"[Queue] Loaded {len(known)} existing domains")
    except FileNotFoundError:
        pass

    connector = aiohttp.TCPConnector(limit=CONCURRENCY, ssl=False)
    async with aiohttp.ClientSession(connector=connector) as session:

        # 1. Google + Bing for all queries (batched with small delays)
        _log(f"[Discovery] Starting Google+Bing scrape for {len(SEARCH_QUERIES)} queries...")
        for i, query in enumerate(SEARCH_QUERIES):
            tasks = [
                fetch_google(session, query),
                fetch_bing(session, query),
            ]
            results = await asyncio.gather(*tasks)
            combined = set().union(*results)
            known = await append_new_domains(combined, known)
            # Random delay to avoid rate limits
            await asyncio.sleep(random.uniform(1.0, 3.0))

        # 2. Common Crawl patterns
        cc_patterns = [
            "*.agency",
            "*marketing-agency*",
            "*digital-agency*",
            "*social-media-agency*",
            "*seo-agency*",
            "*ppc-agency*",
            "*creative-agency*",
        ]
        _log(f"[Discovery] Starting Common Crawl scrape for {len(cc_patterns)} patterns...")
        cc_tasks = [fetch_commoncrawl(session, p) for p in cc_patterns]
        cc_results = await asyncio.gather(*cc_tasks)
        for result in cc_results:
            known = await append_new_domains(result, known)

    _log(f"[Discovery] Complete. Total domains in queue: {len(known)}")


if __name__ == "__main__":
    asyncio.run(main())
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
pytest tests/test_vps_discover.py -v
```
Expected: all 4 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add vps_discover.py tests/test_vps_discover.py
git commit -m "feat: add async domain discovery (Google, Bing, CommonCrawl)"
```

---

### Task 3: Email Extraction + API Push Script

**Files:**
- Create: `vps_extract.py`
- Create: `tests/test_vps_extract.py`

- [ ] **Step 1: Write failing tests**

```python
# tests/test_vps_extract.py
import pytest
from vps_extract import extract_emails_from_html, build_lead_payload, is_domain_email

def test_extract_emails_basic():
    html = "<p>Contact us at hello@example-agency.com or info@example-agency.com</p>"
    emails = extract_emails_from_html(html, "example-agency.com")
    assert "hello@example-agency.com" in emails
    assert "info@example-agency.com" in emails

def test_extract_emails_filters_foreign_domains():
    html = "<p>Email us: hello@example.com or spam@otherdomain.net</p>"
    emails = extract_emails_from_html(html, "example.com")
    assert "hello@example.com" in emails
    assert "spam@otherdomain.net" not in emails

def test_extract_emails_empty():
    emails = extract_emails_from_html("<p>No emails here</p>", "example.com")
    assert emails == set()

def test_is_domain_email_true():
    assert is_domain_email("hello@example-agency.com", "example-agency.com") is True
    assert is_domain_email("info@sub.example-agency.com", "example-agency.com") is True

def test_is_domain_email_false():
    assert is_domain_email("user@gmail.com", "example-agency.com") is False
    assert is_domain_email("noreply@mailchimp.com", "example-agency.com") is False

def test_build_lead_payload():
    lead = build_lead_payload(
        domain="example-agency.com",
        email="hello@example-agency.com",
        query="digital marketing agency"
    )
    assert lead["agencyWebsite"] == "https://example-agency.com"
    assert lead["outreachStatus"] == "NOT_CONTACTED"
    assert lead["leadId"] is not None
    assert len(lead["leadId"]) == 32
    assert lead["sourceSearchQuery"] == "digital marketing agency"
    assert lead["agencyName"] == "Example-Agency"

def test_build_lead_payload_no_email():
    lead = build_lead_payload(domain="test.com", email=None, query="agency")
    assert lead is None
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
pytest tests/test_vps_extract.py -v
```
Expected: `ImportError` — functions don't exist yet.

- [ ] **Step 3: Implement `vps_extract.py`**

```python
# vps_extract.py
import asyncio
import aiohttp
import aiofiles
import re
import time
import random
import json
from vps_config import (
    API_URL, API_KEY, QUEUE_FILE, FAILED_FILE, EXTRACTION_LOG,
    CONCURRENCY, BATCH_SIZE, CONTACT_PATHS, USER_AGENTS, domain_to_lead_id
)

EMAIL_RE = re.compile(r"[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}")
GENERIC_PREFIXES = {"noreply", "no-reply", "donotreply", "mailer-daemon", "postmaster", "abuse", "bounce"}

# ── helpers ──────────────────────────────────────────────────────────────────

def _log(msg: str):
    line = f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] {msg}"
    print(line)
    with open(EXTRACTION_LOG, "a") as f:
        f.write(line + "\n")


def is_domain_email(email: str, domain: str) -> bool:
    """True if email belongs to domain or a subdomain of it."""
    email_domain = email.split("@")[-1].lower()
    return email_domain == domain or email_domain.endswith("." + domain)


def extract_emails_from_html(html: str, domain: str) -> set[str]:
    found = EMAIL_RE.findall(html)
    result = set()
    for email in found:
        email = email.lower().strip(".")
        prefix = email.split("@")[0]
        if prefix in GENERIC_PREFIXES:
            continue
        if is_domain_email(email, domain):
            result.add(email)
    return result


def build_lead_payload(domain: str, email: str | None, query: str) -> dict | None:
    if not email:
        return None
    name = domain.split(".")[0].replace("-", " ").replace("_", " ").title()
    return {
        "leadId": domain_to_lead_id(domain),
        "agencyName": name,
        "agencyWebsite": f"https://{domain}",
        "outreachStatus": "NOT_CONTACTED",
        "sourceSearchQuery": query,
        "notes": f"email: {email}",
    }


# ── async fetchers ────────────────────────────────────────────────────────────

async def fetch_page(session: aiohttp.ClientSession, url: str) -> str:
    headers = {"User-Agent": random.choice(USER_AGENTS)}
    try:
        async with session.get(url, headers=headers, timeout=aiohttp.ClientTimeout(total=10), allow_redirects=True) as resp:
            if resp.status >= 400:
                return ""
            return await resp.text(errors="ignore")
    except Exception:
        return ""


async def extract_email_for_domain(session: aiohttp.ClientSession, domain: str) -> tuple[str, str | None]:
    """Returns (domain, first_email_found_or_None)."""
    urls = [f"https://{domain}"] + [f"https://{domain}{p}" for p in CONTACT_PATHS]
    # Fetch all pages concurrently
    pages = await asyncio.gather(*[fetch_page(session, u) for u in urls])
    for html in pages:
        emails = extract_emails_from_html(html, domain)
        if emails:
            return domain, sorted(emails)[0]  # take alphabetically first
    return domain, None


# ── API push ──────────────────────────────────────────────────────────────────

async def push_batch(session: aiohttp.ClientSession, batch: list[dict]) -> bool:
    """Push up to 50 leads to Scribtly API. Returns True on success."""
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    }
    payload = {"leads": batch}
    for attempt in range(3):
        try:
            async with session.post(
                API_URL,
                json=payload,
                headers=headers,
                timeout=aiohttp.ClientTimeout(total=30)
            ) as resp:
                if resp.status in (200, 201):
                    data = await resp.json()
                    _log(f"[API] Pushed {len(batch)} leads -> created:{data.get('created',0)} updated:{data.get('updated',0)}")
                    return True
                elif resp.status == 409:
                    _log(f"[API] Batch already exists (409), skipping")
                    return True
                else:
                    body = await resp.text()
                    _log(f"[API] Push failed status={resp.status} attempt={attempt+1}: {body[:200]}")
        except Exception as e:
            _log(f"[API] Push error attempt={attempt+1}: {e}")
        await asyncio.sleep(2 ** attempt)
    return False


# ── main ──────────────────────────────────────────────────────────────────────

async def main():
    # Load domains from queue
    try:
        async with aiofiles.open(QUEUE_FILE, "r") as f:
            content = await f.read()
        domains = [d.strip() for d in content.splitlines() if d.strip()]
    except FileNotFoundError:
        _log(f"[Extract] {QUEUE_FILE} not found — run vps_discover.py first")
        return

    _log(f"[Extract] Processing {len(domains)} domains with concurrency={CONCURRENCY}")

    connector = aiohttp.TCPConnector(limit=CONCURRENCY, ssl=False)
    async with aiohttp.ClientSession(connector=connector) as session:
        batch: list[dict] = []
        processed = 0
        emails_found = 0
        failed_domains: list[str] = []

        # Process in chunks to avoid holding all results in memory
        chunk_size = 500
        for i in range(0, len(domains), chunk_size):
            chunk = domains[i:i + chunk_size]
            results = await asyncio.gather(*[extract_email_for_domain(session, d) for d in chunk])

            for domain, email in results:
                processed += 1
                if not email:
                    continue

                lead = build_lead_payload(domain, email, query="vps_discovery")
                if lead:
                    batch.append(lead)
                    emails_found += 1

                if len(batch) >= BATCH_SIZE:
                    success = await push_batch(session, batch)
                    if not success:
                        failed_domains.extend(b["agencyWebsite"] for b in batch)
                    batch = []

            _log(f"[Extract] Progress: {processed}/{len(domains)} domains, {emails_found} emails found")

        # Push remaining batch
        if batch:
            success = await push_batch(session, batch)
            if not success:
                failed_domains.extend(b["agencyWebsite"] for b in batch)

    # Save failed domains
    if failed_domains:
        async with aiofiles.open(FAILED_FILE, "a") as f:
            for d in failed_domains:
                await f.write(d + "\n")
        _log(f"[Extract] {len(failed_domains)} domains failed to push -> {FAILED_FILE}")

    _log(f"[Extract] Done. {emails_found}/{len(domains)} had emails. {len(failed_domains)} push failures.")


if __name__ == "__main__":
    asyncio.run(main())
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
pytest tests/test_vps_extract.py -v
```
Expected: all 7 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add vps_extract.py tests/test_vps_extract.py
git commit -m "feat: add async email extraction and Scribtly API push"
```

---

### Task 4: Orchestrator + Setup Scripts

**Files:**
- Create: `vps_run.sh`
- Create: `vps_setup.sh`

- [ ] **Step 1: Create setup script**

```bash
# vps_setup.sh
#!/bin/bash
set -e

echo "[Setup] Installing Python dependencies..."
sudo apt update -y
sudo apt install -y python3-pip python3-venv git

echo "[Setup] Creating virtual environment..."
python3 -m venv /home/ubuntu/venv
source /home/ubuntu/venv/bin/activate

echo "[Setup] Installing Python packages..."
pip install aiohttp aiofiles beautifulsoup4 pytest lxml

echo "[Setup] Done. Activate with: source /home/ubuntu/venv/bin/activate"
```

- [ ] **Step 2: Create orchestrator script**

```bash
# vps_run.sh
#!/bin/bash
# Runs discovery and extraction in parallel, auto-restarts on crash.
set -e

VENV=/home/ubuntu/venv/bin/python3
REPO_DIR="$(cd "$(dirname "$0")" && pwd)"

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

run_discovery() {
  while true; do
    log "Starting vps_discover.py..."
    $VENV "$REPO_DIR/vps_discover.py" 2>&1 | tee -a "$REPO_DIR/discovery.log"
    log "vps_discover.py exited. Restarting in 60s..."
    sleep 60
  done
}

run_extraction() {
  # Wait for queue to populate before first extraction run
  sleep 120
  while true; do
    log "Starting vps_extract.py..."
    $VENV "$REPO_DIR/vps_extract.py" 2>&1 | tee -a "$REPO_DIR/extraction.log"
    log "vps_extract.py exited. Restarting in 30s..."
    sleep 30
  done
}

log "=== Lead Discovery Engine Starting ==="
run_discovery &
DISCOVERY_PID=$!
run_extraction &
EXTRACTION_PID=$!

log "Discovery PID=$DISCOVERY_PID  Extraction PID=$EXTRACTION_PID"
log "Logs: discovery.log  extraction.log"

# Wait for both — if one dies the whole script exits (set -e handles this at func level)
wait
```

- [ ] **Step 3: Make scripts executable**

```bash
chmod +x vps_run.sh vps_setup.sh
```

- [ ] **Step 4: Commit**

```bash
git add vps_run.sh vps_setup.sh
git commit -m "feat: add VPS orchestrator and setup scripts"
```

---

### Task 5: Deploy to VPS and Run

- [ ] **Step 1: SSH into VPS**

```bash
ssh ubuntu@100.67.43.73
```

- [ ] **Step 2: Clone repo and run setup**

```bash
cd /home/ubuntu
git clone <your-repo-url> scripter
cd scripter
bash vps_setup.sh
```

- [ ] **Step 3: Run tests on VPS**

```bash
source /home/ubuntu/venv/bin/activate
pytest tests/test_vps_discover.py tests/test_vps_extract.py -v
```
Expected: all 11 tests PASS.

- [ ] **Step 4: Start the engine**

```bash
source /home/ubuntu/venv/bin/activate
nohup bash vps_run.sh > run.log 2>&1 &
echo "Engine PID: $!"
```

- [ ] **Step 5: Verify it's running**

```bash
tail -f discovery.log
# Should see lines like:
# [2026-04-18 18:30:00] [Google] 'digital marketing agency' -> 12 domains
# [2026-04-18 18:30:02] [Queue] Added 10 new domains (total known: 10)
```

- [ ] **Step 6: After ~5 minutes, check extraction logs**

```bash
tail -f extraction.log
# Should see lines like:
# [2026-04-18 18:35:00] [Extract] Processing 150 domains with concurrency=200
# [2026-04-18 18:35:15] [API] Pushed 50 leads -> created:48 updated:2
```

- [ ] **Step 7: Verify leads appear in Scribtly**

Open `https://scribtly.com/admin/outreach` — new leads should appear with status `NOT_CONTACTED`.

- [ ] **Step 8: Set up cron for continuous 24/7 running**

```bash
crontab -e
```

Add:
```
@reboot sleep 30 && source /home/ubuntu/venv/bin/activate && nohup bash /home/ubuntu/scripter/vps_run.sh >> /home/ubuntu/scripter/run.log 2>&1 &
```

This auto-starts the engine after any VPS reboot.

---

## Self-Review Checklist

- [x] `vps_config.py` covers API_URL, API_KEY, CONCURRENCY, BATCH_SIZE, QUEUE_FILE, FAILED_FILE, USER_AGENTS, SKIP_DOMAINS, SEARCH_QUERIES, CONTACT_PATHS, `domain_to_lead_id()`
- [x] `vps_discover.py` implements Google SERP, Bing SERP, Common Crawl — all three spec sources
- [x] `vps_extract.py` pushes to `POST /api/v1/outreach/leads/bulk` with correct auth header and `outreachStatus: "NOT_CONTACTED"`
- [x] Batch size matches spec (50 leads per push)
- [x] Retry logic: 3 attempts with exponential backoff
- [x] `failed.txt` captures domains that couldn't be pushed
- [x] `vps_run.sh` runs both scripts in parallel with auto-restart
- [x] `vps_setup.sh` installs all dependencies
- [x] Tests cover all pure functions
- [x] `domain_to_lead_id()` defined in config and imported consistently in both scripts
- [x] `build_lead_payload` returns `None` when no email — tested and handled in main loop
