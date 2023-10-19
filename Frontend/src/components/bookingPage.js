import React from "react";
import { useLocation } from "react-router-dom";

function BookingPage() {
  const location = useLocation();
  const { spot } = location.state || {};

  if (!spot) {
    // Handle the case where there is no spot information
    return <div>No spot information available</div>;
  }

  return (
    <div>
      <h2>Booking Details</h2>
      <p>Name: {spot.name}</p>
      <p>Address: {spot.address}</p>
      <p>Distance: {spot.distance}km</p>
      {/* Add additional spot details as needed */}
      <button>Confirm Booking</button>
    </div>
  );
}

export default BookingPage;
