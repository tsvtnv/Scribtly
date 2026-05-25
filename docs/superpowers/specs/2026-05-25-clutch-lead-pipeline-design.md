# Clutch Lead Pipeline — Design Spec

**Date:** 2026-05-25  
**Goal:** Generate 5,000–25,000 agency leads and import them into Scripter's outreach system for Instantly.ai cold email campaigns.

---

## Problem

The existing `find_agencies.py` script uses DuckDuckGo and yields ~100 agency domains per run before hitting rate limits. To fill Instantly.ai's 25,000-contact capacity requires hundreds of manual runs. Clutch.co has 50,000+ social media/content agencies listed with websites — one scrape solves the scale problem entirely.

---

## Approach

Two new Python scripts that slot into the existing pipeline:

```
scrape_clutch.py          ← NEW: Scrapes Clutch.co for agency domains
import_leads.py           ← NEW: Imports CSV into Scripter via bulk API

find_agencies.py          ← EXISTING (unchanged)
batch_email_extractor.py  ← EXISTING (unchanged)
agency_finder.py          ← EXISTING (unchanged)
```

**Full pipeline:**
```
scrape_clutch.py
    → clutch_agencies.txt (domains, one per line)
    → batch_email_extractor.py clutch_agencies.txt
    → agency_emails.csv
    → import_leads.py agency_emails.csv
    → leads in DB → /ref/{leadId} pages live
    → paste emails into Instantly.ai
```

---

## Script 1: `scrape_clutch.py`

**Input:** None (hardcoded Clutch category URLs)  
**Output:** `clutch_agencies.txt` — one domain per line

**What it does:**
- Scrapes Clutch.co category pages: Social Media Marketing, Content Marketing, Video Production
- Each category has paginated results (25 per page, up to 200 pages = 5,000 per category)
- Extracts company name + website URL from each listing card
- Deduplicates domains
- Writes to `clutch_agencies.txt`

**Clutch listing structure:**
- Category URL: `https://clutch.co/agencies/social-media-marketing?page=0`
- Company card contains: name, website link, location, services tags, rating, review count
- Website links are direct domain URLs (not proxied)

**Libraries:** `requests`, `beautifulsoup4` (already likely installed)  
**Rate limiting:** 1–2 second delay between pages, randomised user-agent  
**Expected output:** 3,000–10,000 unique domains per category run

---

## Script 2: `import_leads.py`

**Input:** `agency_emails.csv` (output of `batch_email_extractor.py`)  
**Output:** Leads created in DB via `POST /api/v1/outreach/leads/bulk`

**What it does:**
- Reads CSV rows: `domain, emails`
- For each row, generates a `leadId` from the domain (slugified, e.g. `agency1-com`)
- Infers `agencyName` from domain (strips TLD, capitalises)
- Infers `agencyServices` from domain/name keywords (tiktok → "tiktok", youtube → "youtube", etc.)
- Calls bulk API in batches of 50
- Prints progress + summary

**Auth:** Reads `OUTREACH_API_KEY` from `.env.local` (same key used by the API)  
**Base URL:** Reads `SCRIPTER_BASE_URL` from `.env.local` (defaults to `http://localhost:3000`)

**LeadId format:** `{slugified-domain}-{6-char-hash}` to avoid collisions if the same domain appears in multiple CSVs.

**CSV → lead mapping:**
| CSV field | Lead field |
|-----------|-----------|
| domain | `agencyWebsite` |
| first email | used for Instantly (not stored in lead) |
| inferred from domain | `agencyName`, `agencyServices` |
| generated | `leadId` |

**Note:** The script outputs a second file `instantly_import.csv` with columns `email, first_name, website, ref_url` — ready to paste directly into Instantly.ai as a campaign lead list.

---

## Instantly.ai Integration

After running `import_leads.py`, the user:
1. Opens `instantly_import.csv`
2. Imports it into an Instantly.ai campaign as leads
3. Each lead's `ref_url` column = `https://scribtly.com/ref/{leadId}`
4. Email copy uses `{{ref_url}}` variable as the CTA link

Each email recipient lands on a personalised page at `/ref/{leadId}` that shows their agency name and relevant pain points — already built.

---

## Constraints

- No new dependencies in the Next.js app — Python scripts only
- Scripts must run on Windows (PowerShell-compatible paths)
- Must handle Clutch's lazy-loaded content (may need Playwright if requests+BS4 fails)
- `import_leads.py` must be idempotent — re-running the same CSV doesn't duplicate leads (bulk API upserts)

---

## Files Created

| File | Purpose |
|------|---------|
| `scrape_clutch.py` | Scrape Clutch.co for agency domains |
| `import_leads.py` | Import CSV into Scripter + generate Instantly CSV |
