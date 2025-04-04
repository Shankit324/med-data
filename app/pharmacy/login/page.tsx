"use client"

import React, { useState, FormEvent } from 'react';
import Layout from '../../../components/Layout';
import { x_val, y_val } from '@/app/pharmacy/login/submit';

const HospitalLogin: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [visible, setVisible] = useState<Boolean>(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    let u = await x_val(username);
    if (!u) setVisible(true);
    else {
      u = await y_val(username, password);
      if (!u) setVisible(true);
      else {
        console.log("Redirecting to:", `/pharmacy/${username}`);
        window.location.href = `/pharmacy/${username}`;
      }
    }
  };

  return (
    <Layout>
      <div style={{
        maxWidth: '400px',
        margin: '40px auto',
        padding: '30px',
        backgroundColor: '#f4f4f4',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        fontFamily: 'Segoe UI, sans-serif'
      }}>
        <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '24px' }}>Pharmacy Login</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: '10px',
              marginBottom: '12px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '16px'
            }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: '10px',
              marginBottom: '12px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '16px'
            }}
            required
          />
          <button
            type="submit"
            style={{
              padding: '10px',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Login
          </button>
          {visible && (
            <div style={{
              color: 'red',
              marginTop: '12px',
              textAlign: 'center',
              fontSize: '14px'
            }}>
              Username or password is incorrect...
            </div>
          )}
          <a
            href="/pharmacy/forgot"
            style={{
              marginTop: '16px',
              textAlign: 'center',
              display: 'block',
              color: '#0070f3',
              textDecoration: 'underline',
              fontSize: '14px'
            }}
          >
            Forgot Password?
          </a>
        </form>
      </div>
    </Layout>
  );
};

export default HospitalLogin;
