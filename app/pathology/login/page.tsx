"use client"

import React, { useState, FormEvent } from 'react';
import Layout from '../../../components/Layout';
import { x_val, y_val } from '@/app/pathology/login/submit';

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
      else window.location.href = `/pathology/${username}`;
    }
  };

  return (
    <Layout>
      <div style={{
        maxWidth: '400px',
        margin: '60px auto',
        padding: '30px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '25px' }}>Pathology Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              border: '1px solid #ccc',
              borderRadius: '5px'
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              border: '1px solid #ccc',
              borderRadius: '5px'
            }}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#0070f3',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Login
          </button>

          <div style={{
            display: visible ? "block" : "none",
            color: 'red',
            marginTop: '15px',
            textAlign: 'center'
          }}>
            Username or password is incorrect...
          </div>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <a href="/pathology/forgot" style={{ color: '#0070f3', textDecoration: 'none' }}>
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default HospitalLogin;
