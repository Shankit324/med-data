"use client";

import React from 'react';
import Layout from '@/components/Layout';
import { notFound } from "next/navigation";
import { x_val } from "@/app/pharmacy/access";

interface PageProps {
  params: { username: string };
}

const Profile: React.FC<PageProps> = ({ params }: PageProps) => {
  const { username } = React.use(params);

  if (!username) return notFound();
  let hospital;
  let retrieve_x = async () => {
    hospital = await x_val(username);
  }
  retrieve_x();
  if (!hospital) return notFound();

  return (
    <Layout>
      <div style={containerStyle}>
        <h1 style={titleStyle}>Pharmacy Profile</h1>
        <div style={cardStyle}>
          <p><strong>Name:</strong> {hospital.name}</p>
          <p><strong>Username:</strong> {hospital.username}</p>
          <p><strong>Location:</strong> {hospital.location}</p>
          <p><strong>Email:</strong> {hospital.emailId}</p>
          <p><strong>Mobile:</strong> {hospital.mobileNumber}</p>
        </div>
      </div>
    </Layout>
  );
};

const containerStyle: React.CSSProperties = {
  maxWidth: '600px',
  margin: '50px auto',
  padding: '30px',
  backgroundColor: '#f8f9fa',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
};

const titleStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#0070f3',
  marginBottom: '30px',
};

const cardStyle: React.CSSProperties = {
  padding: '20px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  border: '1px solid #e0e0e0',
  fontSize: '16px',
  lineHeight: '1.8',
};

export default Profile;
