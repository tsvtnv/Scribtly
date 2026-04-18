# tests/test_vps_discover.py
import pytest
from vps_discover import extract_domains_from_google_html, extract_domains_from_bing_html, parse_commoncrawl_line

GOOGLE_SAMPLE = '''
<div class="yuRUbf"><a href="https://www.example-agency.com/about"><h3>Example Agency</h3></a></div>
<div class="yuRUbf"><a href="https://www.google.com/search?q=test"><h3>Google</h3></a></div>
<div class="yuRUbf"><a href="https://another-agency.co.uk/services"><h3>Another</h3></a></div>
'''

BING_SAMPLE = '''
<li class="b_algo"><h2><a href="https://www.bingresult-agency.com">Bing Agency</a></h2></li>
<li class="b_algo"><h2><a href="https://www.bing.com/search?q=test">Bing</a></h2></li>
'''

COMMONCRAWL_SAMPLE = '{"url": "https://someagency.com/contact", "filename": "crawl-data/CC-MAIN-2024-51/segments/abc.warc.gz"}'

def test_extract_domains_from_google_html():
    domains = extract_domains_from_google_html(GOOGLE_SAMPLE)
    assert "example-agency.com" in domains
    assert "another-agency.co.uk" in domains
    assert "google.com" not in domains  # SKIP_DOMAINS filtered

def test_extract_domains_from_bing_html():
    domains = extract_domains_from_bing_html(BING_SAMPLE)
    assert "bingresult-agency.com" in domains
    assert "bing.com" not in domains  # SKIP_DOMAINS filtered

def test_parse_commoncrawl_line():
    domain = parse_commoncrawl_line(COMMONCRAWL_SAMPLE)
    assert domain == "someagency.com"

def test_parse_commoncrawl_line_invalid():
    assert parse_commoncrawl_line("not json") is None
    assert parse_commoncrawl_line('{"no_url": "x"}') is None
