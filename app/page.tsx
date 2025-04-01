"use client"

import React from 'react';
import Layout from '../components/Layout';
import "../styles/styles.css"

const Home: React.FC = () => {
  return (
    <Layout>
      <div 
        className="home-container"
        style={{backgroundColor: "#ffffe4", color: "gray"}}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "20px", color: "rgb(40, 102, 69)" }}>Welcome to the Medical Report Management & Distribution System</h1>
        <p>This system is designed to securely manage and distribute medical reports across hospitals, pharmacies, and pathology labs.</p>
        
        <div className="sections">
          <div
            className="section"
            style={{
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              textAlign: "center",
              boxShadow: "0 2px 4px rgb(235, 40, 83)",
              transition: "0.3s",
              backgroundColor: "#ffffe4",
              color: "#A8D39A"
            }}
            onMouseEnter={
              (e) => {
                e.currentTarget.style.color = "white";
                e.currentTarget.style.backgroundColor = "#A8D39A";
                e.currentTarget.style.boxShadow = "0 2px 4px lightgray";
                e.currentTarget.style.transition = "0.3s";
              }
            }
            onMouseLeave={
              (e) => {
                e.currentTarget.style.color = "#A8D39A";
                e.currentTarget.style.backgroundColor = "#ffffe4";
                e.currentTarget.style.boxShadow = "0 2px 4px rgb(235, 40, 83)";
                e.currentTarget.style.transition = "0.3s";
              }
            }
          >
            <h2>Hospital</h2>
            <p>Manage hospital patients, pharmacies, and pathology labs in one place.</p>
            <a href="/hospital/login">
              Hospital Admin Login
            </a>
          </div>

          <div 
            className="section"
            style={{
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              textAlign: "center",
              boxShadow: "0 2px 4px rgb(235, 40, 83)",
              transition: "0.3s",
              backgroundColor: "#ffffe4",
              color: "#A8D39A"
            }}
            onMouseEnter={
              (e) => {
                e.currentTarget.style.color = "white";
                e.currentTarget.style.backgroundColor = "#A8D39A";
                e.currentTarget.style.boxShadow = "0 2px 4px lightgray";
                e.currentTarget.style.transition = "0.3s";
              }
            }
            onMouseLeave={
              (e) => {
                e.currentTarget.style.color = "#A8D39A";
                e.currentTarget.style.backgroundColor = "#ffffe4";
                e.currentTarget.style.boxShadow = "0 2px 4px rgb(235, 40, 83)";
                e.currentTarget.style.transition = "0.3s";
              }
            }
          >
            <h2>Pharmacy</h2>
            <p>Manage patient bills and medications.</p>
            <a href="/pharmacy/login">
              Pharmacy Admin Login
            </a>
          </div>

          <div 
            className="section"
            style={{
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              textAlign: "center",
              boxShadow: "0 2px 4px rgb(235, 40, 83)",
              transition: "0.3s",
              backgroundColor: "#ffffe4",
              color: "#A8D39A"
            }}
            onMouseEnter={
              (e) => {
                e.currentTarget.style.color = "white";
                e.currentTarget.style.backgroundColor = "#A8D39A";
                e.currentTarget.style.boxShadow = "0 2px 4px lightgray";
                e.currentTarget.style.transition = "0.3s";
              }
            }
            onMouseLeave={
              (e) => {
                e.currentTarget.style.color = "#A8D39A";
                e.currentTarget.style.backgroundColor = "#ffffe4";
                e.currentTarget.style.boxShadow = "0 2px 4px rgb(235, 40, 83)";
                e.currentTarget.style.transition = "0.3s";
              }
            }
          >
            <h2>Pathology Lab</h2>
            <p>Manage and add reports for patients.</p>
            <a href="/pathology/login">
              Pathology Lab Admin Login
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
