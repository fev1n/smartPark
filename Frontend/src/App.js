<<<<<<< HEAD
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sign from "./components/signup";
import LoginForm from "./components/login";
import Dashboard from "./components/dashboard";
import SearchPage from "./components/search/searchPage.js";
import SignUpForm from "./components/signup";

=======
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sign from './components/signup';
import LoginForm from './components/login';
import Dashboard from './components/dashboard';

import SignUpForm from './components/signup';
>>>>>>> bfe6a43d52d9857f4014ccb9c0ab5bffb07cc5c2
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<Sign />} />
        <Route path="/dashboard" element={<Dashboard />} />
<<<<<<< HEAD
        <Route path="/search" element={<SearchPage />} />
=======

>>>>>>> bfe6a43d52d9857f4014ccb9c0ab5bffb07cc5c2
      </Routes>
    </Router>
  );
}

export default App;
