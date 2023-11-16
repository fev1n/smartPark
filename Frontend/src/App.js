import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sign from "./components/signup";
import LoginForm from "./components/login";
import Dashboard from "./components/dashboard";
import SearchPage from "./components/search/searchPage.js";
import SignUpForm from "./components/signup";
import Navbar from './components/navbar';

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
    <Router>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<Sign />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;