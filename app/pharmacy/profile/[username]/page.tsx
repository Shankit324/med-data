"use client";

import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { notFound } from "next/navigation";
import { x_val } from "@/app/pharmacy/access";

interface PageProps {
  params: Promise<{ username: string }>;
}

const Profile: React.FC<PageProps> = ({ params }: PageProps) => {
  const [username, setUsername] = useState<string | null>(null);
  const [pharmacy, setPharmacy] = useState<any>(null);

  useEffect(() => {
    const resolveParams = async () => {
      const { username } = await params;
      setUsername(username);

      const data = await x_val(username);
      if (!data) {
        notFound();
      } else {
        setPharmacy(data);
      }
    };

    resolveParams();
  }, [params]);

  if (!username || !pharmacy) return <p>Loading...</p>;

  return (
    <Layout>
      <div style={containerStyle}>
        <h1 style={titleStyle}>Pharmacy Profile</h1>
        <div style={cardStyle}>
          <p>
            <strong>Name:</strong> {pharmacy.name}
          </p>
          <p>
            <strong>Username:</strong> {pharmacy.username}
          </p>
          <p>
            <strong>Location:</strong> {pharmacy.location}
          </p>
          <p>
            <strong>Email:</strong> {pharmacy.emailId}
          </p>
          <p>
            <strong>Mobile:</strong> {pharmacy.mobileNumber}
          </p>
        </div>
      </div>
    </Layout>
  );
};

const containerStyle: React.CSSProperties = {
  maxWidth: "600px",
  margin: "50px auto",
  padding: "30px",
  backgroundColor: "#f8f9fa",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
};

const titleStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#0070f3",
  marginBottom: "30px",
};

const cardStyle: React.CSSProperties = {
  padding: "20px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  border: "1px solid #e0e0e0",
  fontSize: "16px",
  lineHeight: "1.8",
};

export default Profile;
