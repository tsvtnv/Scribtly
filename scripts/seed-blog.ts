import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const posts = [
  {
    slug: "how-to-write-a-youtube-hook",
    title: "How to write a YouTube hook that keeps viewers watching",
    metaDescription:
      "Most YouTube videos lose 40% of viewers in the first 30 seconds. Here's how to write hooks that hold attention and boost watch time for your clients.",
    excerpt:
      "The hook is the most important line in any YouTube script. Get it wrong and the rest of the script doesn't matter — viewers are already gone. Here's the formula that works.",
    tags: ["youtube scripts", "hook writing", "video script tips", "watch time"],
    readingMins: 5,
    content: `## Why the first 30 seconds decide everything

YouTube's algorithm rewards watch time, but it can only reward it if viewers actually stay. Most don't. The average YouTube video loses 30–40% of its audience in the first 30 seconds — and the drop is almost always caused by a weak hook.

A hook isn't just a catchy opening line. It's a contract with the viewer: **here's what you'll get if you keep watching**. Break that contract — or make it too vague — and they're gone.

## The three-part hook structure

Every strong YouTube hook has three jobs to do, in this order:

**1. Interrupt the scroll**
The very first line needs to stop someone mid-scroll. Use a counterintuitive claim, a specific number, or a direct challenge. "Here's how to write better scripts" doesn't interrupt anything. "Most YouTube scripts fail in the first 15 words — including yours" does.

**2. Make a specific promise**
After the interrupt, the viewer needs to know exactly what they'll learn. Vague promises ("I'll share some tips today") kill retention. Specific promises ("I'll show you the exact 3-part hook structure I use for every client") keep people watching.

**3. Create a reason to stay**
Give them a reason not to skip ahead. "But before I get to that, let me show you the most common mistake" creates curiosity. Teasing the best moment of the video upfront ("I'll share the script I used to generate 2 million views — stay to the end") is even stronger.

## Hook types that actually work

Not every hook uses the same approach. Here are the four formats that consistently perform:

- **The counterintuitive claim**: "Shorter hooks don't always perform better. Here's why your 45-second intro might be fine."
- **The specific failure**: "95% of freelance scripts open with the creator's name. Here's why that's killing your client's retention."
- **The number hook**: "Three sentences. That's all you need to write a hook that holds 70% of viewers past the two-minute mark."
- **The before/after**: "I used to write 10-minute intros. Now I write five words and move on. This is what changed."

## What to avoid

These patterns tank retention every time:

- Starting with the channel name or a hello
- Summarising the entire video before it begins
- Explaining the creator's credentials before the promise
- Using "Today we're going to talk about..." as the opening

The viewer already clicked. They know what the video is roughly about. They don't need a recap — they need a reason to trust that the next 10 minutes will be worth it.

## Applying this to client work

When you're writing for a client, the hook also needs to match their voice. A fitness coach's hook sounds different to a B2B SaaS founder's hook — even if they're covering the same topic. Save that voice profile once and let it inform every hook you write.

Scribtly generates YouTube scripts that open with hooks calibrated for your client's specific tone and audience. Try it on your next script and compare the result to your usual starting point.`,
  },
  {
    slug: "tiktok-script-structure-for-freelancers",
    title: "TikTok script structure: the formula freelancers actually use",
    metaDescription:
      "TikTok scripts aren't just short YouTube scripts. Here's the exact structure freelance script writers use to hold attention in 30–60 seconds.",
    excerpt:
      "Writing TikTok scripts for clients is different to writing long-form content. The pacing, the hooks, the retention tactics — everything changes at 60 seconds. Here's the structure that works.",
    tags: ["tiktok scripts", "short-form video", "script structure", "freelance writing"],
    readingMins: 4,
    content: `## TikTok is not YouTube with a time limit

The biggest mistake freelance script writers make when moving to TikTok is treating it like a shorter version of YouTube. It isn't. The algorithm is different, the viewer behaviour is different, and the script structure needs to be completely different too.

On YouTube, you're working with someone who already clicked and committed to a topic. On TikTok, your client's video appeared in a feed full of competitors. The viewer hasn't chosen to be there — and they'll leave in 0.5 seconds if the first frame doesn't earn their attention.

## The four-part TikTok script structure

Every TikTok script that holds attention follows roughly the same pattern:

**Hook (0–3 seconds)**
One sentence. No setup, no intro, no greeting. It should be a direct claim, a bold statement, or a question that makes the viewer want to see what comes next. "This one habit doubled my client's views in two weeks" is a hook. "Hey guys, welcome back to my channel" is not.

**Pattern interrupt (3–8 seconds)**
This is the most underrated part of TikTok scripting. After the hook, most creators move straight into their content — and viewers start scrolling. A pattern interrupt — a sudden change in delivery, a B-roll cut, a surprising stat — gives the algorithm-trained brain a reason to reset and keep watching.

**Body (8–45 seconds)**
TikTok content works best in short beats. Three points, each delivered in one to two sentences. No rambling. No backstory. If you've written a paragraph, it's too long — break it into bullets.

**CTA (final 5–10 seconds)**
One action, clearly stated. Follow for more, comment with your answer, save this for later. Never more than one CTA — TikTok viewers won't do two things.

## Pacing tips that make the difference

- Write for speech, not reading. Read every line aloud. If it sounds like an essay, rewrite it.
- Short sentences hold attention better than long ones. Aim for 8 words or fewer per beat.
- Add B-roll cues in brackets so the client knows where to cut away: [CUT TO: before/after shot]
- End sentences on strong words. "This is why most creators fail" lands harder than "This is a common reason for failure in many creators."

## The 15-second version

If the brief is under 15 seconds, the structure is even simpler: hook, one point, CTA. That's it. Don't try to squeeze three ideas in — pick the strongest one and make it land.

## What clients actually want

Most clients don't know what structure their TikTok scripts should follow. They hired you because you do. Give them the script, explain the pacing choices in two sentences, and let them film. Don't make them read a brief about TikTok theory.

Scribtly generates TikTok scripts with the right structure baked in — hooks, pattern interrupts, and CTAs calibrated to your client's voice and niche. It's a faster first draft, so you can spend your time on the refinements that only a human writer can make.`,
  },
  {
    slug: "how-to-price-freelance-script-writing",
    title: "How to price freelance script writing without underselling yourself",
    metaDescription:
      "Charging by the word or by the hour is costing freelance script writers money. Here's how to price your work based on value — and what rates to aim for in 2025.",
    excerpt:
      "Most freelance script writers undercharge because they're pricing the wrong thing. Here's a practical guide to moving from hourly rates to value-based pricing — and what that looks like in practice.",
    tags: ["freelance pricing", "script writing rates", "freelance business", "client management"],
    readingMins: 6,
    content: `## The per-word pricing trap

A lot of freelance script writers start out charging by the word — usually somewhere between $0.10 and $0.20 per word. It feels fair. The client knows exactly what they're paying for. You know exactly what you're delivering.

The problem is that it ties your income to volume, not skill. A 1,000-word YouTube script from a writer who understands hooks, retention, and the creator's voice is worth five times more than a 1,000-word script from someone who doesn't. Per-word pricing ignores that entirely.

## What you're actually selling

You're not selling words. You're selling:

- Time the creator doesn't have to spend staring at a blank page
- Confidence that the script will perform — not just fill a length requirement
- A deliverable they can hand directly to their editor
- Consistency across every video in their library

When you frame your service this way, the pricing conversation changes completely.

## Rates to benchmark against (2025)

These are realistic ranges for experienced freelance script writers working in English:

- **Short-form (TikTok/Reels, 15–60 sec)**: £30–£80 per script
- **Mid-form (YouTube, 5–10 min)**: £100–£200 per script
- **Long-form (YouTube, 15–20 min)**: £200–£400 per script
- **Monthly retainer (4–8 scripts)**: £400–£1,200/month

If you're below these numbers and you've been doing this for more than six months, you're leaving money on the table.

## How to raise your rates without losing clients

The most effective approach is a package upgrade rather than a rate increase. Instead of saying "I'm charging more from next month," you say: "I'm restructuring my offerings. Here's my new package that includes [X additional deliverable]."

Common add-ons that justify higher rates:

- **Title and thumbnail concepts** — two to three ideas per video
- **Chapter markers** — timestamped, optimised for YouTube chapters
- **Social cut scripts** — a 60-second TikTok version of the long-form video
- **Script revisions** — one round included, additional rounds billed separately

Bundle these into a clear package, and a £150 script becomes a £220 package with defined scope.

## The retainer advantage

Per-script billing keeps your income unpredictable. Retainers fix that. Most content creators who are serious about their output will commit to four scripts a month if you give them a price that makes sense.

To pitch a retainer: work out what four scripts would cost at your standard rate, discount by 10–15%, and frame it as a "monthly priority slot." The discount is small. The certainty — for both of you — is worth it.

## Practical steps for this week

1. List your current clients and what you're charging them
2. Calculate your effective hourly rate (total fees ÷ total hours including revisions and communication)
3. If it's under £50/hour, your rates need to go up
4. Draft a new package structure and test it on your next new client inquiry

Tools like Scribtly can cut the time you spend on first drafts by 60–70%, which means your effective hourly rate goes up even before you raise your prices. Use that margin to take on better clients, not more of the same.`,
  },
  {
    slug: "client-voice-profile-guide-for-script-writers",
    title: "How to build a client voice profile that actually works",
    metaDescription:
      "A good client voice profile means every script sounds like them, not like you. Here's how to capture tone, phrases, and audience in a format you can reuse.",
    excerpt:
      "Starting from scratch every time a client gives you a brief is the slowest way to work. A voice profile changes that — one document, built once, that makes every future script faster and more accurate.",
    tags: ["client management", "brand voice", "freelance workflow", "script writing"],
    readingMins: 5,
    content: `## Why most client briefs aren't enough

The typical client brief tells you the topic, the rough length, and maybe a deadline. What it doesn't tell you is how they actually speak. What phrases they use. What they'd never say. What their audience already knows and what they need explained.

Without that information, you're guessing — and the result is a script that's technically correct but doesn't sound like them. Then you're in revision cycles that eat your margin.

A voice profile solves this at the source.

## What to include in a voice profile

A useful voice profile has six sections:

**1. Audience**
Who is this creator talking to? Not just demographics — describe the viewer in one sentence. "25–35 year old marketing managers who've tried content strategy and failed" is a useful audience description. "Entrepreneurs" isn't.

**2. Niche and positioning**
What space do they operate in, and what's their angle? Are they the "no-fluff productivity coach"? The "honest fitness creator who doesn't sell supplements"? The positioning should come through in every script.

**3. Tone words**
Ask the client to give you three adjectives that describe how they want to come across. Common answers: direct, warm, expert, conversational, no-nonsense, educational. Use these as a filter when you're writing — would a "no-nonsense educator" use this phrase?

**4. Signature phrases**
Every creator has words or phrases they use regularly. Some are intentional brand language. Others they don't even notice. Listen to three of their videos and note what comes up repeatedly. These should appear naturally in scripts.

**5. What to avoid**
This is the most underused section. Ask explicitly: what would you never say? Some creators hate corporate language. Others don't swear. Some have specific competitors they don't want mentioned. Write it down.

**6. CTA preferences**
How do they like to end videos? Some creators always ask for comments. Others push subscriptions hard. Some avoid all of it. The CTA should match their style, not yours.

## How to collect this information

Send a short questionnaire before you start — five to eight questions, no more. Most of the answers you need are already in their existing videos. Watch three before you write anything. The questionnaire fills in the gaps their content doesn't show.

Questions worth asking:
- What are three words your audience would use to describe you?
- What's a phrase you use all the time that your audience recognises?
- Who is your ideal viewer — describe them in one sentence?
- What should my scripts never include?

## How to use it once you have it

The profile goes at the top of every brief. Before you write a single word, read it. Let it set the tone in your head. If you're stuck on a line, ask yourself: would this person actually say this?

Keep profiles in a shared doc or in your script tool. Update them when something changes — a creator's positioning shifts over time, and your profile should too.

Scribtly stores a voice profile for each of your clients and pulls from it automatically when generating scripts. You fill it in once, and every draft starts with their voice already loaded — not yours.`,
  },
  {
    slug: "broll-notes-in-video-scripts",
    title: "B-roll notes in scripts: what to write and why it matters",
    metaDescription:
      "B-roll notes tell editors exactly what to cut to — saving time, preventing bad edits, and making your deliverable more useful. Here's how to write them.",
    excerpt:
      "A script without B-roll notes is half a script. Editors working without direction make arbitrary cuts — and creators blame the script. Here's how to write B-roll notes that make your work better and your clients happier.",
    tags: ["video production", "script writing", "broll", "editing workflow"],
    readingMins: 4,
    content: `## What B-roll notes are and why most scripts skip them

B-roll is the footage that plays while someone is talking — product close-ups, screen recordings, stock clips, behind-the-scenes footage. It's what turns a talking-head video into something visually engaging.

Most script writers don't include B-roll notes. Some don't know they should. Others think it's the editor's job to figure out. Both are wrong.

When you write a script without B-roll guidance, you're handing the creator or editor a document that's only half finished. They have to interpret what you meant, guess what would visually reinforce the point, and hope they got it right. Sometimes they do. Often they don't.

Including B-roll notes takes an extra five minutes per script and makes your deliverable significantly more useful.

## How to format B-roll notes

The convention that works best for most freelancers is brackets, all caps, placed directly after the line they correspond to:

> "Most creators lose 40% of viewers in the first 30 seconds."
> [B-ROLL: screen recording of YouTube analytics retention graph dropping]

> "Here's what changed when I switched my hook structure."
> [B-ROLL: side-by-side comparison of old vs new hook — creator to provide]

The note tells the editor what type of shot to use and what it should show. If the creator needs to film it themselves, say so. If stock footage works, say that.

## The four types of B-roll you'll use most

**Screen recordings** — analytics, tools, apps, browser windows. Especially useful for tutorial content and any time you're referencing data.

**Product or object close-ups** — physical products, books, equipment. The creator films these themselves.

**Text on screen** — when you're listing steps or points, a text overlay is often cleaner than B-roll. Note it the same way: [TEXT ON SCREEN: "Step 1: Audit your hook"]

**Stock / archival footage** — useful for abstract concepts. Be specific: [B-ROLL: stock — busy freelancer at desk, coffee, morning light] gives an editor something to search for.

## What not to do

- Don't write B-roll notes for every single line — it clutters the script and implies the editor can't make any decisions at all
- Don't write vague notes like [B-ROLL: relevant footage] — that's not guidance, it's noise
- Don't write B-roll notes for spoken moments that should stay on camera — not everything needs a cutaway

## When to ask the client about their B-roll library

Before you write any B-roll notes, ask one question: **what footage do you have available?**

Some creators have hours of archived footage. Others film everything fresh. Knowing this shapes what you can suggest. There's no point writing [B-ROLL: time lapse of product being assembled] if they've never filmed one and have no plans to.

For clients with limited footage, focus your B-roll notes on screen recordings and text overlays — both are easy to produce and consistently effective.

Scribtly includes B-roll cue suggestions in scripts when relevant — especially for tutorial and how-to content where visual reinforcement makes a material difference to viewer retention.`,
  },
  {
    slug: "how-to-handle-client-script-revisions",
    title: "How to handle client script revisions without losing your margin",
    metaDescription:
      "Revision rounds can quietly eat your freelance margin. Here's how to set a clear revision policy, manage script feedback efficiently, and protect your time.",
    excerpt:
      "Every freelance script writer knows the feeling: the job was quoted, the brief was clear, and then the revision cycle started. One round becomes four, and the margin disappears. Here's how to set up the process so that stops happening.",
    tags: ["client management", "freelance workflow", "script revisions", "revision policy", "freelance business"],
    readingMins: 6,
    content: `## Why revisions are the biggest hidden cost in script writing

You quoted the job, the client accepted, you delivered the script, and then the feedback started. One round became two. Two became four. By the time you submitted the final version you'd spent twice the hours you priced for — and you can't invoice for any of it.

Revision creep is one of the most common reasons freelance script writers undercharge and burn out. Not because clients are unreasonable — but because the process wasn't structured clearly from the start.

Here's how to fix it before your next project.

## Set a revision policy before work begins

The single most important thing you can do is define how many revision rounds are included — in writing, before you start.

Most freelancers don't do this. They assume clients will be reasonable. Some are. But "reasonable" means different things to different people, and without a written agreement, you have no reference point when round five arrives.

A practical policy looks like this:

- **One round of revisions included.** A revision round means consolidated written feedback, submitted once, within five business days of delivery.
- **Additional rounds billed at £X per hour** (or a flat rate per round, whichever you prefer).
- **Scope changes** — asking for a completely different angle, a new target audience, or a different platform format — are a new brief, not a revision.

Put this in your contract and reference it in your delivery email. You don't need to make it aggressive. A simple "one round of revisions included as per our agreement" in the email is enough.

## Distinguish between a revision and a rewrite

This is the distinction most clients don't understand — and most freelancers don't explain clearly enough.

**A revision** is a change to what was already written: adjusting a line, swapping a phrase, tightening a section, or fixing a factual error. It assumes the brief was followed correctly and the structure is sound.

**A rewrite** is a new creative direction: a different tone, a different hook approach, a completely restructured argument, a different audience framing. This is new work — and it should be priced accordingly.

When feedback arrives that's actually a rewrite request disguised as revision notes, you can flag it professionally: "This would involve revisiting the brief and taking a different creative direction, which falls outside the one included revision round — happy to quote a separate rate for this if useful."

Most clients accept this when it's explained calmly and clearly.

## Structure your delivery to reduce revision requests

The best way to reduce revisions is to give fewer reasons for them. A structured delivery reduces the back-and-forth before it starts.

**Include a brief delivery note.** Two or three sentences explaining your creative choices — why you opened with that hook, why you structured the body this way, what the CTA is designed to do — removes the ambiguity that often triggers unnecessary feedback. Clients who understand your decisions revise less.

**Flag assumptions explicitly.** If the brief was vague and you made a judgement call, say so. "I assumed the tone here should be direct and educational rather than conversational — let me know if you'd prefer the latter." This invites a simple answer rather than a long revision note.

**Set a feedback window.** Ask clients to send feedback as a single consolidated document rather than drip-feeding notes over several days. A single revision round is manageable. Eight individual emails with one comment each is not — and it often results in contradictory feedback from different people on the client's team.

## Handle vague feedback before it becomes a problem

"This doesn't feel right" is the revision note that kills freelance margin.

When feedback is vague, the temptation is to make a series of small changes and hope one of them lands. This is the wrong approach. It produces more rounds, not fewer.

Instead, respond with a clarifying question: "Happy to work on this — could you point me to a specific line or section, or describe what 'right' looks and sounds like for this one? That'll help me nail it faster."

This does three things: it puts the client in the position of being specific, it frames you as a professional who wants to get it right, and it reduces the chance of writing three wrong versions before the right one.

## When a client pushes back on your revision policy

Some clients will push back. They expected unlimited revisions based on past experience with other writers, or they didn't read the contract carefully. Here's a way to handle it without damaging the relationship:

> "I completely understand — I want to make sure the script is right. I've included one round of consolidated revisions in this project, which covers [X]. If we need to go further than that, I can quote an additional round at [rate] — should take [timeframe]. Alternatively, if you can send me all the remaining feedback in one document, I can work through it in the included round."

This offers a solution without backing down. Most clients who push back aren't being difficult — they just haven't thought about the scope. Give them a path forward and the conversation usually resolves cleanly.

## Build a feedback template clients can fill in

One underrated way to improve the quality of revision feedback is to make it easier for clients to give structured notes rather than stream-of-consciousness emails.

A simple feedback template might ask:

- Which sections or lines do you want changed?
- What's the specific issue — tone, accuracy, phrasing, or structure?
- What would "better" look like for each note?
- Are there any sections you're happy with and want kept?

Send this alongside your script delivery. Not every client will use it, but the ones who do will give you revision notes that are faster to action and far less likely to spiral.

## Where AI fits into the revision cycle

One of the practical advantages of using an AI-assisted tool for first drafts is that you can iterate quickly when feedback does arrive. Rather than rewriting a section from scratch, you start with a well-structured draft, apply the feedback, and regenerate the affected parts in your client's saved voice.

Scribtly stores each client's voice profile — their tone, phrases, and audience framing — so when revision notes arrive, you're not starting again. You're refining something that already sounds like them, not something generic you'll have to rewrite anyway.

Fewer revision rounds start with a better first draft. [Try Scribtly free](/signup) and see how much the starting point changes.

## Common revision mistakes to avoid

**Accepting unlimited revisions on a fixed-price contract.** If you agreed a price per script, unlimited rounds mean your hourly rate gets lower with every round. Price in revision limits from day one.

**Making revisions without checking scope first.** If feedback arrives that seems like a rewrite, flag it before you do the work. Not after.

**Revising without written confirmation.** For significant changes, confirm in writing: "Based on your notes, here's what I'll change in the next version: [X, Y, Z]. Does that cover it?" This prevents the feedback goalposts from moving.

**Revising in isolation.** If a client has a team involved in approvals, make sure you're getting consolidated feedback from one point of contact — not separate notes from three different people at three different times.

**Absorbing revision costs without tracking them.** Even if you don't invoice for extra rounds, track the time. It'll show you which clients are profitable and which ones need their rates reviewed.

## A revision process that works in practice

Here's a simple workflow that holds up across most client relationships:

1. **Before you start**: Confirm the brief, document any assumptions, agree the revision policy in writing.
2. **At delivery**: Include a brief delivery note explaining key creative decisions. Set a feedback window (5 business days is standard).
3. **When feedback arrives**: Distinguish revision from rewrite. If it's a revision, action it. If it's a rewrite, scope it first.
4. **On round two**: If you're heading into an extra round, reference the policy, offer a clear path forward, and set expectations on timeline.
5. **After completion**: Note which clients had clean revision cycles and which didn't. Over time, this shapes who you take on and how you price.

Getting revisions right isn't about being rigid with clients. It's about setting up a structure that makes both sides' expectations clear — so the work stays enjoyable and the margin stays where it should be.

If you're spending more time revising than writing, try [Scribtly's free plan](/signup) — better first drafts in your client's voice mean fewer revision rounds, and more time for the work that actually moves the needle.`,
  },
  {
    slug: "how-to-turn-one-idea-into-five-scripts",
    title: "How to turn one video idea into five platform-ready scripts",
    metaDescription:
      "One brief, five scripts. Here's how to adapt a single video idea for YouTube, TikTok, Reels, Shorts, and LinkedIn without starting from scratch each time.",
    excerpt:
      "Writing five scripts from a single brief is one of the highest-leverage skills a freelance script writer can develop. Here's the exact workflow — and why it's faster than treating each platform as a separate job.",
    tags: ["content repurposing", "video scripts", "platform strategy", "freelance workflow", "short-form video"],
    readingMins: 5,
    content: `## One brief, five opportunities

Most freelancers treat each platform as a separate job. A client asks for a YouTube video and a TikTok, two separate briefs come in, two scripts get written from scratch, and the job takes twice as long as it should.

The smarter approach is to start with one idea and systematically adapt it for every platform the client is active on. The idea is the hard part. The adaptation is a skill you can build into a repeatable system.

## Why platform adaptation isn't just copy-paste

The obvious move is to write a YouTube script and trim 90% of it for TikTok. That rarely works cleanly.

YouTube viewers chose to watch. They expect context, setup, and depth. TikTok viewers arrived mid-scroll and haven't committed to anything. They need to be stopped within the first two seconds, then kept moving at a pace that leaves no room to disengage.

Adapting a script across platforms isn't about shortening it — it's about restructuring it for a different viewing context, attention state, and platform logic.

## The five formats to cover

**1. YouTube long-form (8–15 minutes)**
Write this one first. It's the anchor: full hook, a context section, three to five main points with supporting detail, and a clear CTA. Everything else is built from it.

**2. YouTube Shorts (under 60 seconds)**
Pull the single strongest point from the long-form and write it as a standalone piece. Hook, one insight, payoff. Don't frame it as a trailer for the longer video — Shorts that stand alone consistently outperform those that just tease a longer watch.

**3. TikTok (30–60 seconds)**
TikTok requires a hook written specifically for a mid-scroll audience who hasn't chosen to be there. Take the same core insight as the Shorts version but rewrite the opening from scratch. The body can follow a similar arc. The CTA should match the client's TikTok preferences — follow, comment, save — not a generic subscribe push.

**4. Instagram Reels (15–45 seconds)**
Reels skews slightly more polished than TikTok. The hook can be similar, but the pacing is a little slower and the visual style more considered. Captions also carry more weight on Reels — write a brief alongside the script rather than leaving the client to improvise one.

**5. LinkedIn video (30–90 seconds)**
LinkedIn audiences expect professional framing. Take the core idea and reposition it around a business result, a professional lesson, or a workplace insight. Casual, creator-style hooks rarely land here — lead with the outcome or the practical takeaway instead.

## A practical workflow for one brief

Before writing a single word, do this:

**Step 1: Define the core insight**
Write the central idea in one sentence. All five scripts are built around this. If you can't state it clearly in a sentence, the brief isn't specific enough yet — go back to the client.

**Step 2: Write the long-form anchor script**
Do the full YouTube script first. Developing the idea fully at this stage makes every shorter version faster and better.

**Step 3: Extract the short-form version**
Find the strongest 30-second moment in the long-form. Extract it, rewrite the opening hook for TikTok, and cut everything that doesn't serve that one point.

**Step 4: Adapt for Reels and LinkedIn**
These are adjustments, not rewrites. Change the framing and tone; keep the core argument intact.

**Step 5: Write platform-specific captions**
A single caption reused across platforms is a missed opportunity. Write a short caption for each platform as part of the delivery — it takes 10 minutes and significantly improves how clients perceive the quality of your work.

## What to include in the deliverable

A structured one-idea, five-script package should contain:

- Full YouTube long-form script with B-roll cues
- YouTube Shorts script (standalone)
- TikTok script with platform-native hook and CTA
- Instagram Reels script with caption brief
- LinkedIn video script with professional framing

Deliver it as a single document, labelled clearly by platform. Clients who receive this kind of structured package are far more likely to retain you on a monthly basis than clients who get one script at a time.

## Common mistakes to avoid

**Starting the adaptation after approval** — plan for five outputs from day one, not as an afterthought once the main script is approved. The brief shapes all five versions.

**Using the same hook everywhere** — a hook that earns attention on YouTube will not stop a scroll on TikTok. Each platform hook needs to be written for that platform specifically.

**Skipping the LinkedIn version** — most freelancers default to YouTube, TikTok, and Reels and ignore LinkedIn. For B2B clients, LinkedIn video is often the highest-value format in the package.

**Delivering five separate files** — one clean, clearly labelled document is easier for clients to act on and easier for you to manage when revisions come in.

Scribtly generates platform-specific scripts from a single brief — YouTube, TikTok, Reels, Shorts, and LinkedIn — using your client's saved voice profile. Instead of writing five first drafts from scratch, you start with five calibrated outputs and spend your time on the refinements that only a human writer can make.`,
  },
];

async function main() {
  console.log("Seeding blog posts...");

  for (const post of posts) {
    const existing = await prisma.blogPost.findUnique({ where: { slug: post.slug } });
    if (existing) {
      console.log(`  ↩  skipped (exists): ${post.slug}`);
      continue;
    }

    await prisma.blogPost.create({ data: post });
    console.log(`  ✓  created: ${post.slug}`);
  }

  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
