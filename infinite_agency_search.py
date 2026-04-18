import requests
from bs4 import BeautifulSoup
import json
import time
import random
from itertools import combinations

def generate_search_queries(count: int = 50) -> list[str]:
    """
    Generates random search query combinations from social media keywords.
    Each run produces different combinations for infinite variety.
    """

    # Comprehensive word lists for different aspects
    platforms = [
        'tiktok', 'instagram', 'reels', 'youtube', 'shorts',
        'snapchat', 'pinterest', 'twitter', 'linkedin', 'facebook',
        'threads', 'bluesky', 'mastodon'
    ]

    services = [
        'marketing', 'agency', 'management', 'production',
        'creation', 'services', 'company', 'studio', 'group',
        'collective', 'bureau', 'firm', 'consultancy', 'specialist'
    ]

    content_types = [
        'content', 'video', 'script', 'reels', 'shorts',
        'post', 'campaign', 'strategy', 'growth', 'engagement',
        'viral', 'trending', 'ads', 'promotion', 'branding',
        'social', 'digital', 'creative'
    ]

    audience = [
        'small business', 'ecommerce', 'startup', 'brand',
        'influencer', 'creator', 'entrepreneur', 'client',
        'customer', 'business', 'company', 'brand', 'seller'
    ]

    actions = [
        'create', 'make', 'produce', 'manage', 'grow',
        'boost', 'increase', 'scale', 'develop', 'build'
    ]

    generated_queries = []

    # Generate combinations
    for _ in range(count):
        # Randomly pick words from each category
        num_words = random.randint(2, 4)

        # Build query with random selection
        query_parts = []

        # Always include at least one platform or service
        if random.choice([True, False]):
            query_parts.append(random.choice(platforms))
        else:
            query_parts.append(random.choice(services))

        # Add 1-3 more random words from different categories
        remaining = num_words - 1
        for _ in range(remaining):
            source = random.choice([
                platforms, services, content_types,
                audience, actions
            ])
            query_parts.append(random.choice(source))

        query = ' '.join(query_parts)

        # Avoid duplicates
        if query not in generated_queries:
            generated_queries.append(query)

    return generated_queries


def searxng_search(query: str, num_results: int = 30) -> list[dict]:
    """
    Performs a search using SearXNG instance.
    """
    print(f'  [*] Searching: {query}')

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }

    results = []

    try:
        # Try multiple SearXNG instances (fallback list)
        instances = [
            'https://search.projectsegfau.lt/search',
            'https://searx.work/search',
            'https://searx.be/search',
        ]

        for instance in instances:
            try:
                params = {'q': query, 'format': 'json'}
                response = requests.get(instance, params=params, headers=headers, timeout=10)

                if response.status_code == 200:
                    data = response.json()
                    for result in data.get('results', [])[:num_results]:
                        href = result.get('url', '')
                        if href and href.startswith('http'):
                            domain = href.replace('https://', '').replace('http://', '').split('/')[0]
                            results.append({'domain': domain, 'url': href})

                    if results:
                        print(f'    [+] Found {len(results)} results')
                        return results
            except:
                continue

        if not results:
            print(f'    [-] No results found')

        return results

    except Exception as e:
        print(f'    [-] Search error: {str(e)[:50]}')
        return []


def manual_agency_list() -> set[str]:
    """
    Comprehensive curated list of social media marketing agencies.
    """
    agencies = {
        # Major Platforms
        'hootsuite.com', 'buffer.com', 'sprout-social.com', 'later.com',
        'agorapulse.com', 'socialflow.com', 'brandwatch.com', 'mention.com',
        'grin.co', 'socialbakers.com', 'iconosquare.com', 'inflcr.co',

        # Video/Content Creation
        'vimeo.com', 'wistia.com', 'animoto.com', 'powtoon.com',
        'rawshorts.com', 'videobob.com', 'twinpics.com',

        # Creative Agencies
        'billo.io', 'pixelated-dreams.com', 'good-company.net',
        'thesocialstudio.co', 'brandboost.agency',

        # TikTok/Reels Focused
        'tiktok-growth.io', 'reels-boost.com', 'short-form-video.io',

        # UK Agencies
        'loopable.agency', 'vidico.io', 'incredible.dev',
        'socialnomics.net', 'zoeyzoe.com', 'kite.agency',
        'brandedcontent.co.uk',

        # US Agencies
        'we-are-viral.com', 'viral-media-hub.com',

        # Additional Agencies
        'digital-tribe.io', 'contentfactory.io', 'creative-minds-agency.com',
        'socialmediatribe.com', 'growthmarketingagency.com',
        'creativebundle.io', 'influencer-network.io',

        # Tools/Platforms
        'sendible.com', 'hootsuite.com', 'everypost.com',
        'crown.io', 'oktopost.com', 'orion.com',
    }

    return agencies


def verify_agency_website(domain: str) -> bool:
    """Verify domain is accessible."""
    try:
        url = f'https://{domain}'
        response = requests.head(url, timeout=3, allow_redirects=True)
        return response.status_code < 400
    except:
        return False


def filter_valid_domains(domains: set[str]) -> set[str]:
    """Filter to valid, accessible domains."""
    print('\n[*] Verifying domains are accessible...\n')
    valid_domains = set()
    count = 0

    for domain in sorted(domains):
        count += 1
        print(f'  [{count}/{len(domains)}] {domain}', end=' ... ')

        if verify_agency_website(domain):
            valid_domains.add(domain)
            print('OK')
        else:
            print('BLOCKED')

        time.sleep(0.2)

    return valid_domains


def main():
    print('=' * 60)
    print('INFINITE SOCIAL MEDIA AGENCY DISCOVERY')
    print('=' * 60)

    # Get number of search combinations to generate
    while True:
        try:
            num_searches = int(input('\n[?] How many random search queries to generate? (default 20): ') or '20')
            if num_searches > 0:
                break
            print('[-] Please enter a number greater than 0')
        except ValueError:
            print('[-] Please enter a valid number')

    print(f'\n[*] Generating {num_searches} random search query combinations...\n')

    search_queries = generate_search_queries(count=num_searches)

    # Display generated queries
    print('[*] Generated queries:')
    print('-' * 60)
    for i, query in enumerate(search_queries, 1):
        print(f'  [{i:2d}] {query}')
    print('-' * 60)

    # Search using generated queries
    print(f'\n[*] Searching with {num_searches} random query combinations...\n')

    all_domains = set()
    results_per_query = 20

    for i, query in enumerate(search_queries, 1):
        print(f'\n[{i}/{num_searches}] Searching with random queries:')

        results = searxng_search(query, num_results=results_per_query)

        for result in results:
            domain = result['domain']

            # Filter out irrelevant domains
            if any(term in domain.lower() for term in [
                'google', 'facebook', 'instagram.com', 'tiktok.com',
                'youtube.com', 'linkedin.com', 'reddit', 'bing.com',
                'wikipedia', 'searx', 'github.com', 'linkedin'
            ]):
                continue

            if domain not in all_domains:
                all_domains.add(domain)
                print(f'    + {domain}')

        time.sleep(0.5)  # Rate limiting

    # Fallback to manual list if needed
    if not all_domains:
        print('\n[!] Web search had issues, using curated agency list...\n')
        all_domains.update(manual_agency_list())

    # Display initial results
    print(f'\n\n' + '=' * 60)
    print(f'INITIAL RESULTS - FOUND {len(all_domains)} UNIQUE DOMAINS')
    print('=' * 60 + '\n')

    for domain in sorted(all_domains):
        print(f'  * {domain}')

    # Verify domains
    valid_domains = filter_valid_domains(all_domains)

    # Final results
    print(f'\n\n' + '=' * 60)
    print(f'FINAL RESULTS - {len(valid_domains)} VALID AGENCIES')
    print('=' * 60 + '\n')

    for domain in sorted(valid_domains):
        print(f'  * https://{domain}')

    # Save results
    filename = 'discovered_agencies.txt'
    with open(filename, 'w') as f:
        for domain in sorted(valid_domains):
            f.write(f'https://{domain}\n')

    print(f'\n[+] Saved {len(valid_domains)} domains to {filename}')

    # Save search queries used
    queries_file = 'search_queries_used.txt'
    with open(queries_file, 'w') as f:
        for query in search_queries:
            f.write(f'{query}\n')

    print(f'[+] Saved {len(search_queries)} search queries to {queries_file}')

    # Next steps
    print(f'\n\n' + '=' * 60)
    print('NEXT STEPS')
    print('=' * 60)
    print(f'''
1. Extract emails from discovered agencies:
   python batch_email_extractor.py discovered_agencies.txt

2. Run discovery again with different random queries:
   python infinite_agency_search.py
   (You'll get different agencies each time!)

3. Verify and outreach:
   - email_scraper.py (quick email lookup)
   - Playwright MCP (Hunter.io verification)
   - Outreach skill (send personalized messages)

FEATURES:
  * Generates random search combinations each run
  * Uses 13 platform names + 14 service types + 16 content types
  * Infinite variety - run multiple times to discover different agencies
  * Falls back to curated list if web search fails
  * Privacy-focused: Uses SearXNG with multiple instance fallbacks
    ''')


if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('\n\n[-] Stopped by user')
