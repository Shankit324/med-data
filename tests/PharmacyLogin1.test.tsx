import { render, screen, fireEvent, act } from "@testing-library/react";
import HospitalLogin from "@/app/pharmacy/login/page";
import React from "react";
import { describe, it, expect, vi } from "vitest";

// Mock `x_val` and `y_val` functions
vi.mock("@/app/pathology/login/submit", () => ({
  x_val: vi.fn((username) => Promise.resolve(username === "validUser")),
  y_val: vi.fn((username, password) =>
    Promise.resolve(username === "validUser" && password === "correctPassword")
  ),
}));

describe("HospitalLogin", () => {
  it("renders the login form", async () => {
    await act(async () => {
      render(<HospitalLogin />);
    });

    expect(await screen.findByText("Pharmacy Login")).toBeTruthy();
    expect(await screen.findByPlaceholderText("Username")).toBeTruthy();
    expect(await screen.findByPlaceholderText("Password")).toBeTruthy();
    expect(await screen.findByText("Login")).toBeTruthy();
  });

  it("shows error when username does not exist", async () => {
    await act(async () => {
      render(<HospitalLogin />);
    });

    await act(async () => {
      fireEvent.change(await screen.findByPlaceholderText("Username"), {
        target: { value: "invalidUser" },
      });
      fireEvent.change(await screen.findByPlaceholderText("Password"), {
        target: { value: "anyPassword" },
      });
      fireEvent.click(await screen.findByText("Login"));
    });

    expect(await screen.findByText("Username or password is incorrect...")).toBeVisible();
  });

  it("shows error when password is incorrect", async () => {
    await act(async () => {
      render(<HospitalLogin />);
    });

    await act(async () => {
      fireEvent.change(await screen.findByPlaceholderText("Username"), {
        target: { value: "validUser" },
      });
      fireEvent.change(await screen.findByPlaceholderText("Password"), {
        target: { value: "wrongPassword" },
      });
      fireEvent.click(await screen.findByText("Login"));
    });

    expect(await screen.findByText("Username or password is incorrect...")).toBeVisible();
  });

  it("redirects on successful login", async () => {
    // Mock `window.location.href`
    delete (window as any).location;
    (window as any).location = { href: "" } as Location;

    await act(async () => {
      render(<HospitalLogin />);
    });

    await act(async () => {
      fireEvent.change(await screen.findByPlaceholderText("Username"), { target: { value: "validUser" } });
      fireEvent.change(await screen.findByPlaceholderText("Password"), { target: { value: "correctPassword" } });
      fireEvent.click(await screen.findByText("Login"));
    });

    expect(window.location.href).toBe("/pathology/validUser");
  });  
});
