# vps_config.py
import hashlib
import os
from pathlib import Path

_BASE = Path(__file__).parent

API_URL = "https://scribtly.com/api/v1/outreach/leads/bulk"
API_KEY = os.environ.get("SCRIBTLY_API_KEY", "ab36e7b012db83e769f32ee5e41722283fcb0c29ab9662f9e39a4d71d7080055")
CONCURRENCY = 200
BATCH_SIZE = 50
QUEUE_FILE = str(_BASE / "queue.txt")
FAILED_FILE = str(_BASE / "failed.txt")
DISCOVERY_LOG = str(_BASE / "discovery.log")
EXTRACTION_LOG = str(_BASE / "extraction.log")

SEARCH_QUERIES = [
    # General digital marketing
    "digital marketing agency",
    "digital marketing agency services",
    "full service digital marketing agency",
    "online marketing agency",
    "internet marketing agency",
    # Social media
    "social media marketing agency",
    "social media management agency",
    "social media agency services",
    "instagram marketing agency",
    "tiktok marketing agency",
    "youtube marketing agency",
    "facebook ads agency",
    "linkedin marketing agency",
    # Content
    "content marketing agency",
    "content creation agency",
    "video content agency",
    "short form video agency",
    "reels production agency",
    # SEO / PPC
    "seo agency",
    "ppc agency",
    "google ads agency",
    "paid media agency",
    "performance marketing agency",
    # Influencer
    "influencer marketing agency",
    "creator marketing agency",
    "ugc agency",
    # Ecommerce
    "ecommerce marketing agency",
    "shopify marketing agency",
    "amazon marketing agency",
    # Location-based (UK)
    "digital marketing agency london",
    "digital marketing agency manchester",
    "digital marketing agency birmingham",
    "social media agency uk",
    # Location-based (US)
    "digital marketing agency new york",
    "digital marketing agency los angeles",
    "digital marketing agency chicago",
    "social media agency usa",
    # Location-based (other)
    "digital marketing agency australia",
    "digital marketing agency canada",
    "digital marketing agency dubai",
    # Niche
    "b2b digital marketing agency",
    "saas marketing agency",
    "startup marketing agency",
    "small business marketing agency",
    "local business marketing agency",
    "brand awareness agency",
    "growth marketing agency",
    "demand generation agency",
    # Services
    "email marketing agency",
    "marketing automation agency",
    "conversion rate optimisation agency",
    "web design and marketing agency",
    "creative marketing agency",
    "branding agency digital",
    "pr and digital marketing agency",
    "video marketing agency",
    "podcast marketing agency",
    # More specific
    "tiktok ads agency",
    "instagram reels agency",
    "youtube shorts agency",
    "organic social media agency",
    "paid social agency",
    "community management agency",
    "social listening agency",
    "analytics marketing agency",
    "data driven marketing agency",
    "omnichannel marketing agency",
]

CONTACT_PATHS = ["/contact", "/contact-us", "/contactus", "/about", "/about-us", "/get-in-touch", "/hello", "/work-with-us"]

USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3 Safari/605.1.15",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Edg/121.0.0.0",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (iPad; CPU OS 17_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/122.0",
    "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Safari/605.1.15",
    "Mozilla/5.0 (Windows NT 10.0; rv:109.0) Gecko/20100101 Firefox/115.0",
    "Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:122.0) Gecko/20100101 Firefox/122.0",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.90 Mobile Safari/537.36",
    "Mozilla/5.0 (Linux; Android 13; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.90 Mobile Safari/537.36",
]

SKIP_DOMAINS = {
    "google.com", "google.co.uk", "google.com.au", "bing.com", "yahoo.com",
    "facebook.com", "instagram.com", "twitter.com", "x.com", "linkedin.com",
    "youtube.com", "tiktok.com", "reddit.com", "wikipedia.org", "amazon.com",
    "github.com", "stackoverflow.com", "quora.com", "medium.com", "wordpress.com",
    "wix.com", "squarespace.com", "shopify.com", "hubspot.com", "mailchimp.com",
    "indeed.com", "glassdoor.com", "clutch.co", "upwork.com", "fiverr.com",
    "yelp.com", "trustpilot.com", "bbb.org", "forbes.com", "entrepreneur.com",
    "businessinsider.com", "techcrunch.com", "mashable.com", "adweek.com",
}


def domain_to_lead_id(domain: str) -> str:
    """Generate a stable 32-char lead ID from a domain."""
    return hashlib.md5(domain.encode()).hexdigest()
