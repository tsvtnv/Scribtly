import { describe, it, expect, vi, afterEach } from "vitest";
import { getGeoFromIp } from "../geo";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("getGeoFromIp", () => {
  it("returns geo data for a valid IP", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ country: "United Kingdom", city: "London", region: "England" }),
    } as Response);

    const result = await getGeoFromIp("1.2.3.4");
    expect(result).toEqual({ country: "United Kingdom", city: "London", region: "England" });
  });

  it("returns null when response is not ok", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
    } as Response);

    const result = await getGeoFromIp("1.2.3.4");
    expect(result).toBeNull();
  });

  it("returns null on fetch failure", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("network error"));
    const result = await getGeoFromIp("1.2.3.4");
    expect(result).toBeNull();
  });

  it("returns null for localhost IPs", async () => {
    const result = await getGeoFromIp("127.0.0.1");
    expect(result).toBeNull();
  });

  it("handles null city and region from API", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ country: "United States", city: null, region: null }),
    } as Response);

    const result = await getGeoFromIp("1.2.3.4");
    expect(result).toEqual({ country: "United States", city: null, region: null });
  });
});
