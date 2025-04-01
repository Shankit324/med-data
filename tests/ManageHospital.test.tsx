import { render, screen, fireEvent, act } from "@testing-library/react";
import ManageHospital from "@/app/hospital/manage-hospital/page";
import { describe, it, expect, vi } from "vitest";

vi.mock("@/app/hospital/manage-hospital/submit", () => ({
  handle: vi.fn(),
  x_val: vi.fn(() => Promise.resolve(true)),
}));

describe("ManageHospital Component", () => {
  it("renders the form fields correctly", async () => {
    await act(async () => {
      render(<ManageHospital />);
    });
    let head = await screen.findAllByText("Manage Hospitals");
    expect(head[0]).toBeVisible();
    expect(await screen.findByText("Add New Hospital")).toBeVisible();

    expect(await screen.findByPlaceholderText("Lab Name")).toBeVisible();
    expect(await screen.findByPlaceholderText("Username")).toBeVisible();
    expect(await screen.findByPlaceholderText("Lab Location")).toBeVisible();
    expect(await screen.findByPlaceholderText("Enter Contact Number")).toBeVisible();
    expect(await screen.findByPlaceholderText("Enter Email ID")).toBeVisible();
    expect(await screen.findByPlaceholderText("Enter Password")).toBeVisible();
    expect(await screen.findByPlaceholderText("Re-Enter Password")).toBeVisible();

    expect(await screen.findByText("Add Hospital")).toBeVisible();
  });

  it("shows password mismatch error", async () => {
    await act(async () => {
      render(<ManageHospital />);
    });

    const passwordInput = await screen.findByPlaceholderText("Enter Password");
    const confirmPasswordInput = await screen.findByPlaceholderText("Re-Enter Password");
    const submitButton = await screen.findByText("Add Hospital");

    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "wrongPassword" } });
      fireEvent.click(submitButton);
    });

    expect(await screen.findByText("Password Mismatch...")).toBeVisible();
  });

  it("shows username already exists error", async () => {
    const { x_val } = await import("@/app/hospital/manage-hospital/submit"); 
    (x_val as any).mockResolvedValueOnce(false); 

    await act(async () => {
      render(<ManageHospital />);
    });

    const usernameInput = await screen.findByPlaceholderText("Username");
    const passwordInput = await screen.findByPlaceholderText("Enter Password");
    const confirmPasswordInput = await screen.findByPlaceholderText("Re-Enter Password");
    const submitButton = await screen.findByText("Add Hospital");

    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: "existingUser" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });
      fireEvent.click(submitButton);
    });

    expect(await screen.findByText("Username or Password already exists...")).toBeVisible();
  });

  it("calls handle function when form is valid", async () => {
    const { x_val, handle } = await import("@/app/hospital/manage-hospital/submit"); 
    (x_val as any).mockResolvedValueOnce(true); 

    await act(async () => {
      render(<ManageHospital />);
    });

    const usernameInput = await screen.findByPlaceholderText("Username");
    const passwordInput = await screen.findByPlaceholderText("Enter Password");
    const confirmPasswordInput = await screen.findByPlaceholderText("Re-Enter Password");
    const submitButton = await screen.findByText("Add Hospital");

    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: "newHospital" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });
      fireEvent.click(submitButton);
    });

    expect(handle).toHaveBeenCalled();
  });
});
