import { render, screen, fireEvent, act } from "@testing-library/react";
import PatientForm from "@/app/hospital/add_report/[username]/page";
import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock "check" function to always return true
vi.mock("@/app/hospital/access", () => ({
  check: vi.fn(() => Promise.resolve(true)),
}));

// Mock getContract function and its behavior
vi.mock("@/utils/blockchain", () => ({
  getContract: vi.fn(() => ({
    createDemand: vi.fn(() => ({
      wait: vi.fn(() => Promise.resolve()),
    })),
  })),
}));

describe("PatientForm", () => {
  beforeEach(async () => {
    await act(async () => {
      render(<PatientForm params={Promise.resolve({ username: "hospital123" })} />);
    });
  });

  it("renders form heading", async () => {
    expect(await screen.findByText("Patient Information Form")).toBeTruthy();
  });

  it("allows adding multiple prescribed medicine fields", async () => {
    const addBtn = await screen.findByText("+ Add Medicine");
    fireEvent.click(addBtn);

    const medicineInputs = await screen.findAllByPlaceholderText("Medicine Name");
    expect(medicineInputs.length).toBe(2);
  });

  it("allows adding pathology lab tests", async () => {
    const addBtn = await screen.findByText("+ Add Lab Test");
    fireEvent.click(addBtn);

    const testInputs = await screen.findAllByPlaceholderText("Test Name");
    expect(testInputs.length).toBe(2);
  });

  it("submits the form with valid data", async () => {
    // Ensure the form is fully loaded
    await screen.findByText("Patient Information Form");

    // Fill form fields
    fireEvent.change(await screen.findByPlaceholderText("Patient Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(await screen.findByPlaceholderText("Age"), {
      target: { value: "30" },
    });
    fireEvent.change(await screen.findByPlaceholderText("Date of Birth"), {
      target: { value: "1994-01-01" },
    });
    fireEvent.change(await screen.findByPlaceholderText("Describe the patient's disease..."), {
      target: { value: "Fever and cough" },
    });
    fireEvent.change(await screen.findByPlaceholderText("Pharmacy Username"), {
      target: { value: "pharma001" },
    });

    fireEvent.change(await screen.findByPlaceholderText("Medicine Name"), {
      target: { value: "Paracetamol" },
    });
    fireEvent.change(await screen.findByPlaceholderText("Dosage per day"), {
      target: { value: "2" },
    });
    fireEvent.change(await screen.findByPlaceholderText("Number of days"), {
      target: { value: "5" },
    });

    fireEvent.change(await screen.findByPlaceholderText("Pathology Lab Username"), {
      target: { value: "lab001" },
    });
    fireEvent.change(await screen.findByPlaceholderText("Test Name"), {
      target: { value: "Blood Test" },
    });

    // Submit the form
    const submitButton = await screen.findByText("Submit");
    fireEvent.click(submitButton);

    // Wait for async operations to complete
    await new Promise((resolve) => setTimeout(resolve, 100));
  });
});
