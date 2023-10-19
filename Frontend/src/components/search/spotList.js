// spotList.js

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/spotList.css";

function SpotList({ spots }) {
  const [selectedSpot] = useState(null);
  const navigate = useNavigate();
  const handleBookNow = (spot) => {
    // Navigate to the booking page with the spot information
    navigate(`/booking/${spot.id}`, { state: { spot } });
  };

  return (
    <div className="spot-list">
      <h3>Parking Spots</h3>

      {spots.map((spot, index) => (
        <div key={index} className="spot-tile">
          <h4>{spot.name}</h4>
          <p>{spot.address}</p>
          <p>{spot.distance} KM</p>
          <button
            onClick={() => handleBookNow(selectedSpot)}
            className="book-now-btn"
          >
            Book Now
          </button>
        </div>
      ))}
    </div>
  );
}

export default SpotList;
