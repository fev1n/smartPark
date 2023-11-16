import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sign from "./components/signup";
import LoginForm from "./components/login";
import Dashboard from "./components/dashboard";
import SearchPage from "./components/search/searchPage.js";
import SignUpForm from "./components/signup";
import Navbar from './components/navbar';
import ReservationInfo from "./components/reservationInfo.js";
import SpotInfo from "./components/spotInfo.js";
import ReservationInfo2 from './components/reservationInfo2.js'; 
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<Sign />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/spot/:location" element={<SpotInfo />} />
        <Route path="/reservationInfo" element={<ReservationInfo />} />

        <Route path="/reservations/:id/*" element={<ReservationInfo2 />} />
      </Routes>
    </Router>
  );
}

export default App;
