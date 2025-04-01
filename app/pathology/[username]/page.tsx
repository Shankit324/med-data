"use client";

import React from 'react';
import Layout from '@/components/Layout';
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{ username: string }>; 
}

const Home: React.FC<PageProps> = ({ params }: PageProps) => {
  const { username } = React.use(params);
  if (!username) return notFound();

  return (
    <Layout>
      <div
        style={{
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontFamily: "Arial, sans-serif"
        }}
      >
        <h1 style={{ fontSize: "36px", marginBottom: "30px", color: "rgb(40, 102, 69)" }}>Lab Dashboard</h1>
        <div
          style={{
            display: "flex",
            gap: "40px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              minWidth: "200px",
              textAlign: "center",
              transition: "0.3s",
              boxShadow: "0 2px 4px rgb(235, 40, 83)",
              color: "#A8D39A"
            }}
            onMouseEnter={
              (e) => {
                e.currentTarget.style.color = "white";
                e.currentTarget.style.backgroundColor = "#A8D39A";
                e.currentTarget.style.boxShadow = "0 2px 4px lightgray";
              }
            }
            onMouseLeave={
              (e) => {
                e.currentTarget.style.color = "#A8D39A";
                e.currentTarget.style.backgroundColor = "#ffffe4";
                e.currentTarget.style.boxShadow = "0 2px 4px rgb(235, 40, 83)";
              }
            }
          >
            <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>Profile</h2>
            <Link
              href={`/pathology/profile/${username}`}
              style={{
                color: "rgb(61, 92, 246)",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Click To Visit→
            </Link>
          </div>

          <div
            style={{
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              minWidth: "200px",
              textAlign: "center",
              transition: "0.3s",
              boxShadow: "0 2px 4px rgb(235, 40, 83)",
              color: "#A8D39A"
            }}
            onMouseEnter={
              (e) => {
                e.currentTarget.style.color = "white";
                e.currentTarget.style.backgroundColor = "#A8D39A";
                e.currentTarget.style.boxShadow = "0 2px 4px lightgray";
              }
            }
            onMouseLeave={
              (e) => {
                e.currentTarget.style.color = "#A8D39A";
                e.currentTarget.style.backgroundColor = "#ffffe4";
                e.currentTarget.style.boxShadow = "0 2px 4px rgb(235, 40, 83)";
              }
            }
          >
            <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>View Report</h2>
            <Link
              href={`/pathology/view_reports/${username}`}
              style={{
                color: "rgb(61, 92, 246)",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Click To Visit→
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
