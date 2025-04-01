"use client"

import React from 'react';
import Layout from '@/components/Layout';
import { notFound } from "next/navigation";
import { x_val } from "@/app/pathology/access";

interface PageProps {
  params: { username: string };
}

const Profile: React.FC<PageProps> = ({ params }: PageProps) => {
  const { username } = React.use(params);

  if (!username) return notFound();

  const hospital: any = await x_val(username);
  if (!hospital) return notFound();

  return (
    <Layout>
      <div style={{
        maxWidth: '600px',
        margin: '60px auto',
        padding: '30px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Lab Profile</h1>
        <div style={{ fontSize: '16px', lineHeight: '1.6' }}>
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

export default Profile;
