import { render, screen, fireEvent, act } from "@testing-library/react";
import ManagePatient from "@/app/hospital/manage-patients/page";
import { describe, it, expect, vi } from "vitest";

vi.mock("@/app/hospital/manage-patients/submit", () => ({
  handle: vi.fn(),
  x_val: vi.fn(() => Promise.resolve(true)), 
}));

import { handle, x_val } from "@/app/hospital/manage-patients/submit";

describe("ManagePatient Component", () => {
  it("renders multiple instances correctly", async () => {
    await act(async () => {
      render(
        <>
          <ManagePatient />
          <ManagePatient />
        </>
      );
    });

    const headings = await screen.findAllByText("Add New Patient");
    expect(headings).toHaveLength(4);
    expect(headings[0]).toBeVisible();
    expect(headings[1]).toBeVisible();
    expect(headings[2]).toBeVisible();
    expect(headings[3]).toBeVisible();
  });

  it("shows duplicate patient error in the second form", async () => {
    (x_val as any).mockResolvedValueOnce(false);

    await act(async () => {
      render(
        <>
          <ManagePatient />
        </>
      );
    });

    const nameInputs = await screen.findAllByPlaceholderText("Patient Name");
    const ageInputs = await screen.findAllByPlaceholderText("Age");
    const dobInputs = await screen.findAllByPlaceholderText("Date of Birth");
    const contactInputs = await screen.findAllByPlaceholderText("Enter Contact Number");
    const emailInputs = await screen.findAllByPlaceholderText("Enter Email ID");
    const submitButtons = await screen.findAllByText("Add New Patient");

    await act(async () => {
        fireEvent.change(nameInputs[0], { target: { value: "John Doe" } });
        fireEvent.change(ageInputs[0], { target: { value: "30" } });
        fireEvent.change(dobInputs[0], { target: { value: "1995-06-15" } });
        fireEvent.change(contactInputs[0], { target: { value: "1234567890" } });
        fireEvent.change(emailInputs[0], { target: { value: "johndoe@example.com" } });
        fireEvent.click(submitButtons[1]);
    });

    expect(await screen.findByText("Same details already exist...")).toBeVisible();
  });

  it("calls handle function when the first form is valid", async () => {
    (handle as any).mockClear(); 

    await act(async () => {
      render(
        <>
          <ManagePatient />
        </>
      );
    });

    const nameInputs = await screen.findAllByPlaceholderText("Patient Name");
    const ageInputs = await screen.findAllByPlaceholderText("Age");
    const dobInputs = await screen.findAllByPlaceholderText("Date of Birth");
    const contactInputs = await screen.findAllByPlaceholderText("Enter Contact Number");
    const emailInputs = await screen.findAllByPlaceholderText("Enter Email ID");
    const submitButtons = await screen.findAllByText("Add New Patient");

    await act(async () => {
      fireEvent.change(nameInputs[0], { target: { value: "Jane Smith" } });
      fireEvent.change(ageInputs[0], { target: { value: "28" } });
      fireEvent.change(dobInputs[0], { target: { value: "1997-04-10" } });
      fireEvent.change(contactInputs[0], { target: { value: "9876543210" } });
      fireEvent.change(emailInputs[0], { target: { value: "janesmith@example.com" } });
      fireEvent.click(submitButtons[1]);
    });

    expect(handle).toHaveBeenCalled();
  });
});
