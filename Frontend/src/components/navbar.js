import React, { useState } from 'react';
import "../styles/navbar.css";
import logoImages from '../assets/logo2.png';
import { useNavigate } from 'react-router-dom';
import Notification from '../components/Notification'
import { Link } from "react-router-dom";
function Navbar() {
  const [isNavbarActive, setNavbarActive] = useState(false);
  const [isNotificationActive, setNotificationActive] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const toggleNavbar = () => {
    setNavbarActive(!isNavbarActive);
  };

  const toggleNotification = () => {
    setNotificationActive(!isNotificationActive);
  };

  const navigate = useNavigate();
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
        <div className="navbar-logo">
        <img src={logoImages} alt="Logo" />
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
        <li><Link to="/dashboard">Dashboard</Link></li>

          <li><Link to="/about">About</Link></li>
          <li><Link to="/Help">Help</Link></li>

        </ul>
        
      </div>
      
      
      <div className="hamburger" onClick={toggleNavbar}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </header>
  );
}

export default Navbar;
