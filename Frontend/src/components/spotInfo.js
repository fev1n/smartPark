import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/spotInfo.css';

function SpotInfo() {
  const [spotDetails, setSpotDetails] = useState({});
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const location = useLocation();
  const spot = location.state?.spot || {};

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    // Your calculateDistance function code...
  };

  const validateInput = () => {
    // Your validateInput function code...
  };

  useEffect(() => {
    const fetchSpotDetails = async () => {
      try {
        // Use the 'spot' variable here to fetch spot details
        // For example:
        const BACKEND_ENDPOINT = `http://localhost:4000/api/search?location=${encodeURIComponent(
          spot.address
        )}`;
        const parkingResponse = await fetch(BACKEND_ENDPOINT);
        if (!parkingResponse.ok) {
          throw new Error(
            `Server responded with ${parkingResponse.status}: ${parkingResponse.statusText}`
          );
        }
        const parkingData = await parkingResponse.json();

        if (parkingData && parkingData.length > 0) {
          const spots = parkingData.map((spotData) => {
            const distance = calculateDistance(
              spot.lat,
              spot.lng,
              spotData.lat,
              spotData.lng
            );

            return {
              id: spotData.id || Math.random().toString(36).substr(2, 9),
              name: spotData.name,
              address: spotData.location,
              price: 'Not specified',
              lat: spotData.lat,
              lng: spotData.lng,
              distance: distance.toFixed(2),
            };
          });

          const sortedSpots = [...spots].sort(
            (a, b) => a.distance - b.distance
          );
          setSpotDetails(sortedSpots);
        } else {
          console.log('No Parking Spots Found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSpotDetails();
  }, [spot]);

  const sendContactInfo = async () => {
    if (!validateInput()) {
      alert('Please enter a valid phone number and email.');
      return;
    }

    try {
      const response = await axios.post('/sendContactInfo', {
        phoneNumber,
        email,
      });
      if (response.data.success) {
        alert('Code sent successfully!');
      } else {
        alert('Failed to send code. Please try again.');
      }
    } catch (error) {
      alert('There was an error connecting to the server. Please try again.');
    }
  };

  return (
    <div className="account-container">
      <h2 className="dashboard-title">Spot Information</h2>
      <div className="panel">
        <div className="panel-heading">Spot Details</div>
        <div className="spot-details-content">
          <p className="spot-detail">Name: {spot.name}</p>
          <p className="spot-detail">Address: {spot.address}</p>
          <p className="spot-detail">
            Distance from the address: {spot.distance} KM
          </p>
          <p className="spot-detail">
            Price: ${Math.floor(Math.random() * 6) + 4}
          </p>
        </div>
      </div>

      <div className="panel">
        <div className="panel-heading">Your Information</div>
        <div className="your-information-content">
          <label className="input-label">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />
<br></br>

          <label className="input-label">Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="form-control"
          />
          <br></br>

          <label className="input-label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <button onClick={sendContactInfo} className="btn btn-primary">
          Send Code
        </button>
      </div>
    </div>
  );
}

export default SpotInfo;
