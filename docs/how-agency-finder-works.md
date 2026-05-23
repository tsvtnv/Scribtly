# How Agency Finder Works — Step by Step

A detailed breakdown of the `agency_finder.py` algorithm and what happens when you run it.

---

## The Complete Flow

```
USER INPUT
    ↓
[tsvweb.com]
    ↓
Step 1: DISCOVER CONTACT PAGES
    ├─ Build list of common contact paths (/contact, /email, /support, etc.)
    ├─ Start crawling from homepage
    ├─ Follow links, prioritize contact pages first
    ├─ Find all pages that look like "contact" pages
    └─ → Result: List of contact pages found
    ↓
Step 2: EXTRACT EMAILS FROM CONTACT PAGES
    ├─ For each contact page found:
    │  ├─ Load the page content (HTTP or Playwright)
    │  ├─ Use regex to find all @email addresses
    │  ├─ Filter: Keep only emails matching the domain
    │  └─ Collect them in a list
    └─ → Result: All unique emails on the domain
    ↓
FINAL OUTPUT
    └─ Display all emails found
```

---

## Detailed Breakdown: What Happens at Each Step

### **Step 1: Discover Contact Pages**

#### 1A. Extract Domain Info
```python
Input:  "tsvweb.com" or "https://tsvweb.com"
Output: {
    domain: "tsvweb.com",
    base_url: "https://tsvweb.com"
}
```

The script extracts:
- **Domain:** `tsvweb.com` (used to filter emails later)
- **Base URL:** `https://tsvweb.com` (used to build full links)

#### 1B. Create Starting URLs
```python
# Pre-populate with common contact page paths
contact_paths = [
    '/contact',
    '/contact-us',
    '/contactus',
    '/email',
    '/get-in-touch',
    '/inquiry',
    '/support',
    '/help',
    # ... 20+ more variations
]

# Create queue of URLs to check
urls_to_process = [
    'https://tsvweb.com',                    # homepage
    'https://tsvweb.com/contact',            # all these are
    'https://tsvweb.com/contact-us',         # pre-added and
    'https://tsvweb.com/contactus',          # will be checked
    'https://tsvweb.com/email',              # first
    # ... etc
]
```

#### 1C. Crawl & Prioritize Links
For each URL in the queue:

```
[1] Visit https://tsvweb.com
    ├─ Load page content
    ├─ Look for links (<a href="...">)
    ├─ Assess priority of each link:
    │  ├─ /contact          → Priority 0 (HIGHEST - contact page)
    │  ├─ /about            → Priority 1 (medium-high - about page)
    │  ├─ /services         → Priority 2 (medium - service page)
    │  └─ /blog/post-123    → Priority 3 (low - other page)
    └─ Add high-priority links to front of queue
       Add low-priority links to back of queue

[2] Visit https://tsvweb.com/contact (from queue)
    ├─ Load page content
    ├─ Check: "Is this a contact page?"
    │  └─ YES: Add to contact_pages list
    └─ Extract links and add to queue

[3] Visit https://tsvweb.com/contact-us (from queue)
    ├─ Load page content
    ├─ Check: "Is this a contact page?"
    │  └─ NO: Skip
    └─ Extract links and add to queue

# ... continues until no more pages or max 50 pages reached
```

#### 1D: How It Identifies Contact Pages

The script looks for:
1. **URL pattern matching:** Does the URL contain words like "contact", "email", "reach", "inquiry"?
2. **Content detection:** Does the page have:
   - A contact form? (`"contact form"`, `"get in touch"`)
   - Email addresses? (`@` symbol in content)

If either is true → **It's a contact page!**

#### Result of Step 1:
```
[*] Found 8 contact page(s):
    - https://tsvweb.com/
    - https://tsvweb.com/contact
    - https://tsvweb.com/work-with-us
    - https://tsvweb.com/get-started
    # ... etc
```

---

### **Step 2: Extract Emails from Contact Pages**

Once all contact pages are found, the script scans each one:

#### 2A. Load Page Content

```python
for contact_page in contact_pages:
    content = fetch_page_content(url)
    
    # content is now the raw HTML of that page
```

The tool tries two methods:

**Method 1: Fast HTTP Request**
```python
response = requests.get(url)
content = response.text  # Just the HTML, no JavaScript executed
# Fast: 100-500ms per page
```

**Method 2: Browser Rendering (if Method 1 finds nothing)**
```python
with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto(url, wait_until='domcontentloaded')
    content = page.content()  # Full rendered HTML with JavaScript
    browser.close()
# Slower: 2-5 seconds per page, but gets JavaScript-rendered content
```

#### 2B. Extract Email Addresses

```python
# Regex pattern matches email format
email_pattern = r'[a-z0-9\.\-+]+@[a-z0-9\.\-+]+\.[a-z]+'

# Find ALL matches in the page content
emails = re.findall(email_pattern, content, re.I)

# Example: page contains:
# "Contact us at hello@tsvweb.com or sales@tsvweb.com"
# 
# emails = {'hello@tsvweb.com', 'sales@tsvweb.com'}
```

#### 2C. Filter for Domain-Matching Emails

```python
domain_emails = set()

for email in emails:
    email_domain = email.split('@')[1]  # Get part after @
    
    if email_domain == target_domain:  # tsvweb.com
        domain_emails.add(email)
    else:
        # Ignore emails that don't match the domain
        pass

# Example:
# Input emails:  {'hello@tsvweb.com', 'your@email.com', 'test@example.com'}
# Target domain: 'tsvweb.com'
# Result:        {'hello@tsvweb.com'}  ← only this one matches
```

**Why filter?** Contact pages often have placeholder emails like `your@email.com`, test emails, or Gmail addresses. We only want the agency's official domain emails.

#### 2D. Collect All Unique Emails

```python
collected_emails = set()  # Set prevents duplicates

[1] Scan https://tsvweb.com
    ├─ Found: hello@tsvweb.com
    └─ collected_emails = {hello@tsvweb.com}

[2] Scan https://tsvweb.com/contact
    ├─ Found: hello@tsvweb.com, support@tsvweb.com
    └─ collected_emails = {hello@tsvweb.com, support@tsvweb.com}

[3] Scan https://tsvweb.com/about
    ├─ Found: hello@tsvweb.com (already have)
    └─ collected_emails = {hello@tsvweb.com, support@tsvweb.com}

# ... continues for all contact pages

Final: collected_emails = {hello@tsvweb.com, support@tsvweb.com, ...}
```

#### Result of Step 2:
```
[+] Found 3 email(s):
    • hello@tsvweb.com
    • support@tsvweb.com
    • sales@tsvweb.com
```

---

## Key Concepts

### **The Queue System (Deque)**

The script uses a `deque` (double-ended queue) to manage which pages to check:

```
Initial queue:
    [homepage, /contact, /contact-us, /email, /support, ...]
     ↓
Process homepage:
    ├─ Find links: /about, /blog, /contact, /work
    ├─ Prioritize: /contact (priority 0) goes to FRONT
    │             /about (priority 1) goes to FRONT
    │             /blog (priority 3) goes to BACK
    └─ Queue now: [/contact, /about, /contact-us, /email, /support, ..., /blog]
     ↓
Process /contact:
    ├─ It's a contact page! Add to found_contact_pages
    ├─ Find links: /contact-form, /faq, /terms
    └─ Queue now: [/contact-form, /about, /contact-us, /email, ...]
     ↓
Process /contact-form:
    ├─ It's a contact page! Add to found_contact_pages
    └─ ... continues
```

**Why prioritize?** Contact pages are visited first, so emails are found faster without scanning the entire site.

---

### **Priority Levels**

Links are assigned priority scores:

```
Priority 0 (HIGHEST - Checked First):
  contact, contact-us, email, get-in-touch, inquiry, 
  hello, support, help, reach-out, feedback

Priority 1 (Medium-High - Checked Second):
  about, team, staff, people, company

Priority 2 (Medium - Checked Third):
  services, work, portfolio, case-study

Priority 3 (Low - Checked Last):
  homepage, blog, product pages, etc.

Priority 999 (NEVER Followed):
  External links (github.com, linkedin.com, etc.)
```

Lower numbers = higher priority = checked first.

---

### **JavaScript Handling (Auto-upgrade)**

```
First Attempt (Fast HTTP):
    └─ contact_pages_found = 0
       └─ Email extraction found = 0

"Nothing found with fast method... trying with JavaScript..."
    ↓
Second Attempt (Playwright Browser):
    ├─ Load page with full browser
    ├─ Execute JavaScript
    ├─ Wait for dynamic content to load
    └─ contact_pages_found = 5
       └─ Email extraction found = 3 emails

Return results
```

**When does it auto-upgrade?**
- If Step 1 (discover contact pages) finds 0 pages
- Then automatically retries with Playwright

**Why two methods?**
- HTTP is fast (milliseconds) but doesn't run JavaScript
- Playwright is slower (seconds) but handles dynamic content
- The script tries fast first, upgrades only when needed

---

## Example: Complete Run Through

### Input:
```
$ python agency_finder.py
[+] Enter agency website: tsvweb.com
```

### What happens:

#### Phase 1: Setup
```
domain = "tsvweb.com"
base_url = "https://tsvweb.com"
```

#### Phase 2: Discover Contact Pages
```
[*] Finding all contact pages on tsvweb.com...

Checking queue of URLs in priority order:
  [1] https://tsvweb.com/contact       → Contact page ✓
  [2] https://tsvweb.com/contact-us    → Not found (404)
  [3] https://tsvweb.com/email         → Not found (404)
  [4] https://tsvweb.com               → Contact page ✓ (has contact info)
  [5] https://tsvweb.com/about         → Not a contact page
  [6] https://tsvweb.com/work-with-us  → Contact page ✓
  [7] https://tsvweb.com/blog          → Not a contact page (skipped)

Found contact pages:
  - https://tsvweb.com
  - https://tsvweb.com/contact
  - https://tsvweb.com/work-with-us
```

#### Phase 3: Extract Emails
```
[*] Extracting emails from contact pages...

[1] Scanning https://tsvweb.com
    ├─ HTML contains: "Contact: hello@tsvweb.com"
    ├─ Email found: hello@tsvweb.com ✓
    └─ Matches domain? Yes → KEEP

[2] Scanning https://tsvweb.com/contact
    ├─ HTML contains: "hello@tsvweb.com" (duplicate)
    ├─ Email found: hello@tsvweb.com
    └─ Already have it → SKIP

[3] Scanning https://tsvweb.com/work-with-us
    ├─ HTML contains: "hello@tsvweb.com"
    ├─ Email found: hello@tsvweb.com
    └─ Already have it → SKIP

Result: {hello@tsvweb.com}
```

#### Phase 4: Output
```
[+] Found 1 email(s):
    • hello@tsvweb.com
```

---

## Performance Notes

| Scenario | Speed | Why |
|----------|-------|-----|
| Plain HTML site | 5-10 sec | HTTP requests are fast, no JavaScript |
| JS-heavy site | 20-30 sec | Auto-upgrades to Playwright, browser is slower |
| Multi-page site | +5 sec | Each contact page needs to be scanned |
| Site with no contact info | 5-10 sec | Scans everything but finds nothing |

---

## Key Differences: agency_finder.py vs email_scraper.py

| Feature | agency_finder | email_scraper |
|---------|---------------|---------------|
| **What it finds** | ALL emails | Just ONE email |
| **How it stops** | Scans ALL contact pages | Stops at first email found |
| **Speed** | Slower (thorough) | Faster (early exit) |
| **Use case** | Build contact lists | Quick lookups |
| **Returns** | Multiple emails | Single email |

---

## Summary

`agency_finder.py` works by:

1. **Discovering** all contact-related pages on a domain (via crawling + URL pattern matching)
2. **Extracting** email addresses from those pages (via regex)
3. **Filtering** to keep only domain-matching emails (no test/placeholder emails)
4. **Collecting** all unique emails found (no duplicates)
5. **Auto-handling** JavaScript content (HTTP first, Playwright if needed)

The result is a complete list of all contact emails for an agency — perfect for outreach campaigns!
