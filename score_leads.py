"""
score_leads.py — Keyword-based lead scorer with website crawling for Scribtly.

Fetches NOT_CONTACTED leads, crawls each agency website, scores 1-5 fit,
and PATCHes fitScore + notes back to the Scribtly API.
"""

import asyncio
import json
import os
import re
import sys
from pathlib import Path

import aiohttp
from bs4 import BeautifulSoup

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------
API_BASE = "https://scribtly.com/api/v1/outreach"
AUTH_HEADER = "Bearer ab36e7b012db83e769f32ee5e41722283fcb0c29ab9662f9e39a4d71d7080055"
HEADERS = {"Authorization": AUTH_HEADER, "Content-Type": "application/json"}

PROGRESS_FILE = Path(__file__).parent / "scored_leads.jsonl"
MAX_CONCURRENT = 50
CRAWL_TIMEOUT = 10  # seconds per page
MAX_TEXT_CHARS = 2000
PAGES_TO_CRAWL = ["", "/about", "/services", "/work"]

# ---------------------------------------------------------------------------
# Scoring
# ---------------------------------------------------------------------------

def score_lead(text: str, domain: str) -> tuple[int, str]:
    text_lower = text.lower()

    no_fit = [
        "stock footage", "freelance photographer", "freelancer", "wedding video",
        "event videography", "film school", "documentary", "feature film",
        "cinematographer", "saas", "software", "app ", "platform", "tool",
    ]
    perfect = [
        "tiktok", "reels", "short-form", "short form", "ugc", "scripts",
        "scripting", "content scripts", "social media content", "creator",
    ]
    good = [
        "social media", "instagram", "content creation", "content agency",
        "digital marketing agency", "social strategy", "influencer",
    ]
    decent = [
        "digital marketing", "content marketing", "video marketing",
        "marketing agency", "online marketing",
    ]
    production = [
        "film production", "video production", "corporate video",
        "photography", "animation studio", "post production",
    ]

    perfect_hits = sum(1 for kw in perfect if kw in text_lower)
    good_hits = sum(1 for kw in good if kw in text_lower)
    decent_hits = sum(1 for kw in decent if kw in text_lower)
    no_fit_hits = sum(1 for kw in no_fit if kw in text_lower)
    prod_hits = sum(1 for kw in production if kw in text_lower)

    if no_fit_hits >= 2 or (no_fit_hits >= 1 and perfect_hits == 0 and good_hits == 0):
        score = 1
        reason = f"Not ICP: {[kw for kw in no_fit if kw in text_lower]}"
    elif perfect_hits >= 2:
        score = 5
        reason = f"Perfect ICP: {[kw for kw in perfect if kw in text_lower]}"
    elif perfect_hits >= 1 or good_hits >= 3:
        score = 4
        reason = f"Good fit: {[kw for kw in perfect + good if kw in text_lower][:5]}"
    elif good_hits >= 1 or decent_hits >= 2:
        score = 3
        reason = f"Decent fit: {[kw for kw in good + decent if kw in text_lower][:5]}"
    elif prod_hits >= 1:
        score = 2
        reason = f"Production focus: {[kw for kw in production if kw in text_lower]}"
    else:
        score = 2
        reason = "Insufficient signals"

    return score, reason


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def load_already_scored() -> set:
    """Return set of leadIds already written to the progress file."""
    done = set()
    if PROGRESS_FILE.exists():
        with PROGRESS_FILE.open("r", encoding="utf-8") as fh:
            for line in fh:
                line = line.strip()
                if line:
                    try:
                        obj = json.loads(line)
                        done.add(obj.get("leadId"))
                    except json.JSONDecodeError:
                        pass
    return done


def save_progress(lead_id: str, score: int, summary: str, reason: str) -> None:
    with PROGRESS_FILE.open("a", encoding="utf-8") as fh:
        fh.write(json.dumps({"leadId": lead_id, "score": score, "summary": summary, "reason": reason}) + "\n")


def extract_text(html: str) -> str:
    soup = BeautifulSoup(html, "html.parser")
    for tag in soup(["script", "style", "noscript", "svg", "meta", "link"]):
        tag.decompose()
    text = soup.get_text(separator=" ")
    # Collapse whitespace
    text = re.sub(r"\s+", " ", text).strip()
    return text


def normalize_url(website: str) -> str:
    website = website.strip().rstrip("/")
    if not website.startswith("http"):
        website = "https://" + website
    return website


# ---------------------------------------------------------------------------
# Network
# ---------------------------------------------------------------------------

async def fetch_leads(session: aiohttp.ClientSession, page: int) -> list:
    url = f"{API_BASE}/leads?limit=50&page={page}&status=NOT_CONTACTED"
    try:
        async with session.get(url, headers=HEADERS, timeout=aiohttp.ClientTimeout(total=20)) as resp:
            if resp.status != 200:
                print(f"[WARN] fetch_leads page={page} status={resp.status}", file=sys.stderr)
                return []
            data = await resp.json()
            # Support both list and {"leads": [...]} response shapes
            if isinstance(data, list):
                return data
            if isinstance(data, dict):
                for key in ("leads", "data", "results", "items"):
                    if key in data and isinstance(data[key], list):
                        return data[key]
            return []
    except Exception as exc:
        print(f"[ERROR] fetch_leads page={page}: {exc}", file=sys.stderr)
        return []


async def crawl_page(session: aiohttp.ClientSession, url: str) -> str:
    try:
        async with session.get(
            url,
            timeout=aiohttp.ClientTimeout(total=CRAWL_TIMEOUT),
            allow_redirects=True,
            headers={"User-Agent": "Mozilla/5.0 (compatible; ScribtlyBot/1.0)"},
        ) as resp:
            if resp.status != 200:
                return ""
            html = await resp.text(errors="replace")
            return extract_text(html)
    except Exception:
        return ""


async def crawl_website(session: aiohttp.ClientSession, website: str) -> str:
    base = normalize_url(website)
    texts = await asyncio.gather(*[crawl_page(session, base + path) for path in PAGES_TO_CRAWL])
    combined = " ".join(t for t in texts if t)
    return combined[:MAX_TEXT_CHARS]


async def crawl_and_score(
    session: aiohttp.ClientSession, lead: dict
) -> tuple[int, str, str]:
    website = lead.get("agencyWebsite") or lead.get("website") or ""
    if not website:
        return 2, "No website URL", "No website URL"

    try:
        summary = await crawl_website(session, website)
    except Exception as exc:
        return 2, "Could not crawl website", f"Crawl error: {exc}"

    if not summary.strip():
        return 2, "Could not crawl website", "Empty response from all pages"

    score, reason = score_lead(summary, website)
    return score, summary[:500], reason  # keep summary short for the notes field


async def patch_lead(
    session: aiohttp.ClientSession,
    lead_id: str,
    score: int,
    summary: str,
    reason: str,
) -> None:
    url = f"{API_BASE}/leads/{lead_id}"
    notes = f"Summary: {summary[:300]} | Score reason: {reason}"
    body = {"fitScore": score, "notes": notes}
    try:
        async with session.patch(
            url,
            headers=HEADERS,
            json=body,
            timeout=aiohttp.ClientTimeout(total=20),
        ) as resp:
            if resp.status not in (200, 204):
                text = await resp.text()
                print(f"[WARN] PATCH {lead_id} -> {resp.status}: {text[:120]}", file=sys.stderr)
    except Exception as exc:
        print(f"[ERROR] PATCH {lead_id}: {exc}", file=sys.stderr)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

async def main() -> None:
    already_scored = load_already_scored()
    print(f"Resuming — {len(already_scored)} leads already scored.")

    connector = aiohttp.TCPConnector(limit=MAX_CONCURRENT, ssl=False)
    page = 1
    total_scored = 0

    async with aiohttp.ClientSession(connector=connector) as session:
        while True:
            leads = await fetch_leads(session, page)
            if not leads:
                print(f"No leads on page {page}, stopping.")
                break

            # Filter out already-scored or leads that already have a fitScore
            pending = []
            for lead in leads:
                lead_id = lead.get("leadId") or lead.get("id") or lead.get("_id")
                if not lead_id:
                    continue
                if lead_id in already_scored:
                    continue
                # Skip if fitScore already set on the lead object
                if lead.get("fitScore") is not None:
                    continue
                lead["leadId"] = lead_id  # normalise key
                pending.append(lead)

            if pending:
                tasks = [crawl_and_score(session, lead) for lead in pending]
                results = await asyncio.gather(*tasks)

                for lead, (score, summary, reason) in zip(pending, results):
                    lead_id = lead["leadId"]
                    await patch_lead(session, lead_id, score, summary, reason)
                    save_progress(lead_id, score, summary, reason)
                    total_scored += 1
                    domain = lead.get("agencyWebsite") or lead.get("website") or lead_id
                    print(f"[{total_scored}] {domain} -> {score}/5 | {reason[:60]}")

            page += 1
            if page > 20:  # safety cap — 1000 leads max
                print("Reached page 20 safety cap.")
                break

    print(f"\nDone. Scored {total_scored} leads.")


if __name__ == "__main__":
    asyncio.run(main())
