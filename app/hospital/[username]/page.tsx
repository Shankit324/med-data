"use client";

import React from "react";
import Layout from "@/components/Layout";
import "../../../styles/styles.css";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ username: string }>;
}

const Home: React.FC<PageProps> = async ({ params }: PageProps) => {
  const { username } = React.use(params);
  if (!username) return notFound();

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "20px", color: "rgb(40, 102, 69)" }}>
          Hospital Dashboard
        </h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            width: "100%",
            maxWidth: "800px",
          }}
        >
          <div
            style={{
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              textAlign: "center",
              boxShadow: "0 2px 4px rgb(235, 40, 83)",
              transition: "0.3s",
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
            <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>Profile</h2>
            <a style={{ color: "rgb(73, 123, 240)", textDecoration: "none" }} href={`/hospital/profile/${username}`}>
              <b>Click To Visit→</b>
            </a>
          </div>
          <div
            style={{
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              textAlign: "center",
              boxShadow: "0 2px 4px rgb(235, 40, 83)",
              transition: "0.3s",
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
            <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
              View Report
            </h2>
            <a style={{ color: "rgb(73, 123, 240)", textDecoration: "none" }} href={`/hospital/view_report/${username}`}>
              <b>Click To Visit→</b>
            </a>
          </div>
          <div
            style={{
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              textAlign: "center",
              boxShadow: "0 2px 4px rgb(235, 40, 83)",
              transition: "0.3s",
              color: "#A8D39A",
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
            <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
              Add Report
            </h2>
            <a style={{ color: "rgb(73, 123, 240)", textDecoration: "none" }} href={`/hospital/add_report/${username}`}>
              <b>Click To Visit→</b>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
