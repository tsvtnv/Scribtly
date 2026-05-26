"""
personalize_leads.py

Claude-written personalisation -- no API, no cost.
Uses agency name + services + size + slogan + description
to generate openers that feel genuinely unique per agency.

Outputs instantly_import_personalized.csv with:
  opener, subject, pain_point columns
"""
import csv
import hashlib
import re
import psycopg2
import psycopg2.extras
from pathlib import Path

INPUT_CSV  = "instantly_import_final.csv"
OUTPUT_CSV = "instantly_import_personalized.csv"


def load_env(path=".env.local"):
    result = {}
    try:
        for line in Path(path).read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line: continue
            k, v = line.split("=", 1)
            result[k.strip()] = v.strip().strip('"').strip("'")
    except FileNotFoundError:
        pass
    return result


SKIP_WORDS = {"the","a","an","our","we","your","this","that","its","is","are","be","by","in","at","of"}

def clean_first_name(agency_name: str) -> str:
    """Get a usable first name from agency name, skipping filler words."""
    if not agency_name:
        return "there"
    words = agency_name.split()
    for w in words:
        cleaned = re.sub(r"[^a-zA-Z]", "", w)
        if cleaned.lower() not in SKIP_WORDS and len(cleaned) > 1:
            return cleaned
    return words[0] if words else "there"


def log(msg):
    import time
    print(f"[{time.strftime('%H:%M:%S')}] {msg}", flush=True)


def parse_notes(notes: str) -> dict:
    """Extract slogan, description, employees from notes field."""
    out = {"slogan": "", "description": "", "employees": ""}
    if not notes:
        return out
    for line in notes.splitlines():
        if line.startswith("slogan:"):
            out["slogan"] = line[7:].strip()
        elif line.startswith("description:"):
            out["description"] = line[12:].strip()
        elif line.startswith("employees:"):
            out["employees"] = line[10:].strip()
    return out


def size_label(employees: str) -> str:
    """solo / small / mid / large based on employee string."""
    e = employees.lower()
    if not e:
        return "unknown"
    nums = re.findall(r"\d+", e)
    if not nums:
        return "unknown"
    n = int(nums[0])
    if n <= 5:   return "solo"
    if n <= 20:  return "small"
    if n <= 100: return "mid"
    return "large"


def primary_service(services: str) -> str:
    s = (services or "").lower()
    if "video" in s or "film" in s:             return "video"
    if "animation" in s:                         return "animation"
    if "podcast" in s:                           return "podcast"
    if "influencer" in s:                        return "influencer"
    if "social media" in s:                      return "social"
    if "content" in s:                           return "content"
    if "email marketing" in s:                   return "email"
    if "public relation" in s:                   return "pr"
    if "ppc" in s or "pay-per-click" in s:       return "ppc"
    if "seo" in s:                               return "seo"
    if "branding" in s:                          return "branding"
    if "advertising" in s:                       return "advertising"
    if "digital" in s:                           return "digital"
    return "agency"


def has_service(services: str, keyword: str) -> bool:
    return keyword.lower() in (services or "").lower()


def pick(options: list, seed: str) -> str:
    idx = int(hashlib.md5(seed.encode()).hexdigest(), 16) % len(options)
    return options[idx]


# -- opener builder -----------------------------------------------------------

def build_opener(name: str, services: str, notes: dict, size: str, seed: str) -> str:
    svc   = primary_service(services)
    has_v = has_service(services, "video")
    has_s = has_service(services, "social")
    has_c = has_service(services, "content")

    slogan = notes["slogan"]
    desc   = notes["description"]

    # -- solo / founder-led agencies ------------------------------------------
    if size == "solo":
        options = [
            f"When you're running {name} solo, you're probably the strategist, writer, and editor all at once.",
            f"Solo agencies like {name} tend to be bottlenecked by one thing above everything else: writing time.",
            f"Doing everything yourself at {name} means the writing work probably takes longer than any other part of your process.",
            f"The hardest part of running a one-person agency is that client-facing work always crowds out the actual production.",
        ]
        if slogan:
            options.append(f"An agency with a positioning like \"{slogan[:50]}\" is clearly doing interesting work. The challenge is keeping output high when you're a small team.")
        return pick(options, seed)

    # -- video / animation ----------------------------------------------------
    if svc in ("video", "animation"):
        options = [
            f"Video teams at {name}'s scale spend more time rewriting scripts and briefs than they do actually shooting.",
            f"The pre-production phase is where most video projects lose time, and scripts are usually why.",
            f"Great video work starts with the script, but getting to a client-approved one takes longer than it should.",
            f"Production capacity is never the bottleneck for video agencies. Pre-production writing always is.",
            f"Every video agency we talk to says the same thing: the script revision cycle is where timelines go to die.",
        ]
        if has_s:
            options.append(f"Running both video production and social content means {name} is producing scripts for two completely different formats simultaneously.")
        if desc and len(desc) > 30:
            options.append(f"A production team doing the kind of work {name} does is only as fast as the scripts coming in, and clients rarely account for that in their timelines.")
        return pick(options, seed)

    # -- social media ---------------------------------------------------------
    if svc == "social":
        size_openers = {
            "small": [
                f"A small but fast-moving agency like {name} is usually bottlenecked by one thing: how quickly the team can write.",
                f"Small social agencies punch above their weight on strategy but the writing volume is always the constraint.",
                f"The best small agencies are the ones that figured out how to produce at scale without scaling headcount.",
            ],
            "mid": [
                f"Mid-size social agencies like {name} hit a ceiling where client count grows faster than writing capacity.",
                f"At {name}'s scale, the challenge isn't getting clients. It's keeping content quality high across all of them.",
                f"Managing content across multiple clients at once means your team is context-switching between voices and formats all day.",
            ],
            "large": [
                f"Larger social agencies spend a surprising amount of senior time on script and copy work that shouldn't need it.",
                f"At scale, the hidden cost for social agencies is always the writing. It just gets absorbed into overhead.",
                f"Big social agencies have great processes for everything except the actual content writing, which stays manual.",
            ],
        }
        fallback = [
            f"Social media agencies live and die by content output, and the bottleneck is almost always the writing.",
            f"Managing content for multiple clients means your team is writing the same hooks and captions on repeat.",
            f"The hardest part of running a social media agency isn't strategy. It's producing enough quality content to execute it.",
            f"Most social agencies we talk to say ideation and scripting takes longer than the actual production.",
        ]
        if slogan:
            fallback.append(f"An agency positioned around \"{slogan[:45]}\" is clearly focused on results. The question is how much time the content writing takes to get there.")
        candidates = size_openers.get(size, []) + fallback
        return pick(candidates, seed)

    # -- content marketing ----------------------------------------------------
    if svc == "content":
        options = [
            f"Content agencies are essentially writing factories, and the output demand only ever goes in one direction.",
            f"The hardest thing about running a content agency is that clients see the published piece, not the hours behind it.",
            f"Most content agencies hit the same ceiling: you can only take on clients until writing quality or turnaround starts to slip.",
            f"The brief-to-draft cycle is where content agencies lose the most time, and clients rarely have patience for slow turnarounds.",
            f"Scaling a content agency without scaling your writing team is one of the harder operational problems in the business.",
        ]
        if has_v:
            options.append(f"Running content and video together means {name} is producing two of the most writing-intensive service types simultaneously.")
        if desc and len(desc) > 40:
            options.append(f"Content agencies that go deep on strategy, like {name} seems to, often find that execution speed is what limits growth, not the quality of thinking.")
        return pick(options, seed)

    # -- PR -------------------------------------------------------------------
    if svc == "pr":
        options = [
            f"PR agencies are essentially storytelling machines: pitches, press releases, talking points. The writing never stops.",
            f"Media cycles move faster than ever and PR teams need to be even faster, and writing speed is usually the constraint.",
            f"The agencies winning media coverage are the ones that can turn a story angle into a pitch the same day.",
            f"Most PR teams say the same thing: the strategy is solid but getting it all written fast enough is always the challenge.",
            f"Press opportunities don't wait, and most PR agencies lose them because the writing side can't move fast enough.",
        ]
        return pick(options, seed)

    # -- email marketing ------------------------------------------------------
    if svc == "email":
        options = [
            f"Email marketing agencies that manage large sends know sequence copy is the most time-consuming deliverable on every project.",
            f"The best email campaigns aren't won on strategy. They're won on copy volume, and most agencies can't write fast enough to test properly.",
            f"Writing enough email variants to properly A/B test is one of the more unglamorous but critical parts of running an email agency.",
            f"Every email agency we talk to says the same thing: they have the strategy, but writing all the sequences takes forever.",
        ]
        return pick(options, seed)

    # -- SEO ------------------------------------------------------------------
    if svc == "seo":
        options = [
            f"SEO agencies sitting on solid keyword strategies are almost always limited by one thing: how fast they can produce content.",
            f"Content velocity is one of the biggest factors in SEO results, and most agencies can't publish fast enough to take full advantage.",
            f"The bottleneck in SEO is never the strategy. It's the execution, and execution means writing.",
            f"Most SEO agencies have more keyword opportunities than their team can produce content for in any given month.",
        ]
        return pick(options, seed)

    # -- PPC ------------------------------------------------------------------
    if svc == "ppc":
        options = [
            f"PPC agencies need fresh ad copy constantly: new angles, new hooks, new CTAs. Writing is always the slow part.",
            f"The agencies running the best paid campaigns are the ones testing the most copy variations, which means a lot of writing at speed.",
            f"Ad copy testing at scale requires more copy than most PPC teams can realistically produce in-house.",
        ]
        return pick(options, seed)

    # -- branding -------------------------------------------------------------
    if svc == "branding":
        options = [
            f"Branding agencies are in the business of defining voice. The challenge is translating that into scripts and copy at the speed clients expect.",
            f"The gap between a finished brand guide and live content is where branding agencies spend the most time.",
            f"Clients hire branding agencies for the thinking but they want the content even faster than the strategy.",
        ]
        if slogan:
            options.append(f"A branding agency with a positioning like \"{slogan[:45]}\" clearly gets the strategy side. The question is how fast you can execute at the content level.")
        return pick(options, seed)

    # -- advertising ----------------------------------------------------------
    if svc == "advertising":
        options = [
            f"Ad agencies produce more copy than almost any other type, and the margin is always tightest on the writing side.",
            f"The agencies winning on paid channels are the ones iterating copy fastest, which requires producing a lot of it.",
            f"Creative testing at scale means writing more variations than most agency teams can produce without it becoming the bottleneck.",
        ]
        return pick(options, seed)

    # -- influencer -----------------------------------------------------------
    if svc == "influencer":
        options = [
            f"Influencer agencies know the content brief is everything, and writing good ones for every creator on every campaign takes serious time.",
            f"The best influencer campaigns are built on strong creative direction, and that starts with the brief, which takes longer than it should.",
        ]
        return pick(options, seed)

    # -- digital / default ----------------------------------------------------
    options = [
        f"Full-service agencies like {name} are expected to produce everything: ads, social, email, video. The writing is always the constraint.",
        f"The agencies growing fastest right now are the ones that figured out how to produce content at scale without it eating their margins.",
        f"Most agency owners tell us the same thing: growth is limited by how fast the team can produce, not how good the strategy is.",
        f"The best agencies we work with are obsessed with output quality, and they're always looking for ways to produce more without compromising it.",
        f"Digital agencies hit a ceiling where client count grows faster than the team's ability to produce content for them.",
    ]
    if slogan:
        options.append(f"An agency positioned around \"{slogan[:50]}\" is clearly doing strong work. The challenge is always keeping production speed up as you grow.")
    return pick(options, seed)


# -- subject builder ----------------------------------------------------------

def build_subject(services: str, size: str, seed: str) -> str:
    svc = primary_service(services)

    subjects = {
        "video":       ["Scripts slowing down your production?", "Pre-production: where video projects stall", "Quick question about your scripting process", "The brief-to-script bottleneck"],
        "animation":   ["Scripts are where animation projects stall", "Pre-production writing: how you handle it", "Quick question for your team"],
        "social":      ["The content writing bottleneck", "Quick question about your content workflow", "Scaling content without scaling headcount", "How your team handles script volume", "The repetitive part of running a social agency"],
        "content":     ["The brief-to-draft bottleneck", "Scaling content output: quick question", "How fast is your team producing right now?", "Content velocity: how you handle it"],
        "pr":          ["Fast-turnaround writing for PR teams", "How your team handles media cycle speed", "The writing side of PR: quick question"],
        "email":       ["Email copy volume: quick question", "How fast is your team writing sequences?", "The copy testing problem in email marketing"],
        "seo":         ["Content velocity for SEO agencies", "Keyword opportunities vs writing speed", "The content bottleneck in SEO"],
        "ppc":         ["Ad copy volume: how you handle it", "Copy testing at scale: quick question", "The writing bottleneck in PPC"],
        "branding":    ["From brand guide to live content", "Translating brand voice into content at speed", "Quick question about content execution"],
        "advertising": ["Copy iteration speed: quick question", "Creative testing at scale", "Where ad agencies lose margin on copy"],
        "influencer":  ["Brief writing at scale: quick question", "The creative brief bottleneck"],
        "agency":      ["Quick question about your content process", "The writing bottleneck most agencies don't talk about", "Scaling output without scaling costs"],
    }

    options = subjects.get(svc, subjects["agency"])
    return pick(options, seed + "subj")


# -- pain point builder -------------------------------------------------------

def build_pain(services: str, size: str, seed: str) -> str:
    svc = primary_service(services)

    pains = {
        "video":       ["Getting from brief to camera-ready script without the revision cycle eating the timeline.", "Producing scripts fast enough that pre-production never holds up the shoot.", "Client-approved scripts arriving late and pushing every downstream deadline."],
        "animation":   ["Script revisions stalling animation pipelines and pushing delivery dates.", "Getting client-approved scripts fast enough to keep animators working."],
        "social":      ["Producing on-brand scripts and captions for every client without turnaround slipping.", "Writing fresh content at the volume clients expect without burning out your team.", "Keeping up with posting schedules when writing is still mostly manual.", "Producing enough content variants to properly test what works for each client."],
        "content":     ["Closing the gap between content strategy and published output volume.", "Maintaining quality and speed as client count and content demand grows.", "Getting from brief to first draft faster without sacrificing tone or depth."],
        "pr":          ["Getting press-ready copy turned around fast enough to capitalise on news cycles.", "Producing pitches, releases, and talking points without writing becoming the bottleneck."],
        "email":       ["Writing enough email copy to properly A/B test subject lines and sequences.", "Producing full email sequences fast enough that campaigns launch on time."],
        "seo":         ["Publishing content fast enough to capitalise on keyword opportunities before competitors do.", "Closing the gap between keyword strategy and the content volume needed to execute it."],
        "ppc":         ["Generating enough ad copy variants to run proper split tests without a writing bottleneck.", "Producing creative at the speed needed to properly optimise paid campaigns."],
        "branding":    ["Producing brand-aligned content fast enough to meet client expectations post-launch.", "Scaling branded content without losing the consistency clients hired you for."],
        "advertising": ["Writing enough creative variants to find what converts without it eating into margins.", "Keeping copy iteration fast enough that campaign optimisation doesn't stall."],
        "influencer":  ["Getting creator-ready briefs written fast enough to keep campaign timelines on track.", "Producing strong creative direction documents without it taking half a day per campaign."],
        "agency":      ["Producing enough quality content to keep up with client expectations without turnaround slipping.", "Scaling output without scaling costs or missing deadlines.", "Keeping copy and script production fast enough that it doesn't eat into project margins."],
    }

    options = pains.get(svc, pains["agency"])
    return pick(options, seed + "pain")


# -- main ---------------------------------------------------------------------

def main():
    _env = load_env()

    conn = psycopg2.connect(_env["DATABASE_URL"])
    cur  = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute('SELECT "leadId","agencyName","agencyWebsite","contactEmail","agencyServices","notes" FROM "ReferralLead" WHERE "contactEmail" IS NOT NULL')
    db_map = {r["agencyWebsite"]: dict(r) for r in cur.fetchall()}
    cur.close(); conn.close()
    log(f"Loaded {len(db_map)} leads from DB")

    with open(INPUT_CSV, newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))
    log(f"Loaded {len(rows)} rows from {INPUT_CSV}")

    output_rows = []
    svc_counts: dict[str, int] = {}

    for row in rows:
        website  = row.get("website", "")
        db       = db_map.get(website, {})
        name     = db.get("agencyName") or ""
        services = db.get("agencyServices") or ""
        notes    = parse_notes(db.get("notes") or "")
        size     = size_label(notes["employees"])
        svc      = primary_service(services)
        seed     = website  # deterministic per domain

        opener      = build_opener(name, services, notes, size, seed)
        subject     = build_subject(services, size, seed)
        pain_point  = build_pain(services, size, seed)

        first_name = clean_first_name(name)
        svc_counts[svc] = svc_counts.get(svc, 0) + 1
        output_rows.append({**row, "first_name": first_name, "opener": opener, "subject": subject, "pain_point": pain_point})

    fieldnames = list(rows[0].keys()) + ["opener", "subject", "pain_point"]
    with open(OUTPUT_CSV, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(output_rows)

    log(f"Saved {len(output_rows)} rows to {OUTPUT_CSV}")
    log("Breakdown:")
    for k, c in sorted(svc_counts.items(), key=lambda x: -x[1]):
        log(f"  {k}: {c}")

    # Preview 3 samples
    log("\nSample openers:")
    import random
    for row in random.sample(output_rows, min(3, len(output_rows))):
        db = db_map.get(row["website"], {})
        log(f"  [{db.get('agencyName','')}] {row['opener']}")
        log(f"  Subject: {row['subject']}")
        log(f"  Pain: {row['pain_point']}")
        log("")


if __name__ == "__main__":
    main()
