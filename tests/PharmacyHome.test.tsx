import { render, screen, act } from "@testing-library/react";
import Home from "@/app/pharmacy/[username]/page";
import { describe, it, expect, vi } from "vitest";
import { notFound } from "next/navigation";

// Mock `notFound` function
vi.mock("next/navigation", () => ({
  notFound: vi.fn(),
}));

describe("Pharmacy Home Component", () => {
  it("renders correctly with a valid username", async () => {
    await act(async () => {
      render(<Home params={Promise.resolve({ username: "pharmacy123" })} />);
    });

    expect(await screen.findByText("Pharmacy Dashboard")).toBeVisible();
    expect(await screen.findByText("Profile")).toBeVisible();
    expect(await screen.findByText("View Bills")).toBeVisible();
    expect(screen.getAllByText("Click To Visit")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Click To Visit")[1]).toBeInTheDocument();
  });

  it("redirects to notFound when username is missing", async () => {
    await act(async () => {
      render(<Home params={Promise.resolve({ username: "" })} />);
    });

    expect(notFound).toHaveBeenCalled();
  });

  it("has correct profile link", async () => {
    await act(async () => {
      render(<Home params={Promise.resolve({ username: "pharmacy123" })} />);
    });

    const profileLink = screen.getAllByText("Click To Visit")[0].closest("a");
    expect(profileLink).toHaveAttribute("href", "/pharmacy/profile/pharmacy123");
  });

  it("has correct view bills link", async () => {
    await act(async () => {
      render(<Home params={Promise.resolve({ username: "pharmacy123" })} />);
    });

    const viewBillsLink = screen.getAllByText("Click To Visit")[1].closest("a");
    expect(viewBillsLink).toHaveAttribute("href", "/pharmacy/view_bills/pharmacy123");
  });
});
