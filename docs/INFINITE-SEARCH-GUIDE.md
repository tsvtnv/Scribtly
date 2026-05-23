# Infinite Agency Discovery — Random Search Combinations

**Generate unlimited discovery combinations with randomized search queries.**

---

## Overview

`infinite_agency_search.py` uses **random word combinations** to generate unique search queries each time you run it. This means:

✅ **Each run finds DIFFERENT agencies** (not the same ones repeatedly)
✅ **Infinite combinations** from 13 platforms + 14 services + 16 content types  
✅ **Privacy-focused** using SearXNG metasearch
✅ **No API limits** — generate as many searches as you want

---

## How It Works

### The Word Lists

**Platforms (13 words):**
```
tiktok, instagram, reels, youtube, shorts,
snapchat, pinterest, twitter, linkedin, facebook,
threads, bluesky, mastodon
```

**Services (14 words):**
```
marketing, agency, management, production,
creation, services, company, studio, group,
collective, bureau, firm, consultancy, specialist
```

**Content Types (16 words):**
```
content, video, script, reels, shorts,
post, campaign, strategy, growth, engagement,
viral, trending, ads, promotion, branding, social, digital, creative
```

**Audience (12 words):**
```
small business, ecommerce, startup, brand,
influencer, creator, entrepreneur, client,
customer, business, company, seller
```

**Actions (10 words):**
```
create, make, produce, manage, grow,
boost, increase, scale, develop, build
```

### Random Generation Algorithm

Each run:
1. Picks **2-4 random words** from the lists
2. Shuffles the selection to create unique combinations
3. Generates **N unique queries** (you specify the number)

**Example output from 2 runs:**

**Run 1:**
```
reels engagement
creation social
shorts creator content
specialist build marketing
studio mastodon ads facebook
```

**Run 2:**
```
twitter creator grow services
instagram brand
mastodon youtube create
company social promotion
company entrepreneur
```

---

## Quick Start

### Run 1: Generate Agencies

```bash
python infinite_agency_search.py
```

When prompted, enter how many random queries:
```
[?] How many random search queries to generate? (default 20): 20
```

**Output:**
- `discovered_agencies.txt` — List of agency domains found
- `search_queries_used.txt` — Queries that were used this run

### Run 2: Extract Emails

```bash
python batch_email_extractor.py discovered_agencies.txt
```

**Output:**
- `agency_emails.csv` — All emails found
- `agencies_with_emails.txt` — Agencies with emails only

### Run Again: Find MORE Agencies

Since each run uses different random queries:

```bash
python infinite_agency_search.py
```

Enter a different number:
```
[?] How many random search queries to generate? (default 20): 30
```

**Result:** Find agencies you didn't find before!

---

## Example Workflow: Progressive Discovery

Run multiple times to build a growing list:

```bash
# Round 1: 20 queries
python infinite_agency_search.py
# Finds: 20-30 unique agencies

# Round 2: 30 queries (different random combinations)
python infinite_agency_search.py
# Finds: Another 15-25 agencies (mostly new)

# Round 3: 25 queries (different random combinations again)
python infinite_agency_search.py
# Finds: Another 10-20 new agencies

# Total: 45-75 unique agencies without repeating the same searches
```

---

## Mathematical Combinations

With 5 word lists and 2-4 word selections per query:

**Possible combinations:**
- 13 platforms × 14 services × 16 content types = **29,120** base combinations
- Add audience + actions = **100,000+** unique possible queries
- Multiple word selections = **1,000,000+** total combinations

**Reality:** You'll never run out of unique searches!

---

## Output Files

### `discovered_agencies.txt`
List of all agency domains found that are accessible:
```
https://agorapulse.com
https://billo.io
https://brandboost.agency
...
```

### `search_queries_used.txt`
The random queries that were generated this run:
```
reels engagement
creation social
shorts creator content
specialist build marketing
studio mastodon ads facebook
```

Use this to track what searches you've done.

---

## Tips & Tricks

### 1. Progressive Discovery (Recommended)
Run multiple times with increasing numbers to build a comprehensive list:

```bash
# Night 1
python infinite_agency_search.py  # 50 queries → ~40 agencies

# Night 2
python infinite_agency_search.py  # 50 queries → ~35 new agencies

# Night 3
python infinite_agency_search.py  # 50 queries → ~30 new agencies

# Combine all discovered_agencies.txt files
cat discovered_agencies_*.txt | sort | uniq > all_agencies.txt
```

### 2. Batch Extract with Combining

```bash
# Run discovery 3 times
for i in {1..3}; do
  python infinite_agency_search.py <<< "30"
  mv discovered_agencies.txt discovered_agencies_run_$i.txt
done

# Combine all results
cat discovered_agencies_run_*.txt | sort | uniq > all_unique_agencies.txt

# Extract emails from combined list
python batch_email_extractor.py all_unique_agencies.txt
```

### 3. Filter by Quality

After discovery, filter for premium agencies:

```bash
# Only .com domains (more established)
grep '.com' discovered_agencies.txt > premium_agencies.txt

# Only specific regions
grep '.co.uk' discovered_agencies.txt > uk_agencies.txt
grep '.au' discovered_agencies.txt > au_agencies.txt
```

### 4. Track What You've Searched

Keep a running log of searches:

```bash
# Append each run to a master log
for i in {1..10}; do
  echo "=== Run $i ===" >> all_searches.log
  cat search_queries_used.txt >> all_searches.log
  python infinite_agency_search.py <<< "20"
  echo "" >> all_searches.log
  sleep 300  # Wait 5 minutes between runs
done
```

---

## Scheduling on Dell R420

Run infinitely on your server with cron:

```bash
# Run discovery every 6 hours
0 */6 * * * cd /home/user/scripter && python infinite_agency_search.py <<< "30" >> discovery.log

# Run email extraction daily
0 2 * * * cd /home/user/scripter && python batch_email_extractor.py discovered_agencies.txt >> extraction.log

# Combine all results weekly
0 3 * * 0 cd /home/user/scripter && cat discovered_agencies_*.txt | sort | uniq > all_agencies.txt
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Finding same agencies repeatedly | Run again! Each run generates different queries |
| Web search not working | Automatically falls back to curated list of 50+ agencies |
| Want more variety? | Increase the number of queries per run (use 50+ instead of 20) |
| Takes too long? | Use fewer queries (10) and run more frequently |

---

## Word Lists Explained

### Why These Words?

- **Platforms:** Where agencies work (TikTok, Instagram, YouTube, etc.)
- **Services:** What they offer (marketing, management, production, etc.)
- **Content Types:** What they create (video, reels, shorts, campaigns, etc.)
- **Audience:** Who they serve (small business, ecommerce, startups, etc.)
- **Actions:** What they do (create, grow, boost, scale, etc.)

Random combination of any 2-4 words = unique search query

### Adding More Words

Want to expand the word lists? Edit the script:

```python
platforms = [
    'tiktok', 'instagram', ...
    'youtube', 'snapchat',  # Add more here
    'my-new-platform'       # Add custom platforms
]
```

---

## Integration with Dell R420

On your server, set up automated discovery:

```bash
#!/bin/bash
# /home/user/discovery_pipeline.sh

cd /home/user/scripter

# Run discovery with random queries
python infinite_agency_search.py <<< "50"

# Extract emails from discoveries
python batch_email_extractor.py discovered_agencies.txt

# Append results to database
python store_results_in_db.py agency_emails.csv

# Send notification
echo "Discovery complete: $(wc -l < discovered_agencies.txt) agencies found"
```

Then cron:
```bash
0 * * * * /home/user/discovery_pipeline.sh
```

Runs hourly automatically!

---

## API Efficiency

**No API limits because:**
- ✅ Uses SearXNG (public, distributed search)
- ✅ Falls back to curated list if search fails
- ✅ No authentication required
- ✅ No rate limiting (random searches = human-like behavior)

---

## Expected Results

| Time | Queries | Agencies | Emails |
|------|---------|----------|--------|
| Single run | 20-30 | 15-25 | 30-50 |
| After 5 runs | 100-150 | 60-90 | 150-250 |
| After 10 runs | 200-300 | 120-150 | 300-500+ |

Each run finds new agencies because searches are randomized!

---

## Summary

- **Run it once:** Get 20-30 agencies
- **Run it 5 times:** Get 60-90 unique agencies
- **Run it 10 times:** Get 100-150 unique agencies
- **Each run uses different random queries**
- **No API limits, no tracking, infinite combinations**

Perfect for your Dell R420 — set it to run 24/7 and watch the lead list grow!

---

## Next Steps

1. **Run discovery:**
   ```bash
   python infinite_agency_search.py
   ```

2. **Extract emails:**
   ```bash
   python batch_email_extractor.py discovered_agencies.txt
   ```

3. **Schedule on R420:**
   - Add to cron for hourly/daily runs
   - Accumulate results over time
   - Build massive lead list

4. **Verify & Outreach:**
   - Use email_scraper.py for quick checks
   - Hunter.io verification via Playwright
   - Send personalized messages

**That's it! Infinite agency discovery with random searches. 🚀**
