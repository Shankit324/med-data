"use client";

import React, { useState } from "react";
import { getContract } from "@/utils/blockchain";
import { check } from "@/app/hospital/access";
import axios from "axios";

interface PageProps {
  params: Promise<{ username: string }>;
}

const PatientForm: React.FC<PageProps> = async ({ params }: PageProps) => {
  const { username } = React.use(params);

  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    dob: "",
    diseaseDescription: "",
    pharmacyUsername: "",
    pathologyUsername: "",
    prescribedMedicines: [{ name: "", dosage: "", days: "" }],
    labTests: [""],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string,
    index?: number
  ) => {
    if (index !== undefined) {
      const updatedArray = [...(formData[field as keyof typeof formData] as any[])];
      if (typeof updatedArray[index] === "string") {
        updatedArray[index] = e.target.value;
      } else {
        updatedArray[index] = { ...updatedArray[index], [e.target.name]: e.target.value };
      }
      setFormData({ ...formData, [field]: updatedArray });
    } else {
      setFormData({ ...formData, [field]: e.target.value });
    }
  };

  const addMedicine = () => {
    setFormData({
      ...formData,
      prescribedMedicines: [...formData.prescribedMedicines, { name: "", dosage: "", days: "" }],
    });
  };

  const addLabTest = () => {
    setFormData({
      ...formData,
      labTests: [...formData.labTests, ""],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const valid = await check(
      username,
      formData.pharmacyUsername,
      formData.pathologyUsername,
      formData.patientName,
      formData.dob
    );
    if (valid) {
      const jsonBlob = new Blob([JSON.stringify(formData)], { type: "application/json" });

      const fileData = new FormData();
      fileData.append("file", jsonBlob, "patient_form.json");

      const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", fileData, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const ipfsHash = response.data.IpfsHash;
      console.log("Uploaded to IPFS:", ipfsHash);

      const updatedLabTests = [...formData.labTests, { ipfsHash }];

      const prescribedMedicinesStr = JSON.stringify(formData.prescribedMedicines);
      const labTestsStr = JSON.stringify(updatedLabTests);

      try {
        const contract = await getContract();
        if (!contract) return;

        const tx = await contract.createDemand(
          username,
          formData.patientName,
          formData.dob,
          formData.age,
          formData.pharmacyUsername,
          formData.pathologyUsername,
          prescribedMedicinesStr,
          labTestsStr
        );
        await tx.wait();
        alert("Demand successfully created!");
        window.location.href = `/hospital/view_report/${username}`;
      } catch (error) {
        alert("Transaction failed...Try again...");
        console.error("Transaction Failed:", error);
      }
    } else {
      alert("Either patient, hospital, pathology lab or pharmacy detail is incorrect...");
      window.location.href = `/hospital/add_report/${username}`;
    }
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "30px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        background: "#f9f9f9",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Patient Information Form
      </h2>

      <form onSubmit={handleSubmit}>
        <label>Patient Name:</label>
        <input
          type="text"
          placeholder="Patient Name"
          value={formData.patientName}
          onChange={(e) => handleChange(e, "patientName")}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <label>Age:</label>
        <input
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={(e) => handleChange(e, "age")}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <label>Date of Birth:</label>
        <input
          type="date"
          placeholder="Date of Birth"
          value={formData.dob}
          onChange={(e) => handleChange(e, "dob")}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <label>Disease Description:</label>
        <textarea
          placeholder="Describe the patient's disease..."
          value={formData.diseaseDescription}
          onChange={(e) => handleChange(e, "diseaseDescription")}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <h3>Pharmacy Section</h3>
        <label>Pharmacy Username:</label>
        <input
          type="text"
          placeholder="Pharmacy Username"
          value={formData.pharmacyUsername}
          onChange={(e) => handleChange(e, "pharmacyUsername")}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <h4>Prescribed Medicines</h4>
        <h5>Enter "none" in all fields if nothing to be prescribed</h5>
        {formData.prescribedMedicines.map((med, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "10px",
              flexWrap: "wrap",
            }}
          >
            <input
              type="text"
              name="name"
              placeholder="Medicine Name"
              value={med.name}
              onChange={(e) => handleChange(e, "prescribedMedicines", index)}
              required
              style={{ flex: "1", padding: "8px" }}
            />
            <input
              type="text"
              name="dosage"
              placeholder="Dosage per day"
              value={med.dosage}
              onChange={(e) => handleChange(e, "prescribedMedicines", index)}
              required
              style={{ flex: "1", padding: "8px" }}
            />
            <input
              type="text"
              name="days"
              placeholder="Number of days"
              value={med.days}
              onChange={(e) => handleChange(e, "prescribedMedicines", index)}
              required
              style={{ flex: "1", padding: "8px" }}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addMedicine}
          style={{ marginBottom: "20px", padding: "8px 12px", cursor: "pointer" }}
        >
          + Add Medicine
        </button>

        <h3>Pathology Lab Section</h3>
        <label>Pathology Lab Username:</label>
        <input
          type="text"
          placeholder="Pathology Lab Username"
          value={formData.pathologyUsername}
          onChange={(e) => handleChange(e, "pathologyUsername")}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <h4>Pathology Lab Tests</h4>
        <h5>Enter "none" in all fields if nothing to be prescribed</h5>
        {formData.labTests.map((test, index) => (
          <input
            key={index}
            type="text"
            placeholder="Test Name"
            value={test}
            onChange={(e) => handleChange(e, "labTests", index)}
            required
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />
        ))}
        <button
          type="button"
          onClick={addLabTest}
          style={{ marginBottom: "20px", padding: "8px 12px", cursor: "pointer" }}
        >
          + Add Lab Test
        </button>

        <button
          type="submit"
          style={{
            backgroundColor: "#0070f3",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PatientForm;
