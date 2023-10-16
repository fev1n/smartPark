import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sign from './components/signup';
import LoginForm from './components/login';
import Dashboard from './components/dashboard';

import SignUpForm from './components/signup';
function App() {
  return (
    <Router>
      <Routes> 
      <Route path="/" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<Sign />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </Router>
  );
}

export default App;