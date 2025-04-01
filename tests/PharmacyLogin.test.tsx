import { render, screen, fireEvent, act } from "@testing-library/react";
import HospitalLogin from "@/app/pharmacy/forgot/page";
import React from "react";
import { describe, it, expect, vi } from "vitest";

// Mock `x_val` and `z_val` functions
vi.mock("@/app/pharmacy/login/submit", () => ({
  x_val: vi.fn((username) => Promise.resolve(username.trim().toLowerCase() === "validuser")),
  z_val: vi.fn((username, password) => Promise.resolve(username === "validUser" && password === "correctPassword")),
}));

describe("HospitalLogin", () => {
  it("renders the login form", async () => {
    await act(async () => {
      render(<HospitalLogin />);
    });

    expect(await screen.findByText("Change Password")).toBeTruthy();
    expect(await screen.findByPlaceholderText("Username")).toBeTruthy();
    expect(await screen.findByText("Login")).toBeTruthy();
  });

  it("shows error when username does not exist", async () => {
    await act(async () => {
      render(<HospitalLogin />);
    });

    await act(async () => {
      fireEvent.change(await screen.findByPlaceholderText("Username"), { target: { value: "invalidUser" } });
      fireEvent.click(await screen.findByText("Login"));
    });

    expect(await screen.findByText("Username doesn't exist...")).toBeVisible();
  });

  it("shows password fields when username exists", async () => {
    await act(async () => {
      render(<HospitalLogin />);
    });

    await act(async () => {
      fireEvent.change(await screen.findByPlaceholderText("Username"), { target: { value: "validUser" } });
      fireEvent.click(await screen.findByText("Login"));
    });

    expect(await screen.findByPlaceholderText("Enter Password")).toBeVisible();
    expect(await screen.findByPlaceholderText("Re-Enter Password")).toBeVisible();
  });

  it("shows error for password mismatch", async () => {
    await act(async () => {
      render(<HospitalLogin />);
    });

    await act(async () => {
      fireEvent.change(await screen.findByPlaceholderText("Username"), { target: { value: "validUser" } });
      fireEvent.click(await screen.findByText("Login"));
    });

    expect(await screen.findByPlaceholderText("Enter Password")).toBeVisible();

    await act(async () => {
      fireEvent.change(await screen.findByPlaceholderText("Enter Password"), { target: { value: "password1" } });
      fireEvent.change(await screen.findByPlaceholderText("Re-Enter Password"), { target: { value: "password2" } });
      fireEvent.click(await screen.findByText("Change"));
    });

    expect(await screen.findByText("Password mismatch...")).toBeVisible();
  });

  it("redirects on successful password change", async () => {
    // Mock window.location.href to prevent actual navigation
    delete (window as any).location;
    (window as any).location = { href: "" } as Location;

    await act(async () => {
      render(<HospitalLogin />);
    });

    await act(async () => {
      fireEvent.change(await screen.findByPlaceholderText("Username"), { target: { value: "validUser" } });
      fireEvent.click(await screen.findByText("Login"));
    });

    expect(await screen.findByPlaceholderText("Enter Password")).toBeVisible();

    await act(async () => {
      fireEvent.change(await screen.findByPlaceholderText("Enter Password"), { target: { value: "correctPassword" } });
      fireEvent.change(await screen.findByPlaceholderText("Re-Enter Password"), { target: { value: "correctPassword" } });
      fireEvent.click(await screen.findByText("Change"));
    });

    expect(window.location.href).toBe("/pharmacy/login");
  });
});
