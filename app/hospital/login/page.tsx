"use client"

import React, { useState, FormEvent } from 'react';
import Layout from '../../../components/Layout';
import { x_val, y_val } from './submit';

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
        window.location.href = `/hospital/${username}`;
      }
    }
  };

  return (
    <Layout>
      <div style={{
        maxWidth: '400px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0px 4px 10px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Hospital Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: '95%',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '16px'
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '95%',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '16px'
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
              fontSize: '16px'
            }}
          >
            Login
          </button>
        </form>

        <div style={{
          display: visible ? "block" : "none",
          color: 'red',
          marginTop: '10px',
          textAlign: 'center'
        }}>
          Username or password is incorrect...
        </div>

        <div style={{ marginTop: '15px', textAlign: 'center' }}>
          <a
            href="/hospital/forgot"
            style={{
              color: '#0070f3',
              textDecoration: 'none',
              fontSize: '14px'
            }}
          >
            Forgot Password?
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default HospitalLogin;
