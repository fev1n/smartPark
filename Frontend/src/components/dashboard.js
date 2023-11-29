// Dashboard.js
import React, { useState, useEffect } from "react";
import "../styles/dashboard.css";
import { useLocation, Link, useNavigate } from "react-router-dom";
import SavedVehiclesTab from "../components/SavedVehiclesPage";
import Reservationtab from "../components/reservation";
import ProfileTab from  "../components/profile";
import SearchPage from "./search/searchPage";
export default function Dashboard() {
  const location = useLocation();
  const emailFromLogin =
    location.state?.email || localStorage.getItem("userEmail") || "Guest";
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("Settings");
  const [user, setUser] = useState({ email: null });
  
  
  useEffect(() => {
    localStorage.setItem("userEmail", emailFromLogin);

    setTimeout(() => {
      setIsAuthenticated(true);
      setUser({ email: emailFromLogin });
    }, 100);

    
  }, [emailFromLogin]);

  const handleEmailChangeAlert = () => {
    window.alert("Contact an administrator to change your email");
  };

  const handlePasswordChangeAlert = () => {
    window.alert("Contact an administrator to change your password");
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
   
      
  };

  return (
    <div className="generic-page">
      <div className="slim-header background-color-bp-dark-blue">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 text-size-xs-30 text-size-md-45 text-align-xs-center text-align-md-center">
            The parking solution you've always wanted !
            </div>
          </div>
        </div>
      </div>

      {isAuthenticated && (
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="account-navigation">
                <div className="admin-links"></div>
              </div>
            </div>

            <div className="col-lg-9">
              <div className="account-container">
                <div className="tabs">
                <p
                    className={`tab ${activeTab === "SearchPage" && "active"}`}
                    onClick={() => handleTabClick("SearchPage")}
                  >
                    Search spot
                  </p>
                <p
                    className={`tab ${activeTab === "profile" && "active"}`}
                    onClick={() => handleTabClick("profile")}
                  >
                    Profile
                  </p>
                  <p
                    className={`tab ${activeTab === "Settings" && "active"}`}
                    onClick={() => handleTabClick("Settings")}
                  >
                    Settings
                  </p>

                  <p
                    className={`tab ${
                      activeTab === "Saved Vehicles" && "active"
                    }`}
                    onClick={() => handleTabClick("Saved Vehicles")}
                  >
                    Saved Vehicles
                  </p>
                  <p
                    className={`tab ${activeTab === 'Reservation Info' && 'active'}`}
                    onClick={() => handleTabClick('Reservation Info')}
                  >
                    Reservation Info
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

                    </div>
                
                )}

                {activeTab === "Saved Vehicles" && <SavedVehiclesTab />}
                {activeTab === "profile" && <ProfileTab />}
                {activeTab === "SearchPage" && <SearchPage />}
                {activeTab === "Reservation Info" && <Reservationtab  /> }
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

