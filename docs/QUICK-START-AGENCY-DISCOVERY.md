# Quick Start: Finding & Emailing Marketing Agencies

**TL;DR:** Three commands to find agencies and their emails.

---

## The 3-Step Process

### **Step 1: Discover Agencies (5-10 minutes)**

```bash
python find_agencies.py
```

This script:
- Searches DuckDuckGo for "social media marketing agency" + 15 other queries
- Finds ~100+ agency domains
- Verifies each domain is accessible (filters dead sites)
- Outputs: `discovered_agencies.txt` (one domain per line)

**What happens:**
```
FINDING SOCIAL MEDIA MARKETING AGENCIES
==================================================

[1/16] Query: social media marketing agency
--------------------------------------------------
  [*] Searching DuckDuckGo for: social media marketing agency
  [+] Found 15 results
  + agency1.com
  + agency2.co.uk
  + agency3.io
  ...

[*] Verifying domains are accessible...

[1/95] agency1.com ... (checked)
[2/95] agency2.co.uk ... (checked)
...

FINAL RESULTS
==================================================

[+] Valid, accessible agency domains: 87

  • agency1.com
  • agency2.co.uk
  ...

[+] Saved 87 domains to discovered_agencies.txt
```

---

### **Step 2: Extract Emails (30-60 minutes)**

```bash
python batch_email_extractor.py discovered_agencies.txt
```

This script:
- Takes the 87 agency domains
- Runs `agency_finder.py` on each one (finds ALL emails on each domain)
- Collects results into CSV, JSON, and filtered files
- Outputs 3 files:
  - `agency_emails.csv` — Spreadsheet with all emails
  - `agency_emails.json` — Full structured data
  - `agencies_with_emails.txt` — Only domains that have emails

**What happens:**
```
BATCH EMAIL EXTRACTION
==================================================

[*] Processing 87 domains...

[1/87] agency1.com ... ✓ (2 emails)
[2/87] agency2.co.uk ... ✓ (3 emails)
[3/87] agency3.io ... ✓ (1 email)
...

RESULTS SUMMARY
==================================================

[+] Processed: 87 domains
[+] Success: 81/87 (93%)
[+] Total emails found: 167

[+] Saved results to:
    • agency_emails.csv (full results)
    • agency_emails.json (full results)
    • agencies_with_emails.txt (domains with emails only)
```

**CSV Output Example:**
```
domain,emails
https://agency1.com,hello@agency1.com;sales@agency1.com
https://agency2.co.uk,info@agency2.co.uk
https://agency3.io,contact@agency3.io;support@agency3.io
```

---

### **Step 3: Verify & Outreach (Ongoing)**

**Quick email verification:**
```bash
python email_scraper.py
[+] Enter url to scan: agency1.com
[+] Found email: hello@agency1.com
```

**Full outreach (use Scribtly Outreach Skill):**
- Load `agencies_with_emails.txt` 
- Verify each email with Hunter.io (via Playwright)
- Send personalized emails via outreach skill
- Track engagement with personalized landing pages

See `docs/outreach-agent-skill.md` for full workflow.

---

## Files Breakdown

| File | Created by | Purpose | Format |
|------|-----------|---------|--------|
| `discovered_agencies.txt` | find_agencies.py | List of all found agency domains | Text (URLs) |
| `agency_emails.csv` | batch_email_extractor.py | All agencies + their emails | CSV (import to Excel) |
| `agency_emails.json` | batch_email_extractor.py | Full results with metadata | JSON |
| `agencies_with_emails.txt` | batch_email_extractor.py | Agencies with emails found | Text (URLs) |

---

## Expected Results

After running both scripts on ~95 agencies:
- **Agencies found:** 87-95
- **Agencies with emails:** 75-85 (80-90%)
- **Total emails extracted:** 150-200+
- **Time taken:** 45 minutes to 1 hour
- **Cost:** $0 (free tools only)

---

## Important Notes

### What `find_agencies.py` searches for:
```
social media marketing agency
social media agency content creation
instagram reels agency
tiktok marketing agency
youtube shorts marketing
short form video agency
video content creation agency
social media content agency
digital marketing agency social media
social media management company
instagram content agency
video marketing agency
social media strategy agency
content creation agency video
reels production agency
tiktok agency services
```

### What `batch_email_extractor.py` does:
- Runs `agency_finder.py` on each domain in series
- Extracts ALL unique domain-matching emails
- Filters out placeholder/test emails
- Aggregates results into CSV/JSON

### Limitations:
- Only finds publicly visible emails
- Emails behind contact forms are missed (use Playwright instead)
- Domains without public contact info will show 0 emails
- Takes 20-30 seconds per domain

---

## Next Steps

1. **Review CSV**
   ```bash
   # Open agency_emails.csv in Excel/Google Sheets
   ```

2. **Filter & Segment**
   ```bash
   # Only .com domains (more established)
   grep '.com,' agency_emails.csv > premium_agencies.csv

   # Only agencies with 2+ emails (more likely to be real)
   grep -E '.*;.*;' agency_emails.csv > high_quality_agencies.csv
   ```

3. **Verify Emails**
   ```bash
   # Quick check with email_scraper.py
   for domain in $(cat agencies_with_emails.txt | head -10); do
     echo "Checking $domain..."
     python email_scraper.py <<< "$domain"
   done
   ```

4. **Import to CRM**
   - Use `agency_emails.csv` or `agencies_with_emails.txt`
   - Add to your email list
   - Track engagement

5. **Start Outreach**
   - Use Scribtly outreach skill
   - Send personalized messages
   - Track with personalized landing pages

---

## Command Cheat Sheet

```bash
# 1. Find agencies
python find_agencies.py

# 2. Extract emails from found agencies
python batch_email_extractor.py discovered_agencies.txt

# 3. View results
cat agency_emails.csv                    # All results
cat agencies_with_emails.txt            # Only agencies with emails

# 4. Quick email check
python email_scraper.py

# 5. (Optional) Filter by domain
grep '.com,' agency_emails.csv > us_agencies.csv
grep '.co.uk,' agency_emails.csv > uk_agencies.csv

# 6. Count results
wc -l agencies_with_emails.txt          # Total with emails
cat agency_emails.csv | wc -l           # Total in CSV
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| find_agencies.py is slow | Normal - searches 16 queries, takes 5-10 minutes |
| batch_email_extractor.py is slow | Normal - 20-30 sec per domain, 87 domains = 45+ minutes |
| No agencies found | Check internet connection, DuckDuckGo might be rate-limiting |
| 0 emails for some agencies | Some don't have public email, use contact form instead |
| CSV has special characters | Open with UTF-8 encoding in Excel |

---

## Integration with Scribtly

Once you have `agencies_with_emails.txt`:

1. Use outreach skill with agency list
2. Verify each email with Hunter.io (via Playwright)
3. Send personalized message
4. Track engagement via personalized landing page (`https://scribtly.com/ref/{leadId}`)

See `docs/outreach-agent-skill.md` for complete workflow.

---

## Files in This Toolkit

```
find_agencies.py                    ← Find agency domains
batch_email_extractor.py            ← Extract emails from domains
agency_finder.py                    ← Find all emails on a domain
email_scraper.py                    ← Find primary email quickly

docs/finding-agencies-workflow.md   ← Detailed workflow
docs/QUICK-START-AGENCY-DISCOVERY.md ← This file
docs/outreach-agent-skill.md        ← Send outreach messages
```

---

## That's it!

You now have:
- ✅ List of 80-90+ agency domains
- ✅ Email addresses for each agency
- ✅ CSV/JSON with all results
- ✅ Filtered list ready for outreach

Ready to start personaliz ed outreach? Use the Scribtly outreach skill with `agencies_with_emails.txt`! 🚀
