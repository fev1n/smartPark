import React, { useState, useEffect } from "react";
import "../styles/dashboard.css";
import { useLocation, Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const location = useLocation();
  const emailFromLogin = location.state?.email || null;
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false); // Initialize as false
  const [activeTab, setActiveTab] = useState("Settings");
  const [user, setUser] = useState({ email: null });

  useEffect(() => {
    // Simulate user authentication and set the user's email
    setTimeout(() => {
      setIsAuthenticated(true);
      setUser({ email: emailFromLogin });
    }, 1000);
  }, [emailFromLogin]);

  const handleEmailChangeAlert = () => {
    window.alert("Contact an administrator to change your email");
  };

  const handlePasswordChangeAlert = () => {
    window.alert("Contact an administrator to change your password");
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    if (tabName === "Payment Methods") {
      window.alert("Contact an administrator to add a payment method");
    } else if (tabName === "Saved Vehicles") {
      window.alert("Contact an administrator to add a vehicle");
    }
  };

  return (
    <div className="generic-page">
      <div className="slim-header background-color-bp-dark-blue">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 text-size-xs-30 text-size-md-36 text-align-xs-center text-align-md-left">
              Account Settings
            </div>
          </div>
        </div>
      </div>

      {isAuthenticated && (
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="account-navigation">
                

                <div className="admin-links">
                  
                </div>
              </div>
            </div>

            <div className="col-lg-9">
              <div className="account-container">
              <div className="tabs">
                  <p
                    className={`tab ${activeTab === "Settings" && "active"}`}
                    onClick={() => handleTabClick("Settings")}
                  >
                    Settings
                  </p>
                  <p
                    className={`tab ${
                      activeTab === "Payment Methods" && "active"
                    }`}
                    onClick={() => handleTabClick("Payment Methods")}
                  >
                    Payment Methods
                  </p>
                  <p
                    className={`tab ${
                      activeTab === "Saved Vehicles" && "active"
                    }`}
                    onClick={() => handleTabClick("Saved Vehicles")}
                  >
                    Saved Vehicles
                  </p>
                  <button className="btn">
                    <Link to="/login" className="link">
                      Sign out
                    </Link>
                  </button>
                </div>
                {/* Content for "Settings" */}
                {activeTab === "Settings" && (
                  <div className="account-settings-left">
                    <div className="panel open">
                      <div className="panel-heading">Sign-In Settings</div>
                      <div className="panel-content">
                        <h2>Email</h2>
                        <div className="account-email-wrapper">
                          <p>{user.email}</p>
                        </div>
                        <button
                          className="btn-link"
                          onClick={handleEmailChangeAlert}
                        >
                          Change
                        </button>
                        <br />
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
                )}

                {/* Placeholder for other tabs */}
                {activeTab === "Payment Methods" && (
                  <div>{}</div>
                )}

                {activeTab === "Saved Vehicles" && (
                  <div>{}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
