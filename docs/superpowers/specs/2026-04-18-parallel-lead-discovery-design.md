# Parallel Lead Discovery Engine — Design Spec
**Date:** 2026-04-18  
**Status:** Approved

---

## Goal

Discover 1000+ digital marketing agency domains and extract contact emails as fast as possible, then push them directly into Scribtly's outreach pipeline via API with status `NOT_CONTACTED`.

---

## Infrastructure

- **VPS:** `100.67.43.73` (Ubuntu 24.04, 96GB disk)
- **Scribtly API:** `https://scribtly.com/api/v1/outreach/leads/bulk`
- **Auth:** `Authorization: Bearer ab36e7b012db83e769f32ee5e41722283fcb0c29ab9662f9e39a4d71d7080055`
- **Language:** Python 3.12 with `aiohttp`, `asyncio`, `beautifulsoup4`

---

## Components

### 1. `vps_config.py`
Central config file. Contains:
- `API_URL`, `API_KEY`, `APP_BASE_URL = "https://scribtly.com"`
- `CONCURRENCY = 200` (aiohttp connector limit)
- `BATCH_SIZE = 50` (leads per API push)
- `SEARCH_QUERIES` — list of 100+ search query strings

### 2. `vps_discover.py` — Async Domain Discovery
Discovers agency domains from 3 sources in parallel:

**Source A: Google SERP HTML scraping**
- Queries: 100+ pre-defined queries ("digital marketing agency", "social media agency london", etc.)
- Rotating user agents (list of 20+)
- Random delays 0.5–2s per request to avoid blocks
- Parses `<a>` hrefs from result divs

**Source B: Bing SERP HTML scraping**
- Same queries, different results than Google
- `aiohttp` with 50 concurrent connections

**Source C: Common Crawl Index API**
- Free, no auth, massive dataset
- Query: `*.agency`, `*marketing*`, `*socialmedia*` URL patterns
- Returns thousands of domains per query
- Endpoint: `https://index.commoncrawl.org/CC-MAIN-2024-51-index?url=*.agency&output=json`

**Output:** Appends unique domains to `queue.txt` (one domain per line, deduped)

### 3. `vps_extract.py` — Async Email Extraction
Reads `queue.txt`, extracts emails, pushes to Scribtly API.

**Per domain:**
1. Fetch homepage + `/contact` + `/about` + `/contact-us` concurrently
2. Regex extract all emails: `[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}`
3. Filter: keep only emails matching the domain
4. If 0 emails found: skip (no Playwright fallback on VPS for speed)

**Batching:**
- Accumulate up to 50 leads in memory
- Push batch to `POST /api/v1/outreach/leads/bulk` every 30 seconds OR when batch hits 50
- Each lead payload:
  ```json
  {
    "leadId": "<domain-hash>",
    "agencyName": "<domain without TLD, title-cased>",
    "agencyWebsite": "https://<domain>",
    "outreachStatus": "NOT_CONTACTED",
    "sourceSearchQuery": "<query that found it>"
  }
  ```
- On 409 conflict (already exists): skip silently
- On 5xx: retry 3x with exponential backoff, then log to `failed.txt`

**Concurrency:** 200 simultaneous domain fetches via `aiohttp.TCPConnector(limit=200)`

### 4. `vps_run.sh` — Orchestrator
```bash
#!/bin/bash
# Run discovery and extraction in parallel, restart on crash
while true; do
  python3 vps_discover.py &
  python3 vps_extract.py &
  wait
  sleep 60  # brief pause before next round
done
```

**Logging:** Both scripts log to `discovery.log` and `extraction.log` with timestamps.

**Cron (optional):** Run fresh every 6 hours for new query batches.

### 5. `vps_setup.sh` — One-time VPS setup
```bash
apt update && apt install -y python3-pip python3-venv
pip3 install aiohttp beautifulsoup4 aiofiles
```

---

## Data Flow

```
Google SERP ─┐
Bing SERP   ─┼──► vps_discover.py ──► queue.txt ──► vps_extract.py ──► Scribtly API
Common Crawl─┘                                         (async, 200 concurrent)
```

---

## Performance Targets

| Stage | Rate |
|-------|------|
| Domain discovery | 500–2000 domains/hour |
| Email extraction | 100–300 domains/minute |
| API push | Batches of 50, every 30s |
| **Total leads/hour** | **~500–1000 with emails** |

---

## Output

- Leads appear in `https://scribtly.com/admin/outreach` with status `NOT_CONTACTED`
- `queue.txt` — all discovered domains (for reuse/debugging)
- `failed.txt` — domains that errored after retries
- `discovery.log` / `extraction.log` — timestamped logs

---

## What's NOT included (by design)

- Playwright rendering (too slow for bulk runs)
- Email verification (Hunter.io etc) — done separately in outreach flow
- Deduplication beyond domain-level (API handles upserts)
- Proxy rotation — VPS IP is clean, plain rotating user-agents sufficient

---

## Files to Create

| File | Location |
|------|----------|
| `vps_config.py` | repo root |
| `vps_discover.py` | repo root |
| `vps_extract.py` | repo root |
| `vps_run.sh` | repo root |
| `vps_setup.sh` | repo root |
