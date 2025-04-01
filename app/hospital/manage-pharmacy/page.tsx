"use client"

import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import { handle, x_val } from './submit';

interface Pharmacy {
  id: number;
  name: string;
  username: string;
  location: string;
  emailId: string;
  mobileNumber: string;
  password: string;
  rpassword: string;
}

const ManagePharmacy: React.FC = () => {
  const [hide, setHide] = useState<Boolean>(true);
  const [hide1, setHide1] = useState<Boolean>(true);
  const [newPharmacy, setNewPharmacy] = useState<Pharmacy>({
    id: -1,
    name: '',
    username: '',
    location: '',
    emailId: '',
    mobileNumber: '',
    password: '',
    rpassword: '',
  });

  const handleAddPharmacy = async () => {
    if (newPharmacy.password !== newPharmacy.rpassword) {
      setHide(false);
      return;
    }

    let z = await x_val(newPharmacy);
    if (!z) {
      setHide1(false);
      return;
    }

    setHide(true);
    setHide1(true);
    await handle(newPharmacy);
    setNewPharmacy({
      id: -1,
      name: '',
      username: '',
      location: '',
      emailId: '',
      mobileNumber: '',
      password: '',
      rpassword: '',
    });
  };

  return (
    <Layout>
      <div style={{
        maxWidth: '500px',
        margin: '50px auto',
        padding: '30px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Manage Pharmacy</h2>
        <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Add New Pharmacy</h3>

        {[
          { placeholder: 'Pharmacy Name', key: 'name', type: 'text' },
          { placeholder: 'Username', key: 'username', type: 'text' },
          { placeholder: 'Pharmacy Location', key: 'location', type: 'text' },
          { placeholder: 'Enter Contact Number', key: 'mobileNumber', type: 'text' },
          { placeholder: 'Enter Email ID', key: 'emailId', type: 'text' },
          { placeholder: 'Enter Password', key: 'password', type: 'password' },
          { placeholder: 'Re-Enter Password', key: 'rpassword', type: 'password' },
        ].map((field, idx) => (
          <input
            key={idx}
            type={field.type}
            placeholder={field.placeholder}
            value={(newPharmacy as any)[field.key]}
            onChange={(e) => setNewPharmacy({ ...newPharmacy, [field.key]: e.target.value })}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '15px'
            }}
          />
        ))}

        <div id="pwd" style={{
          display: hide ? "none" : "block",
          color: "red",
          marginBottom: "10px",
          textAlign: "center"
        }}>
          Password Mismatch...
        </div>

        <div id="usr" style={{
          display: hide1 ? "none" : "block",
          color: "red",
          marginBottom: "10px",
          textAlign: "center"
        }}>
          Username or Password already exists...
        </div>

        <button
          onClick={handleAddPharmacy}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#0070f3',
            color: 'white',
            fontSize: '16px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Add Pharmacy
        </button>
      </div>
    </Layout>
  );
};

export default ManagePharmacy;
