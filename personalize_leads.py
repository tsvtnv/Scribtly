"""
personalize_leads.py

Reads instantly_import.csv, enriches each row with DB data (agencyName,
agencyServices, notes), then calls Claude Haiku to write a 1-sentence
personalised email opener per agency.

Output: instantly_import_personalized.csv
  columns: email, first_name, website, ref_url, opener

Usage:
    python3.11 personalize_leads.py
    python3.11 personalize_leads.py --limit 100   # test run
    python3.11 personalize_leads.py --input other.csv
"""

import argparse
import asyncio
import csv
import os
import time
from pathlib import Path
from urllib.parse import urlparse

import anthropic
import psycopg2
import psycopg2.extras


# ── config ────────────────────────────────────────────────────────────────────

def load_env_file(path: str = ".env.local") -> dict:
    result = {}
    try:
        for line in Path(path).read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            result[k.strip()] = v.strip().strip('"').strip("'")
    except FileNotFoundError:
        pass
    return result


_env = load_env_file()

ANTHROPIC_API_KEY = _env.get("ANTHROPIC_API_KEY") or os.environ.get("ANTHROPIC_API_KEY", "")
DATABASE_URL      = _env.get("DATABASE_URL")       or os.environ.get("DATABASE_URL", "")

MODEL      = "claude-haiku-4-5-20251001"
CONCURRENCY = 8   # parallel Haiku calls — stays well inside rate limits
INPUT_CSV  = "instantly_import.csv"
OUTPUT_CSV = "instantly_import_personalized.csv"


def log(msg):
    print(f"[{time.strftime('%H:%M:%S')}] {msg}", flush=True)


# ── DB helpers ─────────────────────────────────────────────────────────────────

def domain_from_url(url: str) -> str | None:
    if not url:
        return None
    try:
        d = urlparse(url).netloc.lower()
        return d[4:] if d.startswith("www.") else d
    except Exception:
        return None


def fetch_db_leads(websites: list[str]) -> dict[str, dict]:
    """Return {website: {agencyName, agencyServices, notes}} for each website."""
    if not DATABASE_URL:
        log("WARNING: DATABASE_URL not set — skipping DB enrichment")
        return {}

    conn = psycopg2.connect(DATABASE_URL)
    cur  = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    placeholders = ",".join(["%s"] * len(websites))
    cur.execute(
        f'SELECT "agencyWebsite","agencyName","agencyServices","notes" '
        f'FROM "ReferralLead" WHERE "agencyWebsite" = ANY(%s)',
        (list(websites),)
    )
    rows = cur.fetchall()
    cur.close()
    conn.close()

    return {r["agencyWebsite"]: dict(r) for r in rows}


# ── AI personalisation ─────────────────────────────────────────────────────────

SYSTEM_PROMPT = """\
You write cold email openers for a SaaS outreach campaign.
Scribtly is an AI script-writing tool for social media agencies and video teams.

Rules:
- Exactly ONE sentence — no more, no less.
- Reference something specific about the agency (their niche, services, or slogan).
- Sound human and warm, not salesy.
- Do NOT mention Scribtly or any product.
- Do NOT start with "I" or "We".
- Do NOT use flattery like "impressive" or "love your work".
- Output ONLY the sentence. No quotes, no trailing punctuation beyond a period.
"""

def build_prompt(agency_name: str, services: str, notes: str) -> str:
    parts = [f"Agency: {agency_name}"]
    if services:
        parts.append(f"Services: {services}")
    if notes:
        parts.append(f"About: {notes}")
    return "\n".join(parts)


async def generate_opener(client: anthropic.AsyncAnthropic, row: dict, db_info: dict | None) -> str:
    agency_name = db_info.get("agencyName") if db_info else row.get("first_name", "")
    services    = db_info.get("agencyServices", "") if db_info else ""
    notes       = db_info.get("notes", "") if db_info else ""

    prompt = build_prompt(agency_name or row["first_name"], services or "", notes or "")

    for attempt in range(3):
        try:
            msg = await client.messages.create(
                model=MODEL,
                max_tokens=120,
                system=SYSTEM_PROMPT,
                messages=[{"role": "user", "content": prompt}],
            )
            return msg.content[0].text.strip()
        except anthropic.RateLimitError:
            wait = 2 ** attempt * 5
            log(f"  Rate limit — waiting {wait}s")
            await asyncio.sleep(wait)
        except Exception as e:
            log(f"  API error ({agency_name}): {e}")
            await asyncio.sleep(2)

    return ""  # fallback — leave blank so Instantly skips variable


# ── main ──────────────────────────────────────────────────────────────────────

async def main(input_csv: str, limit: int | None):
    if not ANTHROPIC_API_KEY:
        log("ERROR: ANTHROPIC_API_KEY not set in .env.local or environment")
        return

    # Read input CSV
    with open(input_csv, newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))

    if limit:
        rows = rows[:limit]

    log(f"Loaded {len(rows)} leads from {input_csv}")

    # Enrich from DB
    websites = [r["website"] for r in rows if r.get("website")]
    db_map   = fetch_db_leads(websites)
    log(f"DB enrichment: {len(db_map)} / {len(websites)} matched")

    # Generate openers concurrently
    client    = anthropic.AsyncAnthropic(api_key=ANTHROPIC_API_KEY)
    semaphore = asyncio.Semaphore(CONCURRENCY)
    results   = [None] * len(rows)
    done      = 0

    async def process(i: int, row: dict):
        nonlocal done
        async with semaphore:
            db_info = db_map.get(row.get("website", ""))
            opener  = await generate_opener(client, row, db_info)
            results[i] = opener
            done += 1
            if done % 50 == 0 or done == len(rows):
                log(f"  {done}/{len(rows)} openers generated")

    await asyncio.gather(*[process(i, row) for i, row in enumerate(rows)])

    # Write output
    fieldnames = ["email", "first_name", "website", "ref_url", "opener"]
    with open(OUTPUT_CSV, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
        writer.writeheader()
        for row, opener in zip(rows, results):
            writer.writerow({**row, "opener": opener or ""})

    filled  = sum(1 for o in results if o)
    log(f"[+] Saved {OUTPUT_CSV} — {filled}/{len(rows)} openers generated")
    if filled < len(rows):
        log(f"    {len(rows) - filled} rows left blank (API errors) — Instantly will skip blank variables")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--input",  default=INPUT_CSV,  help="Input CSV path")
    parser.add_argument("--limit",  type=int, default=None, help="Process only first N rows (for testing)")
    args = parser.parse_args()

    asyncio.run(main(args.input, args.limit))
