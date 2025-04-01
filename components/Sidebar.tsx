"use client"

import React, { useState } from 'react';
import '../styles/styles.css'; // Import your custom styles
import { IoReorderThree } from "react-icons/io5"; // Importing the hamburger menu icon

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false); // State to toggle sidebar visibility

  // Toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar-container ${isOpen ? 'open' : 'closed'}`}>
      {/* Hamburger Icon for smaller screens */}
      <div className="hamburger" onClick={toggleSidebar}>
        <IoReorderThree style={{ color: "white", fontSize: "30px", backgroundColor: "black", borderRadius: "5px" }} />
      </div>

      {/* Sidebar Content */}
      <div className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <ul className="sidebar-menu">
          <a style={{textDecoration: "none", color: "white"}} href="/"><li>Home</li></a>
          <a style={{textDecoration: "none", color: "white"}} href="/hospital/manage-hospital"><li>Manage Hospitals</li></a>
          <a style={{textDecoration: "none", color: "white"}} href="/hospital/manage-patients"><li>Manage Patients</li></a>
          <a style={{textDecoration: "none", color: "white"}} href="/hospital/manage-pharmacy"><li>Manage Pharmacies</li></a>
          <a style={{textDecoration: "none", color: "white"}} href="/hospital/manage-lab"><li>Manage Labs</li></a>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
