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
    if (password !== rpassword) setVisible2(true);
    else {
      let u = await z_val(username, password);
      if (u) window.location.href = '/pharmacy/login';
      else {
        const userResponse = confirm('Some error occurred! Try again...');
        if (userResponse) window.location.href = '/pharmacy/forgot';
        else window.location.href = '/pharmacy/forgot';
      }
    }
  };

  return (
    <Layout>
      <div style={{
        maxWidth: '400px',
        margin: '40px auto',
        padding: '30px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 0 12px rgba(0,0,0,0.1)',
        fontFamily: 'Segoe UI, sans-serif'
      }}>
        <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '24px' }}>Change Password</h2>

        {/* Username form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '16px'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '10px',
              backgroundColor: '#0070f3',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Login
          </button>
        </form>

        {/* Username not found message */}
        {visible && (
          <div style={{ marginTop: '10px', color: 'red', textAlign: 'center' }}>
            Username doesn't exist...
          </div>
        )}

        {/* Password change form */}
        {visible1 && (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px' }}>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                fontSize: '16px'
              }}
            />
            <input
              type="password"
              placeholder="Re-Enter Password"
              value={rpassword}
              onChange={(e) => setRpassword(e.target.value)}
              required
              style={{
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                fontSize: '16px'
              }}
            />
            <button
              type="submit"
              style={{
                padding: '10px',
                backgroundColor: '#28a745',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              Change
            </button>
          </form>
        )}

        {/* Password mismatch message */}
        {visible2 && (
          <div style={{ marginTop: '10px', color: 'red', textAlign: 'center' }}>
            Password mismatch...
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HospitalLogin;
