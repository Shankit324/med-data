"use client";

import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { notFound } from "next/navigation";
import { x_val } from "@/app/pathology/access";

interface PageProps {
  params: Promise<{ username: string }>;
}

const Profile: React.FC<PageProps> = ({ params }: PageProps) => {
  const [username, setUsername] = useState<string | null>(null);
  const [lab, setLab] = useState<any>(null);

  useEffect(() => {
    const resolveParams = async () => {
      const { username } = await params;
      setUsername(username);

      const data = await x_val(username);
      if (!data) {
        notFound();
      } else {
        setLab(data);
      }
    };

    resolveParams();
  }, [params]);

  if (!username || !lab) return <p>Loading...</p>;

  return (
    <Layout>
      <div
        style={{
          maxWidth: "600px",
          margin: "60px auto",
          padding: "30px",
          backgroundColor: "#f9f9f9",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Lab Profile</h1>
        <div style={{ fontSize: "16px", lineHeight: "1.6" }}>
          <p>
            <strong>Name:</strong> {lab.name}
          </p>
          <p>
            <strong>Username:</strong> {lab.username}
          </p>
          <p>
            <strong>Location:</strong> {lab.location}
          </p>
          <p>
            <strong>Email:</strong> {lab.emailId}
          </p>
          <p>
            <strong>Mobile:</strong> {lab.mobileNumber}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
