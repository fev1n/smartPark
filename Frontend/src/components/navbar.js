import React, { useState } from 'react';
import "../styles/navbar.css";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import bgImg from "../assets/logo2.png"; // Import the image

const Navbar = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleSearchRedirect = () => {
    navigate("/search");
  };
  
  const listItems = [
   
    {
      
      list: [
        {
          type: isLoginSuccess ? "Logout" : "Login",
          content: isLoginSuccess ? "Logout Successful" : "Login Successful",
        },
      ],
    },
   
    
  ];
  return (
    <header>
      <div className="logo">
        <img src={logoImage} alt="Logo" />
      </div>
      <div className="search-bar">
        <button className="btn search-btn" onClick={handleSearchRedirect}>
          Search for a spot
        </button>
      </div>
      <div className='not'>
      <Notification listItems={listItems} /></div>
      <div className={`navbar ${isNavbarActive ? 'active' : ''}`} >
        <ul>
          
          <li><Link to="/about">About</Link></li>
          <li><Link to="/Help">Help</Link></li>
        
        </ul>
        
      </div>
      
      
      <div className="hamburger" onClick={toggleNavbar}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <ul className="nav-list">
        <li className="nav-item"><a href="/">About</a></li>
        <li className="nav-item"><a href="/about">Help</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
