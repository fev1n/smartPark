import React, { useState, useEffect } from "react";
import "../styles/dashboard.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const location = useLocation();

  const emailFromLogin = location.state?.email || null;

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [user, setUser] = useState({
    email: null,
  });

  useEffect(() => {
    setTimeout(() => {
      setIsAuthenticated(true);

      setUser({
        email: emailFromLogin,
      });
    }, 1000);
  }, [emailFromLogin]);

  const handleEmailChangeAlert = () => {
    window.alert("Contact administrator to change your email");
  };

  const handlePasswordChangeAlert = () => {
    window.alert("Contact administrator to change your password");
  };

  return (
    <div>
      <div className="dashboard-title">User's Dashboard</div>

      {isAuthenticated && (
        <div role="main" className="account-container">
          <div className="account-navigation">
            <div className="tabs">
              <p className="tab">Settings</p>
            </div>

            <div className="admin-links">
              <button className="btn">
                <Link to="/login" className="link">
                  Sign out
                </Link>
              </button>
            </div>
          </div>

          <div className="account-settings">
            <div className="account-settings-left">
              <div className="panel open">
                <div className="panel-heading">Sign-In Settings</div>

                <div className="panel-content">
                  <h2>Email</h2>

                  <div className="account-email-wrapper">
                    <p>{user.email}</p>
                  </div>

                  <button className="btn-link" onClick={handleEmailChangeAlert}>
                    Change
                  </button>

                  <br></br>

                  <h2>Password</h2>

                  <button
                    className="btn-link"
                    onClick={handlePasswordChangeAlert}
                  >
                    Change
                  </button>
                </div>
              </div>

              <div className="panel">
                <div className="panel-heading">Favorite Spots</div>

                <div className="panel-content">
                  <p>No favorites saved yet.</p>
                </div>
              </div>

              <div className="panel">
                <div className="panel-heading">Your Reservations</div>

                <div className="panel-content">
                  <p>No reservations yet!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
