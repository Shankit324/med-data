"use client"

import Layout from '../../../components/Layout';
import React, { useState } from 'react';
import { handle, x_val } from './submit';

interface Patient {
  id: string;
  name: string;
  age: string;
  dob: string;
  emailId: string;
  username: string;
  mobileNumber: string;
}

const ManagePatient: React.FC = () => {
  const [hide1, setHide1] = useState<Boolean>(true);
  const [newPatient, setNewPatient] = useState<Patient>({
    id: '',
    name: '',
    age: '',
    dob: '',
    emailId: '',
    username: '',
    mobileNumber: '',
  });

  const handleAddPatient = async () => {
    const exists = await x_val(newPatient);
    if (!exists) {
      setHide1(false);
      return;
    }
    setHide1(true);
    await handle(newPatient);
    setNewPatient({
      id: '',
      name: '',
      age: '',
      dob: '',
      emailId: '',
      username: '',
      mobileNumber: '',
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
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Manage Patients</h2>
        <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Add New Patient</h3>

        {[
          { placeholder: 'Patient Name', key: 'name', type: 'text' },
          { placeholder: 'Age', key: 'age', type: 'text' },
          { placeholder: 'Date of Birth', key: 'dob', type: 'date' },
          { placeholder: 'Enter Contact Number', key: 'mobileNumber', type: 'text' },
          { placeholder: 'Enter Email ID', key: 'emailId', type: 'text' },
        ].map((field, idx) => (
          <input
            key={idx}
            type={field.type}
            placeholder={field.placeholder}
            value={(newPatient as any)[field.key]}
            onChange={(e) => setNewPatient({ ...newPatient, [field.key]: e.target.value })}
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

        <div id="usr" style={{
          display: hide1 ? "none" : "block",
          color: "red",
          marginBottom: "10px",
          textAlign: 'center'
        }}>
          Same details already exist...
        </div>

        <button
          onClick={handleAddPatient}
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
          Add New Patient
        </button>
      </div>
    </Layout>
  );
};

export default ManagePatient;
