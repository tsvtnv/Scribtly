/**
 * Batch email scraper — reads agency_urls.txt, finds contact emails, outputs emails_found.csv
 * Usage: node batch_email_scraper.mjs
 */
import https from 'https';
import http from 'http';
import fs from 'fs';
import { URL } from 'url';

const EMAIL_RE = /[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}/gi;
const CONTACT_PATHS = [
  '/contact', '/contact-us', '/contactus', '/get-in-touch',
  '/about', '/about-us', '/team', '/hello', '/connect',
  '/reach-out', '/inquiry', '/email',
];

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function fetch(urlStr, timeout = 7000) {
  return new Promise((resolve) => {
    try {
      const u = new URL(urlStr);
      const mod = u.protocol === 'https:' ? https : http;
      const req = mod.get(urlStr, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'text/html,application/xhtml+xml',
        },
        timeout,
      }, (res) => {
        // Follow redirects
        if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
          try {
            const next = new URL(res.headers.location, urlStr).href;
            resolve(fetch(next, timeout));
          } catch { resolve(null); }
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

function extractEmails(html, domain) {
  const found = new Set();
  const matches = html.matchAll(EMAIL_RE);
  for (const m of matches) {
    const email = m[0].toLowerCase();
    const emailDomain = email.split('@')[1];
    if (emailDomain && emailDomain.replace(/^www\./, '') === domain.replace(/^www\./, '')) {
      found.add(email);
    }
  }
  return found;
}

async function findEmail(startUrl) {
  let base, domain;
  try {
    const u = new URL(startUrl);
    base = `${u.protocol}//${u.host}`;
    domain = u.hostname.replace(/^www\./, '');
  } catch { return null; }

  // Check contact pages first, then homepage
  const toCheck = [
    ...CONTACT_PATHS.map(p => base + p),
    startUrl,
  ];

  const seen = new Set();
  for (const url of toCheck) {
    if (seen.has(url)) continue;
    seen.add(url);

    const html = await fetch(url);
    if (!html) continue;

    const emails = extractEmails(html, domain);
    if (emails.size > 0) {
      return [...emails][0];
    }
  }
  return null;
}

async function main() {
  const urlsFile = 'agency_urls.txt';
  const outputFile = 'emails_found.csv';

  const lines = fs.readFileSync(urlsFile, 'utf8').split('\n');
  const urls = lines
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('#'));

  console.log(`Processing ${urls.length} URLs...\n`);

  const results = [];
  for (let i = 0; i < urls.length; i++) {
    const raw = urls[i];
    const url = raw.startsWith('http') ? raw : `https://${raw}`;
    const domain = url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0];

    process.stdout.write(`[${i + 1}/${urls.length}] ${domain} ... `);
    const email = await findEmail(url);
    console.log(email || 'NOT_FOUND');

    results.push({ url, domain, email: email || '' });
    await sleep(400);
  }

  const found = results.filter(r => r.email);
  console.log(`\nFound ${found.length}/${results.length} emails.`);

  const csv = ['url,domain,email', ...results.map(r =>
    `"${r.url}","${r.domain}","${r.email}"`
  )].join('\n');
  fs.writeFileSync(outputFile, csv, 'utf8');
  console.log(`Saved to ${outputFile}`);
}

main().catch(console.error);
