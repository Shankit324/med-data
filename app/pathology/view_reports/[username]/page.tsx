"use client";

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import EHealthTransaction from "@/contracts/EHealthTransaction.json";
import { notFound } from "next/navigation";
import axios from "axios";

const contractAddress = process.env.NEXT_PUBLIC_YOUR_DEPLOYED_CONTRACT_ADDRESS || "";

interface PageProps {
  params: Promise<{ username: string }>;
}

const FulfillDemandsPage: React.FC<PageProps> = ({ params }: PageProps) => {
  const { username } = React.use(params);
  if (!username) return notFound();

  const [demands, setDemands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<{ [key: number]: File }>({});

  useEffect(() => {
    fetchDemands();
  }, []);

  const fetchDemands = async () => {
    if (!(window as any).ethereum) return alert("MetaMask not detected!");

    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, EHealthTransaction.abi, signer);
      const demandCount = await contract.demandCount();

      const allDemands = [];
      for (let i = 1; i <= demandCount; i++) {
        const d = await contract.demands(i);
        if (!d.exists) continue;
        if (d.pathologyLabUsername === username) {
          allDemands.push({ id: i, ...d });
        }
      }

      setDemands(allDemands);
      setLoading(false);
    } catch (error) {
      console.log("Failed to fetch demands:", error);
    }
  };

  const handleFileChange = (demandId: number, file: File) => {
    setSelectedFiles((prev) => ({ ...prev, [demandId]: file }));
  };

  const handleApprove = async (demandId: number) => {
    const file = selectedFiles[demandId];
    if (!file) return alert("Please select a file first.");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
          "Content-Type": "multipart/form-data"
        },
      });

      const fileHash = response.data.IpfsHash;
      console.log("Uploaded to IPFS:", fileHash);

      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, EHealthTransaction.abi, signer);

      const tx = await contract.approveLab(demandId, fileHash);
      await tx.wait();
      alert("Approval recorded on blockchain!");
      fetchDemands();
    } catch (error) {
      console.error("Approval error:", error);
      alert("Something went wrong during approval.");
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Segoe UI, sans-serif", backgroundColor: "#f5f8fa", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", marginBottom: "25px", fontSize: "26px", color: "#222" }}>Pathology Lab Dashboard</h1>

      {loading ? (
        <p style={{ textAlign: "center", fontSize: "16px" }}>Loading demands...</p>
      ) : demands.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "16px" }}>No demands for username: {username}</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
          }}>
            <thead>
              <tr style={{ backgroundColor: "rgb(56, 87, 241)", color: "#fff" }}>
                {[
                  "ID", "Hospital", "Patient", "DOB", "Age", "Lab Tests",
                  "Status", "Upload & Approve", "Uploaded File"
                ].map((head) => (
                  <th key={head} style={{
                    padding: "12px",
                    border: "1px solid #ddd",
                    fontWeight: "bold",
                    textAlign: "center"
                  }}>
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {demands.map((demand) => (
                <tr key={demand.id} style={{ textAlign: "center", borderBottom: "1px solid #ddd" }}>
                  <td style={cellStyle}>{demand.id}</td>
                  <td style={cellStyle}>{demand[0]}</td>
                  <td style={cellStyle}>{demand[1]}</td>
                  <td style={cellStyle}>{demand[2]}</td>
                  <td style={cellStyle}>{demand[3]}</td>
                  <td style={cellStyle}>{JSON.stringify(JSON.parse(demand[7] || "[]").filter((test: any) => !test.ipfsHash).map((test: any) => test.name || test))}</td>
                  <td style={cellStyle}>{demand[9] ? "✅ Approved" : "❌ Pending"}</td>
                  <td style={cellStyle}>
                    <input
                      type="file"
                      onChange={(e) =>
                        handleFileChange(demand.id, e.target.files?.[0] as File)
                      }
                      disabled={demand[9]}
                      style={{ marginBottom: "8px" }}
                    />
                    <br />
                    <button
                      onClick={() => handleApprove(demand.id)}
                      disabled={demand[9]}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: demand[9] ? "#ccc" : "#28a745",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: demand[9] ? "not-allowed" : "pointer",
                        fontSize: "13px"
                      }}
                    >
                      Approve
                    </button>
                  </td>
                  <td style={cellStyle}>
                    {demand[9] ? (
                      <a
                        href={`https://dweb.link/ipfs/${demand[11]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#0070f3",
                          textDecoration: "underline",
                          fontSize: "13px"
                        }}
                      >
                        Click Here
                      </a>
                    ) : "❌ Pending"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const cellStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  fontSize: "14px",
  textAlign: "center" as const
};

export default FulfillDemandsPage;
