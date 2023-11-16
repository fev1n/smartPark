import React, { useState, useEffect } from 'react';

import Navbar from './components/navbar.js'; // Import your Navbar component
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sign from "./components/signup";
import LoginForm from "./components/login";
import Dashboard from "./components/dashboard";
import SearchPage from "./components/search/searchPage.js";
import SignUpForm from "./components/signup";
import AboutPage from './components/about.js';
import HelpPage from './components/Help.js';
import Notification from "./components/Notification";
function App() {
  const [listItems, setListItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Remove the eslint-disable-next-line comment

  

  // You can set 'isLoggedIn' to true based on your login logic
  const handleLogin = () => {
    // Perform your login logic here
    // If login is successful, set 'isLoggedIn' to true
    setIsLoggedIn(true);
  };

  return (
    <div>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} listItems={listItems} />
        
        <Routes>
          <Route path="/" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/signup" element={<Sign />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/about" element={<AboutPage />}/>
          <Route path='/Help' element={<HelpPage />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;