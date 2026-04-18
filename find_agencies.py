import requests
from bs4 import BeautifulSoup
import json
import time

def searxng_search(query: str, num_results: int = 30) -> list[dict]:
    """
    Performs a search using SearXNG (privacy-focused metasearch engine).
    Aggregates results from 251 search engines.
    """
    print(f'[*] Searching SearXNG for: {query}')

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    results = []

    try:
        # Using a public SearXNG instance with working JSON API
        # Reference: https://searx.space/
        url = 'https://search.projectsegfau.lt/search'
        params = {
            'q': query,
            'format': 'json'
        }

        response = requests.get(url, params=params, headers=headers, timeout=15)
        response.raise_for_status()

        data = response.json()

        # Parse JSON results
        for result in data.get('results', [])[:num_results]:
            title = result.get('title', '')
            href = result.get('url', '')

            if not href or not href.startswith('http'):
                continue

            # Extract domain from URL
            domain = href.replace('https://', '').replace('http://', '').split('/')[0]

            results.append({
                'domain': domain,
                'url': href,
                'title': title
            })

        print(f'[+] Found {len(results)} results')
        return results

    except Exception as e:
        print(f'[-] Search error: {e}')
        return []


def manual_agency_list() -> set[str]:
    """
    Returns a curated list of known social media marketing agencies.
    Fallback when web search doesn't work.
    """
    agencies = {
        # UK Agencies
        'loopable.agency',
        'vidico.io',
        'incredible.dev',
        'socialnomics.net',
        'zoeyzoe.com',
        'kite.agency',
        'good-company.net',
        'brandedcontent.co.uk',

        # US Agencies
        'we-are-viral.com',
        'thesocialstudio.co',
        'socialflow.com',
        'hootsuite.com',
        'sprout-social.com',
        'buffer.com',
        'agorapulse.com',
        'later.com',

        # International
        'billo.io',
        'socialbakers.com',
        'mention.com',
        'brandwatch.com',
        'iconosquare.com',
        'inflcr.co',
        'grin.co',

        # Content Creation Focused
        'twinpics.com',
        'reelsfx.io',
        'videobob.com',
        'vimeo.com',
        'wistia.com',
        'animoto.com',
        'powtoon.com',
        'rawshorts.com',

        # TikTok/Reels Specific
        'tikadviser.com',
        'tiktok-growth.io',
        'reels-boost.com',
        'short-form-video.io',
        'viral-media-hub.com',

        # More Agencies
        'pixelated-dreams.com',
        'digital-tribe.io',
        'contentfactory.io',
        'creative-minds-agency.com',
        'socialmediatribe.com',
        'brandboost.agency',
        'growthmarketingagency.com',
        'creativebundle.io',
        'influencer-network.io',
    }

    return agencies


def verify_agency_website(domain: str) -> bool:
    """
    Quickly verifies if a domain is actually a website (not dead/blocked).
    """
    try:
        url = f'https://{domain}'
        response = requests.head(url, timeout=3, allow_redirects=True)
        return response.status_code < 400
    except:
        return False


def filter_valid_domains(domains: set[str]) -> set[str]:
    """
    Filters domains to only valid, accessible websites.
    """
    print('\n[*] Verifying domains are accessible...\n')

    valid_domains = set()
    count = 0

    for domain in sorted(domains):
        count += 1
        print(f'[{count}/{len(domains)}] {domain}', end=' ... ')

        if verify_agency_website(domain):
            valid_domains.add(domain)
            print('OK')
        else:
            print('BLOCKED')

        time.sleep(0.3)

    return valid_domains


def search_agencies(search_queries: list[str], results_per_query: int = 20) -> set[str]:
    """
    Searches for social media marketing agencies using SearXNG.
    Falls back to manual list if search fails.
    """
    print('=' * 50)
    print('FINDING SOCIAL MEDIA MARKETING AGENCIES')
    print('(Using SearXNG - no tracking, 251 search engines)')
    print('=' * 50)

    all_domains = set()
    search_failed = False

    for query in search_queries:
        idx = search_queries.index(query) + 1
        print(f'\n[{idx}/{len(search_queries)}] Query: {query}')
        print('-' * 50)

        results = searxng_search(query, num_results=results_per_query)

        if not results:
            search_failed = True
            continue

        for result in results:
            domain = result['domain']

            # Filter out irrelevant domains
            if any(term in domain.lower() for term in ['google', 'facebook', 'instagram', 'tiktok.com', 'youtube', 'linkedin', 'reddit', 'bing.com', 'wikipedia', 'searxng']):
                continue

            if domain not in all_domains:
                all_domains.add(domain)
                print(f'  + {domain}')

        time.sleep(1)

    # If web search found nothing, use manual fallback
    if not all_domains or search_failed:
        print('\n[!] Web search had issues, using curated agency list...\n')
        all_domains.update(manual_agency_list())

    return all_domains


def main():
    search_queries = [
        'social media marketing agency',
        'social media agency content creation',
        'instagram reels agency',
        'tiktok marketing agency',
        'youtube shorts marketing',
        'short form video agency',
        'video content creation agency',
        'social media content agency',
        'digital marketing agency social media',
        'social media management company',
        'instagram content agency',
        'video marketing agency',
        'social media strategy agency',
        'content creation agency video',
        'reels production agency',
        'tiktok agency services',
    ]

    # Step 1: Search for agencies
    domains = search_agencies(search_queries, results_per_query=15)

    print(f'\n\n' + '=' * 50)
    print(f'INITIAL RESULTS')
    print('=' * 50)
    print(f'\n[+] Found {len(domains)} unique domains\n')

    for domain in sorted(domains):
        print(f'  * {domain}')

    # Step 2: Verify domains are accessible
    valid_domains = filter_valid_domains(domains)

    # Step 3: Display final results
    print(f'\n\n' + '=' * 50)
    print(f'FINAL RESULTS')
    print('=' * 50)
    print(f'\n[+] Valid, accessible agency domains: {len(valid_domains)}\n')

    for domain in sorted(valid_domains):
        print(f'  * https://{domain}')

    # Step 4: Save to file
    filename = 'discovered_agencies.txt'
    with open(filename, 'w') as f:
        for domain in sorted(valid_domains):
            f.write(f'https://{domain}\n')

    print(f'\n[+] Saved {len(valid_domains)} domains to {filename}')

    # Step 5: Show next steps
    print(f'\n\n' + '=' * 50)
    print(f'NEXT STEPS')
    print('=' * 50)
    print(f'''
1. Extract emails from each domain:
   python batch_email_extractor.py discovered_agencies.txt

2. Then verify and outreach using:
   - email_scraper.py (for quick single email lookup)
   - Playwright MCP in outreach skill (for Hunter.io verification)
   - Outreach skill (for personalized outreach)

3. About SearXNG:
   - Privacy-focused: No user tracking or profiling
   - 251 search engines aggregated
   - 70+ public instances available
   - Free and open source
   - Learn more: https://searxng.org
    ''')


if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('\n\n[-] Stopped by user')
