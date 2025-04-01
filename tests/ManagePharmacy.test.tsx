import { render, screen, fireEvent, act } from "@testing-library/react";
import ManagePharmacy from "@/app/hospital/manage-pharmacy/page";
import { describe, it, expect, vi } from "vitest";

// Mock `handle` and `x_val`
vi.mock("@/app/hospital/manage-pharmacy/submit", () => ({
  handle: vi.fn(),
  x_val: vi.fn(() => Promise.resolve(true)), // Default behavior is `true`
}));

describe("ManagePharmacy Component", () => {
  it("renders correctly", async () => {
    await act(async () => {
      render(<ManagePharmacy />);
    });

    expect(await screen.findByText("Manage Pharmacy")).toBeVisible();
    expect(await screen.findByText("Add New Pharmacy")).toBeVisible();
  });

  it("shows password mismatch error", async () => {
    await act(async () => {
      render(<ManagePharmacy />);
    });

    const passwordInput = screen.getByPlaceholderText("Enter Password");
    const confirmPasswordInput = screen.getByPlaceholderText("Re-Enter Password");
    const submitButton = screen.getByText("Add Pharmacy");

    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "wrongPassword" } });
      fireEvent.click(submitButton);
    });

    expect(await screen.findByText("Password Mismatch...")).toBeVisible();
  });

  it("shows username already exists error", async () => {
    const { x_val } = await import("@/app/hospital/manage-pharmacy/submit");
    (x_val as any).mockResolvedValueOnce(false);

    await act(async () => {
      render(<ManagePharmacy />);
    });

    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Enter Password");
    const confirmPasswordInput = screen.getByPlaceholderText("Re-Enter Password");
    const submitButton = screen.getByText("Add Pharmacy");

    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: "existingPharmacy" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });
      fireEvent.click(submitButton);
    });

    expect(await screen.findByText("Username or Password already exists...")).toBeVisible();
  });

  it("calls handle function when form is valid", async () => {
    const { handle } = await import("@/app/hospital/manage-pharmacy/submit");
    (handle as any).mockClear();

    await act(async () => {
      render(<ManagePharmacy />);
    });

    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Enter Password");
    const confirmPasswordInput = screen.getByPlaceholderText("Re-Enter Password");
    const submitButton = screen.getByText("Add Pharmacy");

    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: "newPharmacy" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });
      fireEvent.click(submitButton);
    });

    expect(handle).toHaveBeenCalled();
  });
});
