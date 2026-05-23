from collections import deque
import urllib.parse
import re
from bs4 import BeautifulSoup
import requests
import requests.exceptions as request_exception

try:
    from playwright.sync_api import sync_playwright
    PLAYWRIGHT_AVAILABLE = True
except ImportError:
    PLAYWRIGHT_AVAILABLE = False


def get_base_url(url: str) -> str:
    """Extracts the base URL (scheme and netloc) from a given URL."""
    parts = urllib.parse.urlsplit(url)
    return '{0.scheme}://{0.netloc}'.format(parts)


def get_domain(url: str) -> str:
    """Extracts the domain name from a URL (e.g., example.com from https://example.com)."""
    parts = urllib.parse.urlsplit(url)
    return parts.netloc.lower()


def get_page_path(url: str) -> str:
    """Extracts the page path from the given URL."""
    parts = urllib.parse.urlsplit(url)
    return url[:url.rfind('/') + 1] if '/' in parts.path else url


def extract_emails(response_text: str) -> set[str]:
    """Extracts all email addresses from the provided HTML text."""
    email_pattern = r'[a-z0-9\.\-+]+@[a-z0-9\.\-+]+\.[a-z]+'
    return set(re.findall(email_pattern, response_text, re.I))


def normalize_link(link: str, base_url: str, page_path: str) -> str:
    """Normalizes relative links into absolute URLs."""
    if link.startswith('/'):
        return base_url + link
    elif not link.startswith('http'):
        return page_path + link
    return link


def get_link_priority(url: str, base_url: str) -> int:
    """
    Returns priority for link processing (lower = higher priority).
    Contact-related pages are prioritized highest.
    """
    url_lower = url.lower()

    # HIGHEST priority: contact pages (many variations)
    contact_keywords = [
        'contact', 'contact-us', 'contactus', 'contact_us',
        'email', 'get-in-touch', 'getintouch', 'get_in_touch',
        'reach-out', 'reachout', 'reach_out',
        'inquiry', 'inquiries', 'hello', 'connect',
        'support', 'help', 'feedback', 'message', 'form'
    ]
    if any(keyword in url_lower for keyword in contact_keywords):
        return 0

    # Medium-high priority: about/team pages (often have emails)
    about_keywords = ['about', 'team', 'staff', 'people', 'our-team', 'our-company', 'company']
    if any(keyword in url_lower for keyword in about_keywords):
        return 1

    # Medium priority: service/portfolio pages
    service_keywords = ['service', 'services', 'work', 'portfolio', 'project', 'case-study']
    if any(keyword in url_lower for keyword in service_keywords):
        return 2

    # Low priority: everything else on same domain
    if url.startswith(base_url):
        return 3

    # Never follow external links
    return 999


def fetch_page_content(url: str, use_playwright: bool = False) -> str | None:
    """
    Fetches page content using requests or Playwright.
    """
    try:
        if use_playwright and PLAYWRIGHT_AVAILABLE:
            with sync_playwright() as p:
                browser = p.chromium.launch(headless=True)
                page = browser.new_page()
                page.goto(url, timeout=10000, wait_until='domcontentloaded')
                content = page.content()
                browser.close()
                return content
        else:
            response = requests.get(url, timeout=5)
            response.raise_for_status()
            return response.text
    except Exception:
        return None


def find_all_contact_pages(start_url: str, use_playwright: bool = False) -> list[str]:
    """
    Finds all contact-related pages on a domain.
    Returns list of contact page URLs found.
    """
    base_url = get_base_url(start_url)

    # Pre-populate with common contact page paths
    contact_paths = [
        '/contact', '/contactus', '/contact-us', '/contact_us',
        '/get-in-touch', '/getintouch', '/get_in_touch',
        '/reach-out', '/reachout', '/reach_out',
        '/email', '/hello', '/inquiry', '/inquiries',
        '/support', '/help', '/connect', '/feedback',
        '/message', '/form', '/contact-form',
        '/contact/form', '/inquiry-form'
    ]

    contact_pages = []
    urls_to_process = deque([(start_url, 0)])
    scraped_urls = set()
    count = 0
    max_pages = 50

    while urls_to_process and count < max_pages:
        url, _ = urls_to_process.popleft()

        if url in scraped_urls or not url.startswith(base_url):
            continue

        scraped_urls.add(url)
        count += 1

        content = fetch_page_content(url, use_playwright=use_playwright)
        if not content:
            continue

        # Check if this page is a contact page
        url_lower = url.lower()
        content_lower = content.lower()

        is_contact_page = any(keyword in url_lower for keyword in [
            'contact', 'email', 'reach', 'inquiry', 'hello', 'support', 'help'
        ])

        # Also check if content has contact form or email
        has_contact_form = any(term in content_lower for term in ['contact form', 'message us', 'get in touch', 'contact us'])
        has_email = '@' in content_lower

        if is_contact_page or (has_contact_form and has_email):
            if url not in contact_pages:
                contact_pages.append(url)

        # Extract and prioritize links
        soup = BeautifulSoup(content, 'lxml')
        links_with_priority = []

        for anchor in soup.find_all('a'):
            link = anchor.get('href', '').strip()
            if not link:
                continue

            normalized_link = normalize_link(link, base_url, get_page_path(url))

            if normalized_link not in scraped_urls and normalized_link.startswith(base_url):
                priority = get_link_priority(normalized_link, base_url)
                if priority < 999:
                    links_with_priority.append((normalized_link, priority))

        # Sort by priority and add to queue
        links_with_priority.sort(key=lambda x: x[1])
        for link, _ in links_with_priority[:30]:
            urls_to_process.append((link, _))

    return contact_pages


def extract_all_emails_from_domain(start_url: str, use_playwright: bool = False) -> set[str]:
    """
    Finds all emails on a domain by:
    1. Discovering all contact pages
    2. Scraping each contact page for emails
    3. Returns all unique emails matching the domain
    """
    base_url = get_base_url(start_url)
    target_domain = get_domain(start_url)

    print(f'[*] Finding all contact pages on {target_domain}...\n')

    # Find all contact pages first
    contact_pages = find_all_contact_pages(start_url, use_playwright=use_playwright)

    if not contact_pages:
        print('[-] No contact pages found')
        return set()

    print(f'[*] Found {len(contact_pages)} contact page(s):')
    for page in contact_pages:
        print(f'    - {page}')

    print(f'\n[*] Extracting emails from contact pages...\n')

    collected_emails = set()
    count = 0

    for contact_page in contact_pages:
        count += 1
        print(f'[{count}] Scanning {contact_page}', end=' ... ')

        content = fetch_page_content(contact_page, use_playwright=use_playwright)
        if not content:
            print('error')
            continue

        emails = extract_emails(content)

        # Filter for domain-matching emails
        domain_emails = set()
        for email in emails:
            email_domain = email.split('@')[1].lower() if '@' in email else ''
            if email_domain == target_domain:
                domain_emails.add(email)

        if domain_emails:
            print(f'found {len(domain_emails)} email(s)')
            collected_emails.update(domain_emails)
        else:
            print('no emails')

    return collected_emails


try:
    user_url = input('[+] Enter agency website: ').strip()

    # Ensure URL has scheme
    if not user_url.startswith('http'):
        user_url = 'https://' + user_url

    domain = get_domain(user_url)
    print(f'[*] Scanning {domain} for all contact emails...\n')

    # Try with requests first
    emails = extract_all_emails_from_domain(user_url, use_playwright=False)

    if not emails and PLAYWRIGHT_AVAILABLE:
        print('\n[*] Retrying with browser rendering for JavaScript content...\n')
        emails = extract_all_emails_from_domain(user_url, use_playwright=True)

    if emails:
        print(f'\n[+] Found {len(emails)} email(s):')
        for email in sorted(emails):
            print(f'    • {email}')
    else:
        print('[-] No matching emails found on this domain.')

except KeyboardInterrupt:
    print('\n[-] Closing!')
