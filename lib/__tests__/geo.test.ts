import { describe, it, expect, vi } from "vitest";
import { getGeoFromIp } from "../geo";

describe("getGeoFromIp", () => {
  it("returns geo data for a valid IP", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ country: "United Kingdom", city: "London", region: "England" }),
    } as Response);

    const result = await getGeoFromIp("1.2.3.4");
    expect(result).toEqual({ country: "United Kingdom", city: "London", region: "England" });
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
});
