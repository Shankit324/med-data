import { render, screen, fireEvent, act } from "@testing-library/react";
import ManageLab from "@/app/hospital/manage-lab/page";
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/app/hospital/manage-lab/submit", () => {
  return {
    handle: vi.fn(),
    x_val: vi.fn(() => Promise.resolve(true)), 
  };
});

import { handle, x_val } from "@/app/hospital/manage-lab/submit";

describe("ManageLab Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders multiple instances correctly", async () => {
    await act(async () => {
      render(
        <>
          <ManageLab />
          <ManageLab />
        </>
      );
    });

    const headings = await screen.findAllByText("Manage Pathology Labs");
    expect(headings).toHaveLength(2);
    expect(headings[0]).toBeVisible();
    expect(headings[1]).toBeVisible();
  });

  it("shows password mismatch error in the first form", async () => {
    await act(async () => {
      render(
        <>
          <ManageLab />
        </>
      );
    });

    const passwordInputs = await screen.findAllByPlaceholderText("Enter Password");
    const confirmPasswordInputs = await screen.findAllByPlaceholderText("Re-Enter Password");
    const submitButtons = await screen.findAllByText("Add Lab");

    await act(async () => {
      fireEvent.change(passwordInputs[0], { target: { value: "password123" } });
      fireEvent.change(confirmPasswordInputs[0], { target: { value: "wrongPassword" } });
      fireEvent.click(submitButtons[0]);
    });

    expect(await screen.findByText("Password Mismatch...")).toBeVisible();
  });

  it("shows username already exists error in the second form", async () => {
    (x_val as any).mockResolvedValueOnce(false);

    await act(async () => {
      render(
        <>
          <ManageLab />
        </>
      );
    });

    const usernameInputs = await screen.findAllByPlaceholderText("Username");
    const passwordInputs = await screen.findAllByPlaceholderText("Enter Password");
    const confirmPasswordInputs = await screen.findAllByPlaceholderText("Re-Enter Password");
    const submitButtons = await screen.findAllByText("Add Lab");

    await act(async () => {
      fireEvent.change(usernameInputs[0], { target: { value: "existingLab" } });
      fireEvent.change(passwordInputs[0], { target: { value: "password123" } });
      fireEvent.change(confirmPasswordInputs[0], { target: { value: "password123" } });
      fireEvent.click(submitButtons[0]);
    });

    expect(await screen.findByText("Username or Password already exists...")).toBeVisible();
  });

  it("calls handle function when the first form is valid", async () => {
    (x_val as any).mockResolvedValueOnce(true); 

    await act(async () => {
      render(
        <>
          <ManageLab />
          <ManageLab />
        </>
      );
    });

    const usernameInputs = await screen.findAllByPlaceholderText("Username");
    const passwordInputs = await screen.findAllByPlaceholderText("Enter Password");
    const confirmPasswordInputs = await screen.findAllByPlaceholderText("Re-Enter Password");
    const submitButtons = await screen.findAllByText("Add Lab");

    await act(async () => {
      fireEvent.change(usernameInputs[0], { target: { value: "newLab" } });
      fireEvent.change(passwordInputs[0], { target: { value: "password123" } });
      fireEvent.change(confirmPasswordInputs[0], { target: { value: "password123" } });
      fireEvent.click(submitButtons[0]);
    });

    expect(handle).toHaveBeenCalled(); 
  });
});
