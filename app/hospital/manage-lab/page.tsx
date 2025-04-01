"use client"

import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import { handle, x_val } from './submit';

interface Lab {
  id: number;
  name: string;
  username: string;
  location: string;
  emailId: string;
  mobileNumber: string;
  password: string;
  rpassword: string,
}

const ManageLab: React.FC = () => {
  const [hide, setHide] = useState<Boolean>(true);
  const [hide1, setHide1] = useState<Boolean>(true);
  const [newLab, setNewLab] = useState<Lab>({
    id: -1,
    name: '',
    username: '',
    location: '',
    emailId: '',
    mobileNumber: '',
    password: '',
    rpassword: '',
  });

  const handleAddLab = async () => {
    if (newLab.password !== newLab.rpassword) {
      setHide(false);
      return;
    }
    const exists = await x_val(newLab);
    if (!exists) {
      setHide1(false);
      return;
    }
    setHide(true);
    setHide1(true);
    await handle(newLab);
    setNewLab({
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
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Manage Pathology Labs</h2>
        <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Add New Lab</h3>

        {[
          { placeholder: 'Lab Name', value: newLab.name, key: 'name' },
          { placeholder: 'Username', value: newLab.username, key: 'username' },
          { placeholder: 'Lab Location', value: newLab.location, key: 'location' },
          { placeholder: 'Enter Contact Number', value: newLab.mobileNumber, key: 'mobileNumber' },
          { placeholder: 'Enter Email ID', value: newLab.emailId, key: 'emailId' },
        ].map((field, i) => (
          <input
            key={i}
            type="text"
            placeholder={field.placeholder}
            value={field.value}
            onChange={(e) => setNewLab({ ...newLab, [field.key]: e.target.value })}
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

        <input
          type="password"
          placeholder="Enter Password"
          value={newLab.password}
          onChange={(e) => setNewLab({ ...newLab, password: e.target.value })}
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
        <input
          type="password"
          placeholder="Re-Enter Password"
          value={newLab.rpassword}
          onChange={(e) => setNewLab({ ...newLab, rpassword: e.target.value })}
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

        <div id="pwd" style={{ display: hide ? "none" : "block", color: "red", marginBottom: "10px", textAlign: 'center' }}>
          Password Mismatch...
        </div>
        <div id="usr" style={{ display: hide1 ? "none" : "block", color: "red", marginBottom: "10px", textAlign: 'center' }}>
          Username or Password already exists...
        </div>

        <button
          onClick={handleAddLab}
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
          Add Lab
        </button>
      </div>
    </Layout>
  );
};

export default ManageLab;
