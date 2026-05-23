# Email Tools Comparison

Two complementary tools for finding emails on agency websites:

---

## Tool 1: `agency_finder.py` — Find ALL Emails

**Purpose:** Discover and extract ALL contact emails from a domain.

### When to Use
- Finding all contact addresses (sales, support, billing, etc.)
- Building complete contact lists
- Verifying an agency has multiple contact channels
- First discovery pass before detailed outreach

### How It Works
1. **Discovers ALL contact pages** — finds /contact, /contact-us, /email, /support, /help, etc.
2. **Extracts all emails** — returns every unique email found on those pages
3. **Auto-handles JavaScript** — upgrades to Playwright if initial HTTP scan finds nothing
4. **Returns results as a list** — multiple emails displayed

### Example
```bash
$ python agency_finder.py
[+] Enter agency website: nexaskinmed.co.uk

[+] Found 3 email(s):
    • office@nexaskinmed.co.uk
    • sales@nexaskinmed.co.uk
    • support@nexaskinmed.co.uk
```

### Performance
- Plain HTML sites: 5-10 seconds
- JavaScript sites: 20-30 seconds (auto-upgrades to Playwright)

### Output
Multiple emails, one per line, all domain-matching emails

---

## Tool 2: `email_scraper.py` — Get PRIMARY Email Fast

**Purpose:** Quickly find the main contact email for a domain.

### When to Use
- Finding just ONE primary email (fastest)
- Verifying an agency has public email before outreach
- Quick lookups during manual browsing
- Before running Hunter.io verification

### How It Works
1. **Checks ALL contact page variations** — /contact, /contactus, /contact-us, /contact_us, etc. (25+ variations)
2. **Stops immediately** — returns as soon as it finds ANY email matching the domain
3. **Auto-handles JavaScript** — upgrades to Playwright only if needed
4. **Returns one email** — the first domain-matching email found

### Example
```bash
$ python email_scraper.py
[+] Enter url to scan: tsvweb.com

[+] Found email: hello@tsvweb.com
```

### Performance
- Plain HTML sites: 2-5 seconds (finds email instantly)
- JavaScript sites: 15-25 seconds (auto-upgrades to Playwright)

### Output
Single email address

---

## Quick Comparison

| Feature | agency_finder.py | email_scraper.py |
|---------|------------------|------------------|
| **Find multiple emails** | ✅ Yes (finds all) | ❌ No (stops at first) |
| **Speed** | Slower (thorough) | Faster (stops early) |
| **Best for** | Building contact lists | Quick lookups |
| **Contact page search** | Smart discovery | All 25+ variations checked |
| **JavaScript handling** | ✅ Auto-upgrade | ✅ Auto-upgrade |
| **Use case** | Batch outreach prep | Individual email verification |

---

## Recommended Workflow for Scribtly Outreach

### Step 1: Discovery (Batch Mode)
```bash
# Find ALL emails from multiple agencies
python agency_finder.py  # Agency 1 → [hello@, sales@, support@]
python agency_finder.py  # Agency 2 → [info@, contact@]
python agency_finder.py  # Agency 3 → [hey@]
```

### Step 2: Selection & Verification (Individual Mode)
```bash
# For each agency, pick the best email and verify it
python email_scraper.py  # Quick check: is there an email on homepage?
# Then verify with Hunter.io via Playwright in outreach skill
```

### Step 3: Outreach (Playwright MCP)
```
Use Playwright MCP in the outreach skill to:
1. Visit the site
2. Verify email with Hunter.io
3. Fill contact forms or send emails
```

---

## Installation

Both tools need:
```bash
pip install requests beautifulsoup4 playwright
playwright install chromium
```

---

## Performance Tips

**agency_finder.py** (all emails):
- First run might be slow if JavaScript is involved (auto-upgrade to Playwright)
- Typical: 5-10 seconds for plain HTML, 20-30 seconds for JS sites
- Scans up to 50 pages, prioritizes contact pages first

**email_scraper.py** (primary email):
- Very fast if email found on homepage or standard /contact page
- Checks 25+ contact page variations automatically
- Typical: 2-5 seconds for plain HTML, 15-25 seconds for JS sites

---

## When to Use Which

### Use `agency_finder.py` if:
- You need ALL contact emails from a domain
- Building a spreadsheet of contacts
- You have time for a more thorough scan
- You want to discover hidden contact pages

### Use `email_scraper.py` if:
- You just need ONE email to get started
- Speed is critical
- You're doing quick spot-checks
- You don't need a complete contact list

---

## Troubleshooting

### agency_finder.py finds 0 emails
- Site might not have public contact info (check manually)
- Emails might be behind forms or logins
- Try running it again — sometimes JavaScript content needs retry

### email_scraper.py finds 0 emails but agency_finder.py finds them
- agency_finder.py does a more thorough search of all contact pages
- email_scraper.py stops early if the homepage or first contact page has no email
- Run agency_finder.py instead for complete results

### Both tools find 0 emails
- The agency doesn't have publicly visible email addresses
- Emails are only in contact forms (use Playwright in outreach skill)
- Check the website manually to verify

---

## Integration Notes

- Both tools filter for domain-matching emails only (e.g., `hello@agency.com`, not `support@gmail.com`)
- Both handle URLs with or without `https://` prefix
- Both auto-detect and retry with Playwright if HTTP request fails to find emails
- Results are always printed to console (can be captured with shell redirection: `python agency_finder.py > results.txt`)

---

## Next Steps After Email Discovery

1. **agency_finder.py** → Find all emails on domain
2. **email_scraper.py** → Verify primary email quickly
3. **Hunter.io** (via Playwright in outreach skill) → Verify email deliverability
4. **Outreach skill** → Fill contact form or send email

See `docs/outreach-agent-skill.md` for full workflow.
