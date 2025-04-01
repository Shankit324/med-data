"use client";

import React from 'react';
import Layout from '@/components/Layout';
import { notFound } from "next/navigation";
import { x_val } from "@/app/hospital/access";

interface PageProps {
  params: { username: string };
}

const Profile: React.FC<PageProps> = async ({ params }: PageProps) => {
  const { username } = React.use(params);
  if (!username) return notFound();

  const hospital: any = await x_val(username);
  if (!hospital) return notFound();

  return (
    <Layout>
      <div style={{
        maxWidth: '600px',
        margin: '50px auto',
        padding: '30px',
        borderRadius: '10px',
        backgroundColor: '#f0f4f8',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      }}>
        <h1 style={{
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '28px',
          color: '#333'
        }}>
          Hospital Profile
        </h1>

        <div style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #ddd',
        }}>
          <p style={{ margin: '10px 0', fontSize: '16px' }}><strong>Name:</strong> {hospital.name}</p>
          <p style={{ margin: '10px 0', fontSize: '16px' }}><strong>Username:</strong> {hospital.username}</p>
          <p style={{ margin: '10px 0', fontSize: '16px' }}><strong>Location:</strong> {hospital.location}</p>
          <p style={{ margin: '10px 0', fontSize: '16px' }}><strong>Email:</strong> {hospital.emailId}</p>
          <p style={{ margin: '10px 0', fontSize: '16px' }}><strong>Mobile:</strong> {hospital.mobileNumber}</p>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
