"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import EHealthTransaction from "@/contracts/EHealthTransaction.json";

interface PageProps {
  params: Promise<{ username: string }>;
}

const contractAddress = process.env.NEXT_PUBLIC_YOUR_DEPLOYED_CONTRACT_ADDRESS || "";

const Demands: React.FC<PageProps> = ({ params }: PageProps) => {
  const { username } = React.use(params);
  const [demands, setDemands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDemands();
  }, []);

  const fetchDemands = async () => {
    if (!(window as any).ethereum) {
      alert("MetaMask is not installed! Please install MetaMask.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, EHealthTransaction.abi, signer);
      const demandCount = await contract.demandCount();

      const demandsArray = [];
      for (let i = 1; i <= demandCount; i++) {
        const demand = await contract.demands(i);
        if (!demand.exists || demand.hospitalName !== username) continue;

        const labTests = JSON.parse(demand.labTests || "[]");
        const patientFormHash = labTests.find((test: any) => test.ipfsHash)?.ipfsHash || "";
        const filteredLabTests = labTests.filter((test: any) => !test.ipfsHash).map((test: any) => test.name || test);

        demandsArray.push({
          id: i,
          hospitalName: demand.hospitalName,
          patientName: demand.patientName,
          dob: demand.dateofbirth,
          age: demand.age,
          pharmacyUsername: demand.pharmacyUsername,
          pathologyLabUsername: demand.pathologyLabUsername,
          prescribedMedicines: demand.prescribedMedicines,
          labTests: filteredLabTests,
          patientFormHash,
          isPharmacyApproved: demand.isPharmacyApproved,
          isLabApproved: demand.isLabApproved,
          pharmacyReportHash: demand.pharmacyReportHash,
          pathologyReportHash: demand.pathologyReportHash,
        });
      }

      setDemands(demandsArray);
      setLoading(false);
    } catch (error: any) {
      console.log("Error fetching demands:", error.message);
      alert("Failed to fetch demands. Please check MetaMask.");
    }
  };

  const deleteDemand = async (id: number) => {
    if (!(window as any).ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, EHealthTransaction.abi, signer);

      const tx = await contract.deleteDemand(id);
      await tx.wait();

      alert(`Demand ${id} deleted successfully!`);
      fetchDemands();
    } catch (error) {
      console.error("Error deleting demand:", error);
      alert("Failed to delete demand.");
    }
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#f5f8fa", minHeight: "100vh", fontFamily: "Segoe UI, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#222", fontSize: "26px", marginBottom: "30px" }}>
        Blockchain-Generated Demands
      </h2>
      {loading ? (
        <p style={{ textAlign: "center", fontSize: 16 }}>Loading...</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 4px 16px rgba(0,0,0,0.05)" }}>
            <thead>
              <tr style={{ backgroundColor: "#0070f3", color: "#fff" }}>
                {["ID", "Hospital", "Patient", "DOB", "Age", "Pharmacy", "Pathology Lab", "Medicines", "Lab Tests", "Patient Form", "Pharmacy Approved", "Lab Approved", "Pharmacy Report", "Pathology Report", "Actions"].map((head) => (
                  <th key={head} style={{ padding: "12px", fontSize: "14px", border: "1px solid #ddd" }}>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {demands.map((demand) => (
                <tr key={demand.id} style={{ transition: "background 0.3s", backgroundColor: "#fff" }}>
                  <td style={cellStyle}>{demand.id}</td>
                  <td style={cellStyle}>{demand.hospitalName}</td>
                  <td style={cellStyle}>{demand.patientName}</td>
                  <td style={cellStyle}>{demand.dob}</td>
                  <td style={cellStyle}>{demand.age}</td>
                  <td style={cellStyle}>{demand.pharmacyUsername}</td>
                  <td style={cellStyle}>{demand.pathologyLabUsername}</td>
                  <td style={cellStyle}>{demand.prescribedMedicines}</td>
                  <td style={cellStyle}>{demand.labTests.join(", ")}</td>
                  <td style={cellStyle}>{demand.patientFormHash ? (<a href={`https://dweb.link/ipfs/${demand.patientFormHash}`} target="_blank" rel="noopener noreferrer">View</a>) : "Pending"}</td>
                  <td style={cellStyle}>{demand.isPharmacyApproved ? "✅" : "❌"}</td>
                  <td style={cellStyle}>{demand.isLabApproved ? "✅" : "❌"}</td>
                  <td style={cellStyle}>{demand.pharmacyReportHash ? (<a href={`https://ipfs.io/ipfs/${demand.pharmacyReportHash}`} target="_blank" rel="noopener noreferrer">View</a>) : "Pending"}</td>
                  <td style={cellStyle}>{demand.pathologyReportHash ? (<a href={`https://ipfs.io/ipfs/${demand.pathologyReportHash}`} target="_blank" rel="noopener noreferrer">View</a>) : "Pending"}</td>
                  <td style={cellStyle}><button onClick={() => deleteDemand(demand.id)} style={{ backgroundColor: "#ff4d4f", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontSize: "13px" }}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const cellStyle = { padding: "10px", fontSize: "14px", border: "1px solid #ddd", textAlign: "center" as const };

export default Demands;
