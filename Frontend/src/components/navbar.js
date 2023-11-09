import React from 'react';
import "../styles/navbar.css";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import bgImg from "../assets/logo2.png"; // Import the image
import { Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleSearchRedirect = () => {
    navigate("/search");
  };

  return (
    <nav className="navbar">
      <div className="left-section">
        <div className="logo">
          <img src={bgImg} alt="logo" width={75} height={75} /> 
        </div>
        <div className="search-bar">
          <button className="btn search-btn" onClick={handleSearchRedirect}>
            Search for a spot
          </button>
        </div>
      </div>
      <ul className="nav-list">
      <li className="nav-item"><Link to="/dashboard">Dashboard</Link></li>
      <li className="nav-item"><Link to="/">About</Link></li>
      <li className="nav-item"><Link to="/about">Help</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
