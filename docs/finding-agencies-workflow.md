# Complete Workflow: Finding & Emailing Social Media Marketing Agencies

**Goal:** Find all social media marketing agencies → Extract their emails → Build targeted outreach list

---

## The 3-Step Process

```
Step 1: DISCOVER AGENCIES (find_agencies.py)
        ↓
Step 2: EXTRACT EMAILS (batch_email_extractor.py)
        ↓
Step 3: VERIFY & OUTREACH (email_scraper.py + Playwright MCP)
```

---

## Step 1: Discover Agencies — `find_agencies.py`

**What it does:**
- Searches for social media marketing agencies using 16 targeted queries
- Finds domains matching: "social media agency", "tiktok agency", "reels agency", etc.
- Verifies each domain is actually accessible (filters dead sites)
- Saves list of valid agency domains

**How to run:**
```bash
python find_agencies.py
```

**What happens:**
```
╔════════════════════════════════════════════════════╗
║  FINDING SOCIAL MEDIA MARKETING AGENCIES          ║
╚════════════════════════════════════════════════════╝

[1/16] Query: social media marketing agency
──────────────────────────────────────────────────────
  [*] Searching DuckDuckGo for: social media marketing agency
  [+] Found 20 results
  + agency1.com
  + agency2.co.uk
  + agency3.io
  ... (continues for all 16 queries)

[*] Verifying domains are accessible...

[1/120] agency1.com ... ✓
[2/120] agency2.co.uk ... ✓
[3/120] deadsite.com ... ✗
... (continues for all domains)

╔════════════════════════════════════════════════════╗
║  FINAL RESULTS                                     ║
╚════════════════════════════════════════════════════╝

[+] Valid, accessible agency domains: 95

  • agency1.com
  • agency2.co.uk
  • agency3.io
  ... (list of all 95)

[+] Saved 95 domains to discovered_agencies.txt
```

**Output file:**
- `discovered_agencies.txt` — One domain per line, ready for next step

**Queries it uses:**
```
social media marketing agency
social media agency content creation
instagram reels agency
tiktok marketing agency
youtube shorts marketing
short form video agency
video content creation agency
... (16 total, covering all main platforms)
```

---

## Step 2: Extract Emails — `batch_email_extractor.py`

**What it does:**
- Takes the list of discovered agency domains
- Runs `agency_finder.py` on each domain (extracts ALL emails)
- Collects results into JSON, CSV, and filtered lists
- Shows summary statistics

**How to run:**
```bash
python batch_email_extractor.py discovered_agencies.txt
```

**What happens:**
```
╔════════════════════════════════════════════════════╗
║  BATCH EMAIL EXTRACTION                            ║
╚════════════════════════════════════════════════════╝

[*] Processing 95 domains...

[1/95] agency1.com ... ✓ (2 emails)
[2/95] agency2.co.uk ... ✓ (3 emails)
[3/95] agency3.io ... ✓ (1 email)
[4/95] broken-agency.com ... ✗ (no emails)
... (continues for all 95)

╔════════════════════════════════════════════════════╗
║  RESULTS SUMMARY                                   ║
╚════════════════════════════════════════════════════╝

[+] Processed: 95 domains
[+] Success: 87/95 (92%)
[+] Total emails found: 156

[+] Saved results to:
    • agency_emails.json (full results)
    • agency_emails.csv (CSV format)
    • agencies_with_emails.txt (domains with emails only)
```

**Output files:**

1. **agency_emails.json** — Full structured data
```json
[
  {
    "domain": "https://agency1.com",
    "emails": ["hello@agency1.com", "sales@agency1.com"],
    "success": true
  },
  {
    "domain": "https://agency2.co.uk",
    "emails": ["info@agency2.co.uk"],
    "success": true
  }
]
```

2. **agency_emails.csv** — Spreadsheet format (import to Excel/Sheets)
```
domain,emails
https://agency1.com,hello@agency1.com;sales@agency1.com
https://agency2.co.uk,info@agency2.co.uk
https://agency3.io,NO_EMAILS
```

3. **agencies_with_emails.txt** — Filtered list (only domains with found emails)
```
https://agency1.com
https://agency2.co.uk
https://agency3.io
... (87 agencies with emails)
```

---

## Step 3: Verify & Outreach

Now you have a list of 87 agencies with email addresses. Next:

### Option A: Quick Email Verification
```bash
# Verify primary email for an agency
python email_scraper.py
[+] Enter url to scan: agency1.com
[+] Found email: hello@agency1.com
```

### Option B: Hunter.io Verification + Outreach
Use the **Scribtly Outreach Skill**:
1. Load agencies from `agencies_with_emails.txt`
2. Verify each email with Hunter.io (via Playwright MCP)
3. Send personalized outreach message
4. Track engagement via personalized links

See `docs/outreach-agent-skill.md` for full outreach workflow.

---

## Complete Example: Finding Agencies in Your Region

### Find UK-specific agencies:
```bash
# Modify find_agencies.py to include location:
# Search queries like:
# 'social media marketing agency UK'
# 'instagram reels agency london'
# 'tiktok agency UK'
```

### Find agencies in specific niches:
```bash
# For e-commerce:
# 'social media agency shopify'
# 'tiktok marketing e-commerce'
# 'reels production for dropshipping'

# For SaaS:
# 'social media agency for saas'
# 'linkedin content agency'
# 'b2b social media agency'

# For agencies targeting specific platforms:
# 'youtube shorts production'
# 'instagram content agency'
# 'tiktok growth agency'
```

---

## The Full Pipeline (Step by Step)

### Run 1: Discovery (5-10 minutes)
```bash
python find_agencies.py
# Output: discovered_agencies.txt (95 domains)
```

### Run 2: Email Extraction (30-60 minutes, depending on internet)
```bash
python batch_email_extractor.py discovered_agencies.txt
# Output: agency_emails.csv, agencies_with_emails.txt
```

### Run 3: Verify & Outreach
```bash
# Option 1: Manual verification
for domain in $(cat agencies_with_emails.txt); do
  python email_scraper.py <<< "$domain"
done

# Option 2: Use Scribtly outreach skill
# (Loads from agencies_with_emails.txt, verifies with Hunter.io, sends emails)
```

---

## Output Files Reference

| File | Purpose | Format | Usage |
|------|---------|--------|-------|
| `discovered_agencies.txt` | All found agency domains | Plain text (URLs) | Input to batch extractor |
| `agency_emails.json` | All results + metadata | JSON | Programmatic processing |
| `agency_emails.csv` | Results in spreadsheet format | CSV | Import to Excel/Sheets/CRM |
| `agencies_with_emails.txt` | Only agencies with emails | Plain text (URLs) | Input to outreach |

---

## Tips & Tricks

### 1. Filter by Quality
After extraction, quality-filter agencies:
```bash
# Only include agencies with 2+ emails
grep -E '.*;.*;' agency_emails.csv

# Only include .com domains (more likely to be established)
grep '.com,' agency_emails.csv
```

### 2. Batch Processing in Chunks
If you have 500+ agencies, process in batches:
```bash
# Split into chunks of 50
split -l 50 discovered_agencies.txt agencies_chunk_

# Process each chunk
python batch_email_extractor.py agencies_chunk_aa
python batch_email_extractor.py agencies_chunk_ab
python batch_email_extractor.py agencies_chunk_ac
```

### 3. Combine Results
```bash
# Merge multiple extraction runs
cat agency_emails_chunk1.csv agency_emails_chunk2.csv > combined_agencies.csv
```

### 4. Detect Fake Agencies
Agencies with 0 emails might be:
- Dead sites
- Redirect/forwarding services
- Not actual agencies

These are already filtered in `agencies_with_emails.txt`.

---

## Troubleshooting

### "find_agencies.py" finds too few agencies
**Solution:** 
- Add more search queries (location-specific, niche-specific)
- Use different search engines (currently uses DuckDuckGo, could add Bing, Yahoo)
- Increase `results_per_query` parameter

### "batch_email_extractor.py" takes too long
**Solution:**
- Process domains in parallel (requires refactoring)
- Or process in smaller batches
- Or skip JavaScript sites (modify `agency_finder.py` to skip `use_playwright=True`)

### Some agencies have 0 emails found
**Possible reasons:**
- Agency doesn't have publicly visible email (only contact forms)
- Email addresses are behind JavaScript that didn't render properly
- Website blocks scraping

**Solution:**
- These agencies can still be contacted via their contact forms (use Playwright MCP in outreach skill)
- Or manually check their website

### CSV file has encoding issues
**Solution:**
```bash
# Convert to UTF-8
iconv -f CP1252 -t UTF-8 agency_emails.csv > agency_emails_utf8.csv
```

---

## Performance Stats

| Tool | Domains | Time | Speed |
|------|---------|------|-------|
| find_agencies.py | 95 | 5 min | 1 domain/3 sec |
| batch_email_extractor.py | 95 | 45 min | 1 domain/30 sec |
| **Total for 95 agencies** | **95** | **50 min** | - |

Scaling:
- 500 agencies: ~4 hours
- 1000 agencies: ~8 hours

For faster extraction, process in parallel or skip JavaScript sites.

---

## Next Steps After Getting Emails

1. **Import to Spreadsheet**
   - Open `agency_emails.csv` in Excel/Google Sheets
   - Add columns: FitScore, Status, Last Contact, Notes

2. **Verify with Hunter.io**
   - Use email_scraper.py or Playwright MCP
   - Mark emails as "Deliverable" or "Risky"

3. **Segment by Quality**
   - fitScore > 4: Send personalized email
   - fitScore 2-3: Send to contact form
   - fitScore < 2: Skip

4. **Outreach**
   - Use Scribtly outreach skill
   - Send personalized messages via email or contact form
   - Track engagement via personalized links

See `docs/outreach-agent-skill.md` for the complete outreach workflow.

---

## Files Created for This Workflow

```
find_agencies.py                    → Discover agency domains
batch_email_extractor.py            → Extract emails from domains
docs/finding-agencies-workflow.md   → This file
```

Plus existing tools:
```
agency_finder.py                    → Find all emails on a domain
email_scraper.py                    → Find primary email quickly
docs/outreach-agent-skill.md        → Send outreach messages
```

---

## Quick Command Reference

```bash
# Step 1: Find agencies
python find_agencies.py

# Step 2: Extract emails
python batch_email_extractor.py discovered_agencies.txt

# Step 3: View results
cat agency_emails.csv

# Step 4: Outreach (use Scribtly skill with agencies_with_emails.txt)
```

That's it! You now have a complete list of agencies with emails ready for outreach.
