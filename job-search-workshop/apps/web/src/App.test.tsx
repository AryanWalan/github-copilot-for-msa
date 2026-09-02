import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
    cleanup();
    vi.unstubAllGlobals();
  });

  it("shows source status and the empty listing state", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ listings: [] }))
      .mockResolvedValueOnce(jsonResponse({ run: null }));
    vi.stubGlobal("fetch", fetchMock);

    render(<App />);

    expect(await screen.findByText("No roles found yet")).toBeVisible();
    expect(screen.getByRole("button", { name: "Refresh" })).toBeEnabled();
  });

  it("submits a preferred role ranking choice", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ listings: [] }))
      .mockResolvedValueOnce(jsonResponse({ run: null }))
      .mockResolvedValueOnce(jsonResponse({ listings: [] }));
    vi.stubGlobal("fetch", fetchMock);

    render(<App />);
    await screen.findByText("No roles found yet");
    const user = userEvent.setup();
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Preferred role" }),
      "platform",
    );
    await user.click(screen.getByRole("button", { name: "Search" }));

    expect(fetchMock).toHaveBeenLastCalledWith(
      "/api/listings?rank=benefits&role=platform",
      undefined,
    );
  });
});
