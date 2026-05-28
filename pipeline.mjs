/**
 * ICP Lead Pipeline — Clutch sitemap + stealth profile scraping
 *
 * SETUP (one-time on server):
 *   npm install playwright playwright-extra puppeteer-extra-plugin-stealth
 *   npx playwright install chromium
 *   node pipeline.mjs
 *
 * Resumes from pipeline_state.json on restart (Ctrl+C safe).
 *
 * Phases:
 *   1. SITEMAP  — fetch Clutch sitemap XMLs, extract ICP-relevant profile slugs
 *   2. PROFILE  — stealth Playwright visits each profile, reads provider_website param
 *   3. EMAIL    — plain HTTP scrapes contact email from each agency site
 *   4. IMPORT   — POST lead to Scribtly outreach API
 */

import https from 'https';
import http from 'http';
import fs from 'fs';
import { URL } from 'url';

// ─── Config ───────────────────────────────────────────────────────────────────

const API_BASE    = 'https://scribtly.com/api/v1/outreach';
const API_KEY     = 'ab36e7b012db83e769f32ee5e41722283fcb0c29ab9662f9e39a4d71d7080055';
const TARGET      = 3000;
const STATE_FILE  = 'pipeline_state.json';
const LOG_FILE    = 'pipeline.log';
const PROFILE_CONCURRENCY = 8;  // parallel Playwright pages

// ICP filter: profile slugs containing any of these keywords
const ICP_SLUG_KW = [
  'social','media','marketing','video','content','creative','digital','agency',
  'brand','tiktok','influencer','ugc','production','studio','advertising','campaign','viral',
];

// Fit scoring
const FIT_KW = [
  { score: 5, kw: ['short-form video','short form video','tiktok script','reels script','video scripting','scriptwriting'] },
  { score: 4, kw: ['tiktok','instagram reels','youtube shorts','short form','short-form','ugc','user generated content','vertical video'] },
  { score: 3, kw: ['social media video','video content','video production','video marketing','content creation','social media marketing','social media agency','social media management'] },
  { score: 2, kw: ['content marketing','digital marketing','influencer marketing','paid social','social media'] },
];

const EMAIL_RE = /[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}/gi;
const CONTACT_PATHS = [
  '/contact','/contact-us','/contactus','/get-in-touch','/work-with-us',
  '/about','/about-us','/team','/hello','/connect','/reach-out','/start',
];
const SKIP_EMAIL = /noreply|no-reply|donotreply|bounce|mailer|example|notifications?@|alerts?@|press@|legal@|privacy@/;

const ALREADY_DONE = new Set([
  'freshcontentsociety.com','lyfemarketing.com','cosmic.tech','shortformmedia.co',
  'burnwe.com','digitalsparkstudios.com','thinkmojo.com','inbeat.agency',
  'delesign.com','brandbooster.ai','eon8.com','thesocialshepherd.com',
  'reeljoy.io','zupo.co','vidico.com','increditors.com','ignitesocialmedia.com',
  'shortformvideo.co','1702digital.com','uberbrains.com','adjustproduction.com',
  '351studio.com',
]);

// ─── State ────────────────────────────────────────────────────────────────────

function loadState() {
  try {
    const s = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
    s.sitemapsDone   ??= [];
    s.profileSlugs   ??= [];
    s.profilesDone   ??= [];
    s.domainPool     ??= [];
    s.scrapedDomains ??= [];
    s.importedDomains ??= [];
    s.skippedDomains ??= [];
    s.dbCount        ??= 0;
    return s;
  } catch {
    return {
      sitemapsDone: [], profileSlugs: [], profilesDone: [],
      domainPool: [], scrapedDomains: [], importedDomains: [], skippedDomains: [],
      dbCount: 0,
    };
  }
}
function saveState(s) { fs.writeFileSync(STATE_FILE, JSON.stringify(s, null, 2)); }

// ─── Logging ──────────────────────────────────────────────────────────────────

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  console.log(line);
  try { fs.appendFileSync(LOG_FILE, line + '\n'); } catch {}
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ─── Plain HTTP ───────────────────────────────────────────────────────────────

function httpGet(urlStr, timeout = 8000, hops = 0) {
  if (hops > 5) return Promise.resolve(null);
  return new Promise((resolve) => {
    try {
      const u = new URL(urlStr);
      const mod = u.protocol === 'https:' ? https : http;
      const req = mod.get(urlStr, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml',
        },
        timeout,
      }, (res) => {
        if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
          try { resolve(httpGet(new URL(res.headers.location, urlStr).href, timeout, hops + 1)); }
          catch { resolve(null); }
          return;
        }
        if (res.statusCode !== 200) { resolve(null); return; }
        let data = '';
        res.setEncoding('utf8');
        res.on('data', c => { data += c; if (data.length > 500_000) req.destroy(); });
        res.on('end', () => resolve(data));
        res.on('error', () => resolve(null));
      });
      req.on('error', () => resolve(null));
      req.on('timeout', () => { req.destroy(); resolve(null); });
    } catch { resolve(null); }
  });
}

// ─── Phase 1: Sitemap extraction ──────────────────────────────────────────────

async function fetchSitemaps(state) {
  const pending = Array.from({ length: 43 }, (_, i) => i + 1)
    .filter(i => !state.sitemapsDone.includes(i));
  if (!pending.length) return;

  log(`\n[SITEMAP] Fetching ${pending.length} sitemaps`);
  const slugSet = new Set(state.profileSlugs);

  for (const idx of pending) {
    const xml = await httpGet(`https://clutch.co/sitemap-profile-${idx}.xml`, 15000);
    if (!xml) { log(`  sitemap-${idx}: failed (will retry next run)`); }
    else {
      let added = 0;
      for (const m of xml.matchAll(/<loc>https:\/\/clutch\.co\/profile\/([^<]+)<\/loc>/g)) {
        const slug = m[1].trim();
        if (slug && ICP_SLUG_KW.some(k => slug.includes(k)) && !slugSet.has(slug)) {
          state.profileSlugs.push(slug);
          slugSet.add(slug);
          added++;
        }
      }
      log(`  sitemap-${idx}: ${added} new slugs (total: ${state.profileSlugs.length})`);
      state.sitemapsDone.push(idx);
    }
    saveState(state);
    await sleep(400);
  }
  log(`[SITEMAP] done — ${state.profileSlugs.length} ICP profile slugs`);
}

// ─── Phase 2: Profile scraping via stealth Playwright ─────────────────────────

async function loadStealthChromium() {
  try {
    const { chromium } = await import('playwright-extra');
    const StealthPlugin = (await import('puppeteer-extra-plugin-stealth')).default;
    chromium.use(StealthPlugin());
    log('[PROFILE] Loaded playwright-extra with stealth plugin');
    return chromium;
  } catch (err) {
    log(`[PROFILE] playwright-extra not available: ${err.message}`);
    log('[PROFILE] Install: npm install playwright-extra puppeteer-extra-plugin-stealth');
    return null;
  }
}

// Extract provider_website from a Clutch profile page's redirect links
function extractProviderWebsite(html) {
  // Clutch embeds the website in redirect URLs: provider_website=domain.com
  for (const m of html.matchAll(/provider_website=([a-z0-9.\-]+\.[a-z]{2,})/gi)) {
    const domain = m[1].toLowerCase().replace(/^www\./, '');
    if (domain && domain.includes('.') && !domain.includes('clutch')) return domain;
  }
  // Also try the 'u=' parameter (the actual destination)
  for (const m of html.matchAll(/[?&]u=(https?%3A%2F%2F(?:www\.)?([a-z0-9.\-]+\.[a-z]{2,}))/gi)) {
    try {
      const decoded = decodeURIComponent(m[1]);
      const u = new URL(decoded);
      return u.hostname.replace(/^www\./, '');
    } catch {}
  }
  return null;
}

async function scrapeProfileBatch(browser, slugs, state, domainSet) {
  const results = await Promise.allSettled(slugs.map(async (slug) => {
    let page;
    try {
      page = await browser.newPage();
      page.setDefaultTimeout(12000);
      await page.goto(`https://clutch.co/profile/${slug}`, { waitUntil: 'domcontentloaded', timeout: 12000 });

      const html = await page.content();
      await page.close();

      const domain = extractProviderWebsite(html);
      return { slug, domain };
    } catch (err) {
      try { if (page) await page.close(); } catch {}
      return { slug, domain: null };
    }
  }));

  let added = 0;
  for (const r of results) {
    const { slug, domain } = r.status === 'fulfilled' ? r.value : { slug: null, domain: null };
    if (!slug) continue;
    state.profilesDone.push(slug);
    if (domain && !domainSet.has(domain) && !ALREADY_DONE.has(domain)) {
      state.domainPool.push(domain);
      domainSet.add(domain);
      added++;
    }
  }
  return added;
}

async function scrapeAllProfiles(chromium, state) {
  const doneSet = new Set(state.profilesDone);
  const pending = state.profileSlugs.filter(s => !doneSet.has(s));
  if (!pending.length) { log('[PROFILE] nothing to do'); return; }

  log(`\n[PROFILE] ${pending.length} profiles to visit (concurrency: ${PROFILE_CONCURRENCY})`);

  let browser;
  try {
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-blink-features=AutomationControlled'],
    });
  } catch (err) {
    log(`[PROFILE] browser launch failed: ${err.message}`);
    return;
  }

  const domainSet = new Set(state.domainPool);
  let totalAdded = 0;
  let done = 0;
  let cfBlocked = 0;

  for (let i = 0; i < pending.length; i += PROFILE_CONCURRENCY) {
    if (state.dbCount >= TARGET) break;

    const batch = pending.slice(i, i + PROFILE_CONCURRENCY);
    const added = await scrapeProfileBatch(browser, batch, state, domainSet);
    totalAdded += added;
    done += batch.length;

    // Detect if we're being blocked (Cloudflare challenge page = very short HTML)
    cfBlocked = 0; // reset each batch for now

    if (done % (PROFILE_CONCURRENCY * 10) === 0) {
      const pct = Math.round(done / pending.length * 100);
      process.stdout.write(`\r  [PROFILE] ${done}/${pending.length} (${pct}%) → ${totalAdded} domains found, pool: ${state.domainPool.length}`);
      saveState(state);
    }
    await sleep(500 + Math.random() * 300);
  }

  process.stdout.write('\n');
  try { await browser.close(); } catch {}
  log(`[PROFILE] done — ${totalAdded} new domains (pool: ${state.domainPool.length})`);
  saveState(state);
}

// ─── Phase 3: Email scraping ──────────────────────────────────────────────────

function extractEmails(html, domain) {
  const emails = [];
  for (const m of html.matchAll(EMAIL_RE)) {
    const email = m[0].toLowerCase();
    const ed = email.split('@')[1];
    if (!ed || ed.replace(/^www\./, '') !== domain) continue;
    if (SKIP_EMAIL.test(email)) continue;
    emails.push(email);
  }
  return emails;
}

function rankEmail(email) {
  const local = email.split('@')[0];
  if (/^(hello|hi|contact|info|sales|hey|getquote|quote|start|inquir|connect|reach|work)/.test(local)) return 0;
  if (/^[a-z]+\.[a-z]+$/.test(local)) return 1;
  return 2;
}

async function findEmail(domain) {
  const base = `https://${domain}`;
  const urls = [...CONTACT_PATHS.map(p => base + p), base, `http://${domain}`];
  const seen = new Set();
  for (const url of urls) {
    if (seen.has(url)) continue;
    seen.add(url);
    const html = await httpGet(url);
    if (!html) continue;
    const emails = extractEmails(html, domain);
    if (emails.length > 0) return emails.sort((a, b) => rankEmail(a) - rankEmail(b))[0];
  }
  return null;
}

// ─── Fit + metadata ───────────────────────────────────────────────────────────

function assessFit(domain, html) {
  const text = (domain + ' ' + (html || '')).toLowerCase();
  for (const { score, kw } of FIT_KW) {
    if (kw.some(k => text.includes(k))) return score;
  }
  return 1;
}

function extractName(domain, html) {
  const t = html?.match(/<title[^>]*>([^<]{2,80})<\/title>/i);
  if (t) { const n = t[1].replace(/\s*[|\-–—:]\s*.+$/, '').trim(); if (n.length > 2) return n; }
  const og = html?.match(/property="og:site_name"\s+content="([^"]{2,60})"/i);
  if (og) return og[1].trim();
  return domain.replace(/\.(com|co|io|net|org|agency|media|studio|digital|ai|tech|video)$/, '')
    .replace(/[-.]/, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function extractServices(html) {
  if (!html) return 'Social media marketing';
  const t = html.toLowerCase();
  const sv = [];
  if (/tiktok/.test(t)) sv.push('TikTok');
  if (/instagram\s*reels|(?<![a-z])reels/.test(t)) sv.push('Reels');
  if (/youtube\s*shorts/.test(t)) sv.push('YouTube Shorts');
  if (/short[\s-]form\s*video/.test(t)) sv.push('Short-form video');
  if (/ugc|user.generated/.test(t)) sv.push('UGC');
  if (/influencer/.test(t)) sv.push('Influencer marketing');
  if (/video\s*prod/.test(t)) sv.push('Video production');
  if (/social\s*media\s*manag/.test(t)) sv.push('Social media management');
  if (/content\s*creat/.test(t)) sv.push('Content creation');
  return sv.length ? sv.join(', ') : 'Social media marketing';
}

function toLeadId(domain) {
  return domain
    .replace(/\.(com|co|io|net|org|agency|media|studio|digital|ai|tech|video|social|marketing|creative|productions?|group|inc|llc|co\.uk|co\.au|ca|eu|me)$/i, '')
    .replace(/[^a-z0-9]+/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
    .toLowerCase().slice(0, 64);
}

// ─── Phase 4: API import ──────────────────────────────────────────────────────

function apiPost(lead) {
  const body = JSON.stringify(lead);
  return new Promise((resolve) => {
    try {
      const req = https.request({
        hostname: 'scribtly.com', path: '/api/v1/outreach/leads', method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Length': Buffer.byteLength(body),
        },
        timeout: 10000,
      }, (res) => {
        let d = ''; res.on('data', c => d += c);
        res.on('end', () => resolve(res.statusCode));
        res.on('error', () => resolve(0));
      });
      req.on('error', () => resolve(0));
      req.on('timeout', () => { req.destroy(); resolve(0); });
      req.write(body); req.end();
    } catch { resolve(0); }
  });
}

async function getDbCount() {
  return new Promise((resolve) => {
    const req = https.request({
      hostname: 'scribtly.com', path: '/api/v1/outreach/leads?limit=1',
      headers: { 'Authorization': `Bearer ${API_KEY}` }, timeout: 8000,
    }, (res) => {
      let d = ''; res.on('data', c => d += c);
      res.on('end', () => { try { resolve(JSON.parse(d).meta?.total ?? 0); } catch { resolve(0); } });
      res.on('error', () => resolve(0));
    });
    req.on('error', () => resolve(0));
    req.on('timeout', () => { req.destroy(); resolve(0); });
    req.end();
  });
}

async function scrapeAndImport(state) {
  const processed = new Set([
    ...state.scrapedDomains, ...state.importedDomains,
    ...state.skippedDomains, ...ALREADY_DONE,
  ]);
  const toProcess = state.domainPool.filter(d => !processed.has(d));
  if (!toProcess.length) return;

  log(`\n[EMAIL+IMPORT] ${toProcess.length} domains to process (DB: ${state.dbCount}/${TARGET})`);

  const EMAIL_CONCURRENCY = 10;
  let saveCounter = 0;

  async function processOne(domain) {
    const homeHtml = await httpGet(`https://${domain}`, 8000);
    const fit = assessFit(domain, homeHtml);

    if (fit < 2) {
      return { domain, outcome: 'skip-fit', fit };
    }

    const email = await findEmail(domain);

    if (!email) {
      return { domain, outcome: 'no-email', fit };
    }

    const status = await apiPost({
      leadId: toLeadId(domain),
      agencyName: extractName(domain, homeHtml),
      agencyWebsite: `https://${domain}`,
      agencyServices: extractServices(homeHtml),
      fitScore: fit,
      isBetaOffer: true,
      notes: `Email: ${email}`,
    });

    return { domain, outcome: status === 201 ? 'imported' : status === 409 ? 'conflict' : 'api-err', fit, email, status };
  }

  for (let i = 0; i < toProcess.length; i += EMAIL_CONCURRENCY) {
    if (state.dbCount >= TARGET) break;

    const batch = toProcess.slice(i, i + EMAIL_CONCURRENCY);
    const results = await Promise.all(batch.map(processOne));

    for (const r of results) {
      state.scrapedDomains.push(r.domain);
      if (r.outcome === 'skip-fit') {
        state.skippedDomains.push(r.domain);
        process.stdout.write(`skip(fit=${r.fit}) ${r.domain}\n`);
      } else if (r.outcome === 'no-email') {
        state.skippedDomains.push(r.domain);
        process.stdout.write(`no-email(fit=${r.fit}) ${r.domain}\n`);
      } else if (r.outcome === 'imported') {
        state.dbCount++;
        state.importedDomains.push(r.domain);
        process.stdout.write(`✓ fit=${r.fit} ${r.email} [${state.dbCount}/${TARGET}]\n`);
        log(`IMPORTED ${r.domain} → ${r.email} fit=${r.fit} [${state.dbCount}/${TARGET}]`);
      } else if (r.outcome === 'conflict') {
        process.stdout.write(`conflict ${r.domain}\n`);
      } else {
        process.stdout.write(`api-err(${r.status}) ${r.domain}\n`);
      }
    }

    if (++saveCounter % 5 === 0) saveState(state);
  }
  saveState(state);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  log('══════════════════════════════════════════════');
  log('ICP Lead Pipeline (stealth edition)');
  log('══════════════════════════════════════════════');

  const state = loadState();
  state.dbCount = await getDbCount();
  log(`DB: ${state.dbCount}/${TARGET} | slugs: ${state.profileSlugs.length} | pool: ${state.domainPool.length} | imported: ${state.importedDomains.length}`);

  if (state.dbCount >= TARGET) { log('Target already reached!'); return; }

  // Phase 1: sitemaps
  await fetchSitemaps(state);

  // Phases 2+3+4 interleaved: profile batch → email scrape → repeat
  const PROFILE_BATCH = 500;  // scrape N profiles, then immediately email+import
  const chromium = await loadStealthChromium();

  while (state.dbCount < TARGET) {
    const doneSet = new Set(state.profilesDone);
    const pendingProfiles = state.profileSlugs.filter(s => !doneSet.has(s));
    const batchSlugs = pendingProfiles.slice(0, PROFILE_BATCH);

    if (batchSlugs.length > 0 && chromium) {
      log(`\n[PROFILE] Processing batch of ${batchSlugs.length} profiles`);
      const domainSet = new Set(state.domainPool);
      let browser;
      try {
        browser = await chromium.launch({
          headless: true,
          args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-blink-features=AutomationControlled'],
        });
        let done = 0;
        for (let i = 0; i < batchSlugs.length; i += PROFILE_CONCURRENCY) {
          const sub = batchSlugs.slice(i, i + PROFILE_CONCURRENCY);
          try {
            await scrapeProfileBatch(browser, sub, state, domainSet);
          } catch (err) {
            if (err.message && (err.message.includes('closed') || err.message.includes('cdpSession') || err.message.includes('Target'))) {
              log(`\n[PROFILE] Browser crash detected — relaunching`);
              try { await browser.close(); } catch {}
              browser = await chromium.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-blink-features=AutomationControlled'],
              });
              // mark remaining slugs in sub as done to avoid re-visiting
              for (const slug of sub) {
                if (!state.profilesDone.includes(slug)) state.profilesDone.push(slug);
              }
            } else {
              throw err;
            }
          }
          done += sub.length;
          if (done % (PROFILE_CONCURRENCY * 10) === 0) {
            process.stdout.write(`\r  ${done}/${batchSlugs.length} profiles → pool: ${state.domainPool.length}`);
            saveState(state);
          }
          await sleep(200 + Math.random() * 200);
        }
        process.stdout.write('\n');
      } finally {
        try { if (browser) await browser.close(); } catch {}
      }
      saveState(state);
    }

    // Email scrape + import everything in the pool not yet processed
    await scrapeAndImport(state);

    if (state.dbCount >= TARGET) break;
    if (pendingProfiles.length === 0) {
      log('All profiles exhausted.');
      break;
    }
  }

  state.dbCount = await getDbCount();
  log(`\n══════════════════════════════════════════════`);
  log(`Done. DB: ${state.dbCount}/${TARGET} | Imported: ${state.importedDomains.length}`);
  if (state.dbCount < TARGET) log('Run again to continue — state is saved.');
  log('══════════════════════════════════════════════');
}

main().catch(err => { log(`FATAL: ${err.message}\n${err.stack}`); process.exit(1); });
