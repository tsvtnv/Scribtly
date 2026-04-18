# Agency Finder & Email Scraper Tool

**Purpose:** Find social media marketing agencies and extract ALL their contact emails from contact pages.

---

## Quick Start

```bash
python agency_finder.py
```

Enter an agency website URL when prompted. The tool will:
1. Discover all contact-related pages on the domain
2. Scan each contact page for email addresses
3. Return all unique emails matching the agency domain
4. Handle JavaScript-rendered content automatically

**Example:**
```
$ python agency_finder.py
[+] Enter agency website: tsvweb.com
[*] Scanning tsvweb.com for all contact emails...

[*] Finding all contact pages on tsvweb.com...

[*] Found 1 contact page(s):
    - https://tsvweb.com/contact

[*] Extracting emails from contact pages...

[1] Scanning https://tsvweb.com/contact ... found 1 email(s)

[+] Found 1 email(s):
    • hello@tsvweb.com
```

---

## How It Works

### Step 1: Discover Contact Pages

The tool searches for contact pages by:
- **URL pattern matching:** Looks for `/contact`, `/contact-us`, `/contactus`, `/email`, `/reach-out`, `/inquiry`, `/support`, `/help`, `/message`, `/feedback`, etc.
- **Link crawling:** Follows all links on the domain, prioritizing contact-related pages
- **Content detection:** Identifies pages with contact forms or email addresses even if URL doesn't match typical patterns

**Contact page keywords detected:**
```
contact, contact-us, contactus, contact_us,
email, get-in-touch, getintouch, get_in_touch,
reach-out, reachout, reach_out,
inquiry, inquiries, hello, connect,
support, help, feedback, message, form
```

### Step 2: Extract All Emails

Once contact pages are found:
- Extracts ALL email addresses from each contact page
- Filters results to only show emails matching the agency domain
- Removes placeholder/test emails (e.g., `your@email.com`, example addresses)
- Returns unique emails (no duplicates)

### Step 3: Handle JavaScript (Auto-upgrade)

- **First attempt:** Uses fast HTTP requests (instant, works for most sites)
- **If no emails found:** Auto-upgrades to browser rendering (Playwright) to handle JavaScript-rendered content
- **No manual configuration needed:** Detects and switches automatically

---

## When to Use This Tool

✅ **Perfect for:**
- Finding ALL contact emails on an agency website (not just one)
- Discovering multiple contact addresses (sales, support, hello, etc.)
- Building a contact list for outreach campaigns
- Verifying an agency has public contact information
- Quick domain email discovery before manual outreach

❌ **Not suitable for:**
- Email verification (use Hunter.io)
- Finding emails from redirects or external links
- Scraping non-marketing agencies
- Sites with no public contact info (dead websites)

---

## Usage Examples

### Example 1: Fast HTTP-Based Site
```
$ python agency_finder.py
[+] Enter agency website: loopable.agency

[*] Scanning loopable.agency for all contact emails...

[*] Finding all contact pages on loopable.agency...

[*] Found 2 contact page(s):
    - https://loopable.agency/contact
    - https://loopable.agency/support

[*] Extracting emails from contact pages...

[1] Scanning https://loopable.agency/contact ... found 2 email(s)
[2] Scanning https://loopable.agency/support ... found 1 email(s)

[+] Found 2 email(s):
    • hello@loopable.agency
    • support@loopable.agency
```

### Example 2: JavaScript-Heavy Site (Auto-upgrade)
```
$ python agency_finder.py
[+] Enter agency website: nexaskinmed.co.uk

[*] Scanning nexaskinmed.co.uk for all contact emails...

[*] Finding all contact pages on nexaskinmed.co.uk...

[*] Found 1 contact page(s):
    - https://nexaskinmed.co.uk/contact

[*] Extracting emails from contact pages...

[1] Scanning https://nexaskinmed.co.uk/contact ... no emails

[*] Retrying with browser rendering for JavaScript content...

[*] Finding all contact pages on nexaskinmed.co.uk...

[*] Found 1 contact page(s):
    - https://nexaskinmed.co.uk/contact

[*] Extracting emails from contact pages...

[1] Scanning https://nexaskinmed.co.uk/contact ... found 1 email(s)

[+] Found 1 email(s):
    • sales@nexaskinmed.co.uk
```

---

## Page Priority Order

The tool scans pages in this priority:

1. **Contact pages (HIGHEST)** — `/contact`, `/contact-us`, `/email`, `/inquiry`, `/hello`, `/support`, etc.
2. **About/Team pages** — `/about`, `/team`, `/people`, `/staff`, `/company`
3. **Service/Portfolio pages** — `/services`, `/work`, `/portfolio`, `/case-study`
4. **Other pages** — homepage, blog, etc. (lowest priority)

This ensures contact information is found first, without wasting time on irrelevant pages.

---

## Installation & Requirements

**Python 3.8+** required

### Install Dependencies

```bash
pip install requests beautifulsoup4 playwright
playwright install chromium
```

### Files Needed

- `agency_finder.py` — Main script
- `email_scraper.py` — Companion script for single-email lookups (optional)

---

## Output Format

### Success
```
[+] Found 3 email(s):
    • hello@agency.com
    • sales@agency.com
    • support@agency.com
```

### No Emails Found
```
[-] No matching emails found on this domain.
```

### Partial Results (JavaScript content)
The tool automatically retries with browser rendering if initial HTTP scan finds no emails.

---

## Workflow: Using with Outreach Agent

**Recommended flow for Scribtly outreach:**

1. **Find agency websites** (via web search or existing list)
2. **Run agency_finder.py** to extract all contact emails
3. **Run email_scraper.py** to verify the primary email
4. **Use Playwright MCP** in the outreach skill to verify email with Hunter.io
5. **Fill contact forms** via Playwright or send personalized emails

**Example batch workflow:**
```bash
# Discover all emails from multiple agencies
python agency_finder.py  # → agency1.com → [hello@, sales@]
python agency_finder.py  # → agency2.com → [support@]
python agency_finder.py  # → agency3.com → [info@]

# Pick the best email for each, verify, and outreach
python email_scraper.py  # verify primary email
# Then use Playwright in Scribtly outreach skill to contact
```

---

## Troubleshooting

### "No matching emails found" but you see emails on the site

**Cause:** Email addresses are rendered by JavaScript
**Solution:** Tool auto-detects this and retries with browser rendering. Wait for the retry phase.

If it still doesn't find emails:
- Check if the email is actually matching the domain (`user@agencydomain.com`, not `user@gmail.com`)
- Some sites use redirect forms instead of email addresses (use Playwright in outreach skill instead)

### Tool is slow

**Cause:** Browser rendering is enabled (Playwright)
**Why it's slow:** Loading and parsing every page with a full browser is slower than HTTP requests
**Solution:** First run tries HTTP (fast), only switches to Playwright if needed

### "error" appears for some pages

**Cause:** Page failed to load or timed out
**Normal:** This is expected for broken links or slow servers
**Impact:** Tool skips that page and continues with others

---

## Performance Tips

- **First run is slowest** if the site has JavaScript — initial HTTP scan fails, then Playwright kicks in
- **Subsequent runs on the same domain** use cached behavior (exit and re-run if needed)
- **Typical times:**
  - Plain HTML site: 2-5 seconds
  - JavaScript site: 15-30 seconds (browser load + rendering)
  - Multi-page scan: add 5 seconds per additional contact page

---

## Integration with Scribtly Outreach

This tool is designed to work with the **Outreach Agent** skill:

1. **agency_finder.py** → Find all emails on a domain
2. **email_scraper.py** → Get the primary email
3. **Playwright MCP** (in outreach skill) → Verify with Hunter.io
4. **Outreach API** → Send personalized message

See `docs/outreach-agent-skill.md` for full outreach workflow.

---

## FAQ

**Q: Why does it sometimes find 0 emails on a contact page?**
A: The page might use contact forms instead of email addresses, or emails are only visible after form interaction (not in plain HTML).

**Q: Can I use this to extract emails from non-marketing agencies?**
A: Yes, it works on any domain. Results depend on how that domain displays contact info.

**Q: Does it follow external links?**
A: No, it only crawls the domain you provide (e.g., `tsvweb.com` only, not `linkedin.com/company/...`).

**Q: Can I limit the number of emails found?**
A: The script finds all unique emails. You can modify the code to limit results if needed.

**Q: How many pages does it scan?**
A: Default is 50 pages max (configurable). It prioritizes contact pages first, so relevant pages are scanned before limit is hit.

---

## Command Reference

```bash
# Run the tool
python agency_finder.py

# Enter URL when prompted (with or without https://)
[+] Enter agency website: tsvweb.com
# or
[+] Enter agency website: https://tsvweb.com

# Output: All emails found on that domain
[+] Found 2 email(s):
    • hello@tsvweb.com
    • support@tsvweb.com
```

---

## Example: Batch Processing

To scan multiple agencies, you can create a simple wrapper:

```bash
# agencies.txt (one URL per line)
tsvweb.com
loopable.agency
nexaskinmed.co.uk

# Then run:
for url in $(cat agencies.txt); do
  echo "--- Scanning $url ---"
  python agency_finder.py <<< "$url"
  echo ""
done
```

This will scan all agencies and output their emails sequentially.
