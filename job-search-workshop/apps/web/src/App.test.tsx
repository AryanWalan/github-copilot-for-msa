import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import App from "./App";

function jsonResponse(body: unknown): Response {
  return {
    ok: true,
    json: async () => body,
  } as Response;
}

describe("App", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows source status and the empty listing state", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        jsonResponse({
          sources: [
            {
              id: "xero",
              name: "Xero",
              careersUrl: "https://careers.xero.com/jobs/",
              endpointUrl: null,
              sourceType: "unverified",
              enabled: false,
              policyStatus: "pending",
            },
          ],
        }),
      )
      .mockResolvedValueOnce(jsonResponse({ listings: [] }))
      .mockResolvedValueOnce(jsonResponse({ run: null }));
    vi.stubGlobal("fetch", fetchMock);

    render(<App />);

    expect(await screen.findByText("No roles found yet")).toBeVisible();
    expect(screen.getByText("Xero")).toBeVisible();
    expect(screen.getByRole("button", { name: "Refresh" })).toBeEnabled();
  });
});
