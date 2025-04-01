import { render, screen, act } from "@testing-library/react";
import Home from "@/app/pathology/[username]/page";
import React from "react";
import { describe, it, expect, vi } from "vitest";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(),
}));

describe("Home Component", () => {
  it("renders Hospital Dashboard and sections correctly", async () => {
    await act(async () => {
      render(<Home params={Promise.resolve({ username: "testHospital" })} />);
    });

    expect(await screen.findByText("Lab Dashboard")).toBeVisible();

    const links = await screen.findAllByText("Click To Visit→");

    expect(await screen.findByText("Profile")).toBeVisible();
    let anchorTag = links[0].closest("a");
    expect(anchorTag).toHaveAttribute("href", "/pathology/profile/testHospital");

    expect(await screen.findByText("View Report")).toBeVisible();
    anchorTag = links[1].closest("a");
    expect(anchorTag).toHaveAttribute("href", "/pathology/view_reports/testHospital");
  });

  it("redirects to notFound when username is missing", async () => {
    const { notFound } = await import("next/navigation");

    await act(async () => {
      render(<Home params={Promise.resolve({ username: "" })} />);
    });

    // ✅ Ensure `notFound` was called
    await act(async () => {
      expect(notFound).toHaveBeenCalled();
    });
  });
});
