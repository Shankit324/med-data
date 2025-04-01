"use client"

import React, { useState, FormEvent } from 'react';
import Layout from '../../../components/Layout';
import { x_val, z_val } from '../login/submit';

const HospitalLogin: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rpassword, setRpassword] = useState<string>('');
  const [visible, setVisible] = useState<Boolean>(false);
  const [visible1, setVisible1] = useState<Boolean>(false);
  const [visible2, setVisible2] = useState<Boolean>(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    let u = await x_val(username);
    if (!u) setVisible(true);
    else setVisible1(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== rpassword) {
      setVisible2(true);
    } else {
      let u = await z_val(username, password);
      if (u) window.location.href = '/pathology/login';
      else {
        const userResponse = confirm('Some error occurred! Try again...');
        window.location.href = '/pathology/forgot';
      }
    }
  };

  return (
    <Layout>
      <div style={{
        maxWidth: '400px',
        margin: '50px auto',
        padding: '30px',
        borderRadius: '10px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '25px' }}>Change Password</h2>

        <form onSubmit={handleLogin} style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Login
          </button>
        </form>

        <div style={{
          display: visible ? "block" : "none",
          color: 'red',
          marginBottom: '15px',
          textAlign: 'center'
        }}>
          Username doesn't exist...
        </div>

        <form onSubmit={handleSubmit} style={{ display: visible1 ? "block" : "none" }}>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          />
          <input
            type="password"
            placeholder="Re-Enter Password"
            value={rpassword}
            onChange={(e) => setRpassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Change
          </button>
        </form>

        <div style={{
          display: visible2 ? "block" : "none",
          color: 'red',
          marginTop: '15px',
          textAlign: 'center'
        }}>
          Password mismatch...
        </div>
      </div>
    </Layout>
  );
};

export default HospitalLogin;
