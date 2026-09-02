import request from "supertest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { createApp } from "./app.js";
import { JobFinderRepository } from "./database.js";

describe("job finder API", () => {
  let repository: JobFinderRepository;

  beforeEach(() => {
    repository = new JobFinderRepository(":memory:");
  });

  afterEach(() => {
    repository.close();
  });

  it("reports health and exposes enabled candidate sources", async () => {
    const app = createApp(repository);

    await request(app).get("/api/health").expect(200, { status: "ok" });
    const response = await request(app).get("/api/sources").expect(200);

    expect(response.body.sources).toHaveLength(6);
    expect(
      response.body.sources.every(
        (source: { enabled: boolean }) => source.enabled,
      ),
    ).toBe(true);
  });

  it("starts a background collection run", async () => {
    const responseBody = [
      '<a href="https://careers.xero.com/jobs/f864bae7-8238-4123-9251-24d2e7fd63da/software-engineer/">Software Engineer</a>',
      "<span>US: Remote, Washington, United States</span>",
      '<a href="https://careers.xero.com/jobs/40a09a30-ab3b-4d65-af9b-728b8da13907/customer-incident-manager/">Customer Incident Manager</a>',
      "<span>Parnell, Auckland, New Zealand</span>",
      '<a href="https://www.serko.com/job-listing/principal-engineer-serkoai-auckland-new-zealand"><span>Principal Engineer - Serko.ai</span><span>Auckland, New Zealand</span></a>',
      '<a href="https://www.serko.com/job-listing/principal-engineer-ai-platform-operations-seattle-united-states">Principal Engineer - AI Platform &amp; Operations Seattle, Washington, United States Full-time</a>',
    ].join("");
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockImplementation(() => Promise.resolve(new Response(responseBody))),
    );
    const app = createApp(repository);

    const startResponse = await request(app)
      .post("/api/collection-runs")
      .expect(202);
    expect(startResponse.body.run.status).toBe("running");

    await new Promise((resolve) => setImmediate(resolve));
    await new Promise((resolve) => setImmediate(resolve));
    const latestResponse = await request(app)
      .get("/api/collection-runs/latest")
      .expect(200);

    expect(latestResponse.body.run).toMatchObject({
      status: "completed",
      sourceCount: 6,
      successCount: 6,
      skippedCount: 0,
    });

    const listingsResponse = await request(app)
      .get("/api/listings")
      .expect(200);
    expect(listingsResponse.body.listings).toHaveLength(2);
    expect(listingsResponse.body.listings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: "Customer Incident Manager",
          location: "Parnell, Auckland, New Zealand",
          sourceId: "xero",
        }),
        expect.objectContaining({
          title: "Principal Engineer - Serko.ai",
          location: "Auckland, New Zealand",
          sourceId: "serko",
        }),
      ]),
    );
  });

  it("returns an empty listing collection before a source is enabled", async () => {
    const app = createApp(repository);

    await request(app).get("/api/listings?search=engineer").expect(200, {
      listings: [],
    });
  });

  it("filters and ranks listings by explicitly provided benefits", async () => {
    const app = createApp(repository);
    const source = repository.listSources()[0]!;
    repository.saveListings(source, [
      {
        title: "Benefits-rich role",
        location: null,
        summary: null,
        benefits: "Health insurance, flexible work, and learning budget",
        sourceUrl: "https://example.com/rich",
      },
      {
        title: "Benefits-light role",
        location: null,
        summary: null,
        benefits: "Flexible work",
        sourceUrl: "https://example.com/light",
      },
      {
        title: "Benefits unknown role",
        location: null,
        summary: null,
        benefits: null,
        sourceUrl: "https://example.com/unknown",
      },
    ]);
    const filteredResponse = await request(app)
      .get("/api/listings?benefits=insurance")
      .expect(200);
    expect(filteredResponse.body.listings).toHaveLength(1);
    expect(filteredResponse.body.listings[0]).toMatchObject({
      title: "Benefits-rich role",
      benefits: "Health insurance, flexible work, and learning budget",
    });

    const rankedResponse = await request(app)
      .get("/api/listings?rank=benefits")
      .expect(200);
    expect(rankedResponse.body.listings).toEqual([
      expect.objectContaining({
        title: "Benefits-rich role",
        benefitsScore: 4,
        locationScore: 0,
        matchScore: 2,
        benefitsReasons: [
          "health insurance",
          "flexible work",
          "professional development",
        ],
      }),
      expect.objectContaining({
        title: "Benefits-light role",
        benefitsScore: 1,
        locationScore: 0,
        matchScore: 1,
        benefitsReasons: ["flexible work"],
      }),
      expect.objectContaining({
        title: "Benefits unknown role",
        benefits: null,
        benefitsScore: 0,
        locationScore: 0,
        matchScore: 0,
        benefitsReasons: [],
      }),
    ]);
  });
});
