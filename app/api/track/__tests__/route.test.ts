import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    referralLead: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    referralEvent: {
      create: vi.fn(),
    },
  },
}));

vi.mock("@/lib/geo", () => ({
  getGeoFromIp: vi.fn().mockResolvedValue({ country: "UK", city: "London", region: "England" }),
}));

import { POST } from "../route";
import { prisma } from "@/lib/prisma";

const mockLead = {
  leadId: "lead_001",
  firstVisitAt: null,
  totalVisits: 0,
  totalTimeOnSiteSeconds: 0,
  country: null,
  signupFormStartedAt: null,
  onboardingStartedAt: null,
  signedUp: false,
};

describe("POST /api/track", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (prisma.referralLead.findUnique as ReturnType<typeof vi.fn>).mockResolvedValue(mockLead);
    (prisma.referralLead.update as ReturnType<typeof vi.fn>).mockResolvedValue(mockLead);
    (prisma.referralEvent.create as ReturnType<typeof vi.fn>).mockResolvedValue({});
  });

  it("returns 400 for missing leadId", async () => {
    const req = new Request("http://localhost/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventType: "page_view" }),
    });
    const res = await POST(req as any);
    expect(res.status).toBe(400);
  });

  it("returns 200 for valid page_view event", async () => {
    const req = new Request("http://localhost/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": "1.2.3.4" },
      body: JSON.stringify({ leadId: "lead_001", eventType: "page_view", page: "/ref/lead_001", metadata: {} }),
    });
    const res = await POST(req as any);
    expect(res.status).toBe(200);
    expect(prisma.referralEvent.create).toHaveBeenCalled();
  });

  it("returns 200 silently for unknown leadId", async () => {
    (prisma.referralLead.findUnique as ReturnType<typeof vi.fn>).mockResolvedValue(null);
    const req = new Request("http://localhost/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadId: "unknown", eventType: "page_view", page: "/ref/unknown", metadata: {} }),
    });
    const res = await POST(req as any);
    expect(res.status).toBe(200);
    expect(prisma.referralEvent.create).not.toHaveBeenCalled();
  });
});
