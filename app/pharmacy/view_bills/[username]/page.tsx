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

const FulfillDemandsPage: React.FC<PageProps> = async ({ params }: PageProps) => {
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

        if (d.pharmacyUsername === username) {
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
      // Upload to Pinata
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

      const tx = await contract.approvePharmacy(demandId, fileHash);

      await tx.wait();
      alert("Approval recorded on blockchain!");
      fetchDemands();
    } catch (error) {
      console.error("Approval error:", error);
      alert("Something went wrong during approval.");
    }
  };

  return (
    <div className="container">
      <h1>Pharmacy Dashboard</h1>

      {loading ? (
        <p>Loading demands...</p>
      ) : demands.length === 0 ? (
        <p>No demands for username: {username}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Hospital</th>
              <th>Patient</th>
              <th>DOB</th>
              <th>Age</th>
              <th>Medicines</th>
              <th>Status</th>
              <th>Upload & Approve</th>
              <th>Uploaded File</th>
            </tr>
          </thead>
          <tbody>
            {demands.map((demand) => (
              <tr key={demand.id}>
                <td>{demand.id}</td>
                <td>{demand[0]}</td>
                <td>{demand[1]}</td>
                <td>{demand[2]}</td>
                <td>{demand[3]}</td>
                <td>{demand[6]}</td>
                <td>
                  {demand[8]
                    ? "✅ Approved"
                    : "❌ Pending"}
                </td>
                <td>
                  <input
                    type="file"
                    onChange={(e) =>
                      handleFileChange(demand.id, e.target.files?.[0] as File)
                    }
                    disabled={demand[8]? true:false}
                    required
                  />
                  <button onClick={() => handleApprove(demand.id)} disabled={demand[8]? true:false}>Approve</button>
                </td>
                <td>
                  {demand[8]
                    ? <a href={`https://ipfs.io/ipfs/${demand[10]}`}>Click Here</a>
                    : "❌ Pending"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FulfillDemandsPage;
