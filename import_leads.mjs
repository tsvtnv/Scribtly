/**
 * Imports scraped agency leads into the Scribtly outreach DB.
 * Usage: node import_leads.mjs
 */

const API_BASE = 'https://scribtly.com/api/v1/outreach';
const API_KEY = 'ab36e7b012db83e769f32ee5e41722283fcb0c29ab9662f9e39a4d71d7080055';

const leads = [
  {
    leadId: 'freshcontentsociety',
    agencyName: 'Fresh Content Society',
    agencyWebsite: 'https://freshcontentsociety.com',
    agencyServices: 'Social media content, short-form video, TikTok, Reels',
    fitScore: 4,
    notes: 'Email: sales@freshcontentsociety.com',
    isBetaOffer: true,
  },
  {
    leadId: 'lyfemarketing',
    agencyName: 'LYFE Marketing',
    agencyWebsite: 'https://lyfemarketing.com',
    agencyServices: 'Social media management, short-form video, TikTok ads',
    fitScore: 4,
    notes: 'Email: info@lyfemarketing.com',
    isBetaOffer: true,
  },
  {
    leadId: 'cosmic-tech',
    agencyName: 'Cosmic',
    agencyWebsite: 'https://cosmic.tech',
    agencyServices: 'Content marketing, social media',
    fitScore: 3,
    notes: 'Email: hello@cosmic.tech',
    isBetaOffer: true,
  },
  {
    leadId: 'shortformmedia',
    agencyName: 'Short Form Media',
    agencyWebsite: 'https://shortformmedia.co',
    agencyServices: 'Short-form video production, TikTok, Reels, YouTube Shorts',
    fitScore: 5,
    notes: 'Email: info@shortformmedia.co',
    isBetaOffer: true,
  },
  {
    leadId: 'burnwe',
    agencyName: 'BurnWe',
    agencyWebsite: 'https://burnwe.com',
    agencyServices: 'Social media content, short-form video',
    fitScore: 3,
    notes: 'Email: rob.gevorgyan@burnwe.com',
    isBetaOffer: true,
  },
  {
    leadId: 'digitalsparkstudios',
    agencyName: 'Digital Spark Studios',
    agencyWebsite: 'https://digitalsparkstudios.com',
    agencyServices: 'Digital marketing, social media content',
    fitScore: 3,
    notes: 'Email: contact@digitalsparkstudios.com',
    isBetaOffer: true,
  },
  {
    leadId: 'thinkmojo',
    agencyName: 'ThinkMojo',
    agencyWebsite: 'https://thinkmojo.com',
    agencyServices: 'Video production, social media video content',
    fitScore: 4,
    notes: 'Email: hello@thinkmojo.com',
    isBetaOffer: true,
  },
  {
    leadId: 'inbeat',
    agencyName: 'inBeat Agency',
    agencyWebsite: 'https://inbeat.agency',
    agencyServices: 'Influencer marketing, TikTok, short-form video, UGC',
    fitScore: 4,
    notes: 'Email: hello@inbeat.agency',
    isBetaOffer: true,
  },
  {
    leadId: 'delesign',
    agencyName: 'Delesign',
    agencyWebsite: 'https://delesign.com',
    agencyServices: 'Unlimited design and content subscription, social media assets',
    fitScore: 3,
    notes: 'Email: sales@delesign.com',
    isBetaOffer: true,
  },
  {
    leadId: 'brandbooster',
    agencyName: 'BrandBooster AI',
    agencyWebsite: 'https://brandbooster.ai',
    agencyServices: 'AI-powered social media content, short-form video',
    fitScore: 3,
    notes: 'Email: support@brandbooster.ai',
    isBetaOffer: true,
  },
  {
    leadId: 'eon8',
    agencyName: 'Eon8',
    agencyWebsite: 'https://eon8.com',
    agencyServices: 'Digital marketing, social media',
    fitScore: 3,
    notes: 'Email: info@eon8.com',
    isBetaOffer: true,
  },
  {
    leadId: 'thesocialshepherd',
    agencyName: 'The Social Shepherd',
    agencyWebsite: 'https://thesocialshepherd.com',
    agencyServices: 'Social media marketing, short-form video, TikTok, Reels',
    fitScore: 4,
    notes: 'Email: hello@thesocialshepherd.com',
    isBetaOffer: true,
  },
  {
    leadId: 'reeljoy',
    agencyName: 'ReelJoy',
    agencyWebsite: 'https://reeljoy.io',
    agencyServices: 'Short-form video production, Reels, TikTok scripting',
    fitScore: 5,
    notes: 'Email: kay@reeljoy.io',
    isBetaOffer: true,
  },
  {
    leadId: 'zupo',
    agencyName: 'Zupo',
    agencyWebsite: 'https://zupo.co',
    agencyServices: 'SEO, content marketing, social media',
    fitScore: 2,
    notes: 'Email: info@zupo.co',
    isBetaOffer: true,
  },
  {
    leadId: 'vidico',
    agencyName: 'Vidico',
    agencyWebsite: 'https://vidico.com',
    agencyServices: 'Video production, social media video, explainer videos',
    fitScore: 4,
    notes: 'Email: hello@vidico.com',
    isBetaOffer: true,
  },
  {
    leadId: 'increditors',
    agencyName: 'Increditors',
    agencyWebsite: 'https://increditors.com',
    agencyServices: 'Short-form video editing, TikTok, Reels, YouTube Shorts at scale',
    fitScore: 5,
    notes: 'Email: hey@increditors.com',
    isBetaOffer: true,
  },
  {
    leadId: 'ignitesocialmedia',
    agencyName: 'Ignite Social Media',
    agencyWebsite: 'https://ignitesocialmedia.com',
    agencyServices: 'Social media marketing, short-form video, community management',
    fitScore: 4,
    notes: 'Email: info@ignitesocialmedia.com',
    isBetaOffer: true,
  },
  {
    leadId: 'shortformvideo',
    agencyName: 'Short Form Video Co',
    agencyWebsite: 'https://shortformvideo.co',
    agencyServices: 'Short-form video production and strategy, TikTok, Reels, Shorts',
    fitScore: 5,
    notes: 'Email: hello@shortformvideo.co',
    isBetaOffer: true,
  },
  {
    leadId: '1702digital',
    agencyName: '1702 Digital',
    agencyWebsite: 'https://1702digital.com',
    agencyServices: 'Digital marketing, social media, content creation',
    fitScore: 3,
    notes: 'Email: solutions@1702digital.com',
    isBetaOffer: true,
  },
  {
    leadId: 'uberbrains',
    agencyName: 'UberBrains',
    agencyWebsite: 'https://uberbrains.com',
    agencyServices: 'Content marketing, social media',
    fitScore: 3,
    notes: 'Email: info@uberbrains.com',
    isBetaOffer: true,
  },
  {
    leadId: 'adjustproduction',
    agencyName: 'Adjust Production',
    agencyWebsite: 'https://adjustproduction.com',
    agencyServices: 'Video production, social media video content',
    fitScore: 4,
    notes: 'Email: getquote@adjustproduction.com',
    isBetaOffer: true,
  },
];

async function postLead(lead) {
  const res = await fetch(`${API_BASE}/leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(lead),
  });
  const json = await res.json();
  return { status: res.status, json };
}

async function main() {
  console.log(`Importing ${leads.length} leads...\n`);
  let created = 0;
  let skipped = 0;
  let errors = 0;

  for (const lead of leads) {
    process.stdout.write(`  ${lead.leadId} ... `);
    const { status, json } = await postLead(lead);
    if (status === 201) {
      console.log('✓ created');
      created++;
    } else if (status === 409) {
      console.log('skip (already exists)');
      skipped++;
    } else {
      console.log(`ERROR ${status}: ${JSON.stringify(json)}`);
      errors++;
    }
    await new Promise(r => setTimeout(r, 200));
  }

  console.log(`\nDone. Created: ${created}, Skipped: ${skipped}, Errors: ${errors}`);
}

main().catch(console.error);
