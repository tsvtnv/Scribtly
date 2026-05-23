# Outreach API Design Spec

**Date:** 2026-04-18
**Author:** Kristiyan / Scribtly
**Status:** Approved for implementation

---

## Overview

A machine-friendly REST API under `/api/v1/outreach` that gives an AI agent (or any external client) full CRUD access to the outreach leads system, the ability to send emails via Resend, and summary stats. Protected by a single bearer token (`OUTREACH_API_KEY`).

---

## Authentication

Every request must include:
```
Authorization: Bearer <OUTREACH_API_KEY>
```

Validated in `lib/outreachApiAuth.ts`:
- Reads `process.env.OUTREACH_API_KEY`
- Compares with `Authorization` header value (constant-time comparison via `crypto.timingSafeEqual`)
- Returns `{ ok: true }` or `{ ok: false, response: NextResponse(401) }`
- If `OUTREACH_API_KEY` is not set in env, all requests return 503 (misconfigured)

No cookies, no sessions, no HMAC timestamps. Simple bearer token.

---

## Base Path

All routes: `/api/v1/outreach/...`

Middleware must allow `/api/v1/outreach` as a public path (auth is handled inside the route handlers, not by Lucia middleware).

---

## Endpoints

### `GET /api/v1/outreach/leads`

List leads with filtering, sorting, and pagination.

**Query params:**
| Param | Type | Description |
|---|---|---|
| `page` | number | Page number, default 1 |
| `limit` | number | Results per page, default 20, max 100 |
| `status` | OutreachStatus | Filter by outreach status |
| `contactMethod` | ContactMethod | Filter by contact method |
| `signedUp` | `"true"` \| `"false"` | Filter by signup status |
| `isBetaOffer` | `"true"` \| `"false"` | Filter by beta offer flag |
| `country` | string | Filter by country |
| `fitScore` | 1–5 | Filter by fit score |
| `sortBy` | string | Field to sort by (default: `createdAt`) |
| `sortDir` | `"asc"` \| `"desc"` | Sort direction (default: `desc`) |

**Response:**
```json
{
  "data": [
    {
      "leadId": "lead_001",
      "agencyName": "Social Boost Agency",
      "agencyWebsite": "https://example.com",
      "agencyLocation": "London, UK",
      "agencyServices": "TikTok,short-form video",
      "fitScore": 5,
      "outreachStatus": "NOT_CONTACTED",
      "contactMethod": null,
      "contactedAt": null,
      "signedUp": false,
      "isBetaOffer": false,
      "country": null,
      "totalVisits": 0,
      "createdAt": "2026-04-18T12:00:00.000Z",
      "updatedAt": "2026-04-18T12:00:00.000Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 47,
    "totalPages": 3
  }
}
```

---

### `GET /api/v1/outreach/leads/:leadId`

Get a single lead by `leadId` with full detail including events.

**Response:**
```json
{
  "data": {
    "leadId": "lead_001",
    "agencyName": "Social Boost Agency",
    "agencyWebsite": "https://example.com",
    "agencyLocation": "London, UK",
    "agencyServices": "TikTok,short-form video",
    "fitScore": 5,
    "outreachStatus": "CONTACTED_VIA_EMAIL",
    "contactMethod": "RESEND_EMAIL",
    "contactedAt": "2026-04-18T12:00:00.000Z",
    "contactFormUrl": null,
    "contactFormConfirmation": null,
    "resendMessageId": "abc123",
    "messageSubject": "Quick idea for your client script workflow",
    "messageBody": "Hi Social Boost team...",
    "sourceSearchQuery": "TikTok agency UK",
    "sourceResultUrl": "https://example.com",
    "emailDelivered": true,
    "emailBounced": false,
    "emailOpenedAt": null,
    "emailClickedAt": null,
    "firstVisitAt": null,
    "lastVisitAt": null,
    "totalVisits": 0,
    "totalTimeOnSiteSeconds": 0,
    "ipAddress": null,
    "country": null,
    "city": null,
    "region": null,
    "browser": null,
    "os": null,
    "deviceType": null,
    "signedUp": false,
    "signedUpAt": null,
    "isBetaOffer": false,
    "optedOut": false,
    "notes": null,
    "createdAt": "2026-04-18T12:00:00.000Z",
    "updatedAt": "2026-04-18T12:00:00.000Z",
    "events": [
      {
        "id": "evt_001",
        "eventType": "page_view",
        "page": "/ref/lead_001",
        "metadata": null,
        "createdAt": "2026-04-18T13:00:00.000Z"
      }
    ]
  }
}
```

**Errors:**
- `404` if leadId not found

---

### `POST /api/v1/outreach/leads`

Create a new lead.

**Body:**
```json
{
  "leadId": "lead_002",
  "agencyName": "Wave Media",
  "agencyWebsite": "https://wavemedia.co.uk",
  "agencyLocation": "Manchester, UK",
  "agencyServices": "Instagram,TikTok",
  "fitScore": 4,
  "sourceSearchQuery": "Instagram agency Manchester",
  "sourceResultUrl": "https://wavemedia.co.uk",
  "notes": "Found via search, strong TikTok focus",
  "isBetaOffer": false
}
```

**Required fields:** `leadId`, `agencyName`

**Response:** `201` with full lead object in `data`.

**Errors:**
- `409` if `leadId` already exists
- `400` if required fields missing

---

### `PATCH /api/v1/outreach/leads/:leadId`

Partial update of any writable field on a lead.

**Body:** Any subset of lead fields. Only provided fields are updated.

```json
{
  "fitScore": 5,
  "notes": "Updated after checking their portfolio",
  "isBetaOffer": true,
  "outreachStatus": "NEEDS_MANUAL_REVIEW"
}
```

**Response:** `200` with updated lead object in `data`.

**Errors:**
- `404` if leadId not found
- `400` if validation fails (e.g. invalid enum value)

**Non-writable via PATCH** (these are set by system actions only):
- `signedUp`, `signedUpAt`, `clerkUserId`, `workspaceId`
- `emailDelivered`, `emailBounced`, `emailOpenedAt`, `emailClickedAt` (set by webhook)
- `firstVisitAt`, `lastVisitAt`, `totalVisits`, `totalTimeOnSiteSeconds` (set by tracker)
- `events` (append-only via tracker)

---

### `POST /api/v1/outreach/leads/bulk`

Upsert multiple leads in one call. Uses `leadId` as the upsert key — if a lead with that `leadId` already exists, it is updated; otherwise created.

**Body:**
```json
{
  "leads": [
    {
      "leadId": "lead_003",
      "agencyName": "Bright Social",
      "agencyServices": "YouTube",
      "fitScore": 3
    },
    {
      "leadId": "lead_004",
      "agencyName": "TikTok Masters",
      "agencyServices": "TikTok",
      "fitScore": 5
    }
  ]
}
```

**Limits:** Max 50 leads per call.

**Response:**
```json
{
  "data": {
    "upserted": 2,
    "created": 1,
    "updated": 1,
    "leadIds": ["lead_003", "lead_004"]
  }
}
```

**Errors:**
- `400` if array exceeds 50 items or any lead is missing required fields
- Individual lead failures do not abort the batch — errors are reported per-lead in a `errors` array

---

### `POST /api/v1/outreach/leads/:leadId/contact`

Log that a lead was contacted without sending an email (e.g. for contact form submissions).

**Body:**
```json
{
  "contactMethod": "WEBSITE_FORM",
  "messageSubject": "Quick idea for your client script workflow",
  "messageBody": "Hi Wave Media team...",
  "contactFormUrl": "https://wavemedia.co.uk/contact",
  "contactFormConfirmation": "Thanks for your message!",
  "isBetaOffer": true
}
```

**Required fields:** `contactMethod`, `messageBody`

Sets on the lead:
- `contactedAt = now`
- `outreachStatus` → `CONTACTED_VIA_FORM` or `CONTACTED_VIA_EMAIL` or stays at current (based on `contactMethod`)
- All provided fields

**Response:** `200` with updated lead in `data`.

---

### `POST /api/v1/outreach/leads/:leadId/send-email`

Send the outreach email via Resend **and** log everything in one atomic call.

**Body:**
```json
{
  "to": "hello@wavemedia.co.uk",
  "subject": "Quick idea for your client script workflow",
  "body": "Hi Wave Media team...\n\nscribtly.com/ref/lead_002\n\nIf not relevant, reply 'no thanks'.",
  "isBetaOffer": false
}
```

**Required fields:** `to`, `subject`, `body`

Server actions:
1. Sends email via Resend: `from: Kristiyan@scribtly.com`, `replyTo: Kristiyan@scribtly.com`
2. Updates the lead:
   - `contactMethod = RESEND_EMAIL`
   - `contactedAt = now`
   - `outreachStatus = CONTACTED_VIA_EMAIL`
   - `resendMessageId` = Resend message ID
   - `messageSubject`, `messageBody` stored
   - `isBetaOffer` updated if provided

**Response:**
```json
{
  "data": {
    "ok": true,
    "resendMessageId": "abc123def456"
  }
}
```

**Errors:**
- `404` if leadId not found
- `502` if Resend send fails (includes Resend error message)
- `409` if lead already has `outreachStatus != NOT_CONTACTED` (prevents double-sending) — can be overridden with `"force": true` in body

---

### `GET /api/v1/outreach/stats`

Summary statistics across all leads.

**Response:**
```json
{
  "data": {
    "total": 47,
    "contacted": 23,
    "emailDelivered": 20,
    "emailOpened": 8,
    "visited": 12,
    "signedUp": 3,
    "conversionRate": 6.38,
    "byStatus": {
      "NOT_CONTACTED": 24,
      "CONTACTED_VIA_EMAIL": 18,
      "CONTACTED_VIA_FORM": 5,
      "SKIPPED_DUPLICATE": 3,
      "NEEDS_MANUAL_REVIEW": 2,
      "FAILED": 1
    }
  }
}
```

---

## Error Format

All errors follow:
```json
{
  "error": "Human-readable message",
  "code": "MACHINE_CODE"
}
```

Error codes:
| Code | HTTP Status | Meaning |
|---|---|---|
| `UNAUTHORIZED` | 401 | Missing or invalid API key |
| `NOT_FOUND` | 404 | Lead not found |
| `CONFLICT` | 409 | leadId already exists / already contacted |
| `VALIDATION_ERROR` | 400 | Invalid body / missing required fields |
| `SEND_FAILED` | 502 | Resend API error |
| `MISCONFIGURED` | 503 | OUTREACH_API_KEY not set in env |

---

## lib/outreachApiAuth.ts

```typescript
import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";

export function verifyOutreachApiKey(req: NextRequest): 
  | { ok: true } 
  | { ok: false; response: NextResponse } {
  const apiKey = process.env.OUTREACH_API_KEY;
  
  if (!apiKey) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "API not configured", code: "MISCONFIGURED" },
        { status: 503 }
      ),
    };
  }

  const authHeader = req.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") 
    ? authHeader.slice(7) 
    : null;

  if (!token) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Missing Authorization header", code: "UNAUTHORIZED" },
        { status: 401 }
      ),
    };
  }

  const provided = Buffer.from(token);
  const expected = Buffer.from(apiKey);

  // Pad to same length for timingSafeEqual
  const maxLen = Math.max(provided.length, expected.length);
  const a = Buffer.concat([provided, Buffer.alloc(maxLen - provided.length)]);
  const b = Buffer.concat([expected, Buffer.alloc(maxLen - expected.length)]);

  const valid = provided.length === expected.length && timingSafeEqual(a, b);

  if (!valid) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Invalid API key", code: "UNAUTHORIZED" },
        { status: 401 }
      ),
    };
  }

  return { ok: true };
}
```

---

## Middleware

Add `/api/v1` to the public paths list in `middleware.ts` so Lucia auth doesn't intercept it. Auth is handled inside each route handler.

---

## File Structure

```
app/api/v1/outreach/
  leads/
    route.ts                    # GET (list), POST (create)
    bulk/
      route.ts                  # POST (bulk upsert)
    [leadId]/
      route.ts                  # GET (single), PATCH (update)
      contact/
        route.ts                # POST (log contact)
      send-email/
        route.ts                # POST (send + log)
  stats/
    route.ts                    # GET (stats)
lib/
  outreachApiAuth.ts            # Bearer token verifier
```

---

## Environment Variables

Add to `.env`:
```
OUTREACH_API_KEY=<generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
```

---

## Security Notes

- `timingSafeEqual` prevents timing attacks on key comparison
- No rate limiting needed for now (AI agent will self-throttle)
- `/api/v1` added to middleware public paths — Lucia session middleware skipped, auth done in handlers
- `messageBody` stored as-is — no sanitisation needed (internal admin system only)
- IP addresses and personal data already stored by existing tracker; this API does not add new PII storage

---

## Out of Scope

- Multiple API keys / per-key permissions
- Key rotation UI
- Request logging / audit trail
- Webhook delivery to external URLs
- Rate limiting
