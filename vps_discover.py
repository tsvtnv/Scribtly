# vps_discover.py
import asyncio
import aiohttp
import aiofiles
import json
import random
import time
from urllib.parse import urlparse
from bs4 import BeautifulSoup
from vps_config import (
    QUEUE_FILE, DISCOVERY_LOG, USER_AGENTS, SKIP_DOMAINS,
    SEARCH_QUERIES, CONCURRENCY
)

def _log(msg: str):
    line = f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] {msg}"
    print(line)
    with open(DISCOVERY_LOG, "a") as f:
        f.write(line + "\n")


def _domain_from_url(url: str) -> str | None:
    try:
        parsed = urlparse(url)
        netloc = parsed.netloc.lower()
        domain = netloc[4:] if netloc.startswith("www.") else netloc
        if not domain or "." not in domain:
            return None
        return domain
    except Exception:
        return None


def extract_domains_from_google_html(html: str) -> set[str]:
    soup = BeautifulSoup(html, "html.parser")
    domains = set()
    for a in soup.select("div.yuRUbf a, div.tF2Cxc a, h3 a, .r a"):
        href = a.get("href", "")
        if not href.startswith("http"):
            continue
        domain = _domain_from_url(href)
        if domain and domain not in SKIP_DOMAINS:
            domains.add(domain)
    return domains


def extract_domains_from_bing_html(html: str) -> set[str]:
    soup = BeautifulSoup(html, "html.parser")
    domains = set()
    for a in soup.select("li.b_algo h2 a, li.b_algo .b_title a"):
        href = a.get("href", "")
        if not href.startswith("http"):
            continue
        domain = _domain_from_url(href)
        if domain and domain not in SKIP_DOMAINS:
            domains.add(domain)
    return domains


def parse_commoncrawl_line(line: str) -> str | None:
    try:
        data = json.loads(line.strip())
        url = data.get("url", "")
        if not url:
            return None
        return _domain_from_url(url)
    except Exception:
        return None


async def fetch_google(session: aiohttp.ClientSession, query: str) -> set[str]:
    url = f"https://www.google.com/search?q={query.replace(' ', '+')}&num=50"
    headers = {"User-Agent": random.choice(USER_AGENTS)}
    try:
        async with session.get(url, headers=headers, timeout=aiohttp.ClientTimeout(total=15)) as resp:
            if resp.status != 200:
                return set()
            html = await resp.text()
            domains = extract_domains_from_google_html(html)
            _log(f"[Google] '{query}' -> {len(domains)} domains")
            return domains
    except Exception as e:
        _log(f"[Google] '{query}' error: {e}")
        return set()


async def fetch_bing(session: aiohttp.ClientSession, query: str) -> set[str]:
    url = f"https://www.bing.com/search?q={query.replace(' ', '+')}&count=50"
    headers = {"User-Agent": random.choice(USER_AGENTS)}
    try:
        async with session.get(url, headers=headers, timeout=aiohttp.ClientTimeout(total=15)) as resp:
            if resp.status != 200:
                return set()
            html = await resp.text()
            domains = extract_domains_from_bing_html(html)
            _log(f"[Bing] '{query}' -> {len(domains)} domains")
            return domains
    except Exception as e:
        _log(f"[Bing] '{query}' error: {e}")
        return set()


async def fetch_commoncrawl(session: aiohttp.ClientSession, pattern: str) -> set[str]:
    url = f"https://index.commoncrawl.org/CC-MAIN-2024-51-index?url={pattern}&output=json&limit=5000"
    try:
        async with session.get(url, timeout=aiohttp.ClientTimeout(total=60)) as resp:
            if resp.status != 200:
                _log(f"[CommonCrawl] '{pattern}' -> HTTP {resp.status}")
                return set()
            text = await resp.text()
            domains = set()
            for line in text.strip().splitlines():
                domain = parse_commoncrawl_line(line)
                if domain and domain not in SKIP_DOMAINS:
                    domains.add(domain)
            _log(f"[CommonCrawl] '{pattern}' -> {len(domains)} domains")
            return domains
    except Exception as e:
        _log(f"[CommonCrawl] '{pattern}' error: {e}")
        return set()


async def append_new_domains(new_domains: set[str], known: set[str]) -> set[str]:
    actually_new = new_domains - known
    if actually_new:
        async with aiofiles.open(QUEUE_FILE, "a") as f:
            for d in sorted(actually_new):
                await f.write(d + "\n")
        _log(f"[Queue] Added {len(actually_new)} new domains (total known: {len(known) + len(actually_new)})")
    return known | actually_new


async def main():
    known: set[str] = set()
    try:
        async with aiofiles.open(QUEUE_FILE, "r") as f:
            content = await f.read()
            known = {line.strip() for line in content.splitlines() if line.strip()}
        _log(f"[Queue] Loaded {len(known)} existing domains")
    except FileNotFoundError:
        pass

    connector = aiohttp.TCPConnector(limit=CONCURRENCY)
    async with aiohttp.ClientSession(connector=connector) as session:
        _log(f"[Discovery] Starting Google+Bing scrape for {len(SEARCH_QUERIES)} queries...")
        for query in SEARCH_QUERIES:
            tasks = [fetch_google(session, query), fetch_bing(session, query)]
            results = await asyncio.gather(*tasks)
            combined = set().union(*results)
            known = await append_new_domains(combined, known)
            await asyncio.sleep(random.uniform(1.0, 3.0))

        cc_patterns = [
            "*.agency",
            "*marketing-agency*",
            "*digital-agency*",
            "*social-media-agency*",
            "*seo-agency*",
            "*ppc-agency*",
            "*creative-agency*",
        ]
        _log(f"[Discovery] Starting Common Crawl scrape for {len(cc_patterns)} patterns...")
        cc_tasks = [fetch_commoncrawl(session, p) for p in cc_patterns]
        cc_results = await asyncio.gather(*cc_tasks)
        for result in cc_results:
            known = await append_new_domains(result, known)

    _log(f"[Discovery] Complete. Total domains in queue: {len(known)}")


if __name__ == "__main__":
    asyncio.run(main())
