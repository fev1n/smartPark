
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/spotList.css";

function SpotList({ spots }) {
  const navigate = useNavigate();
  
  const handleBookNow = (spot) => {
    console.log(spot);
    navigate(`/spot/${spot.address}`, { state: { spot } });
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
            onClick={() => handleBookNow(spot)}
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
