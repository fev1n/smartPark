import React from "react";

function SpotList({ spots }) {
  return (
    <div>
      {spots.map((spot) => (
        <div key={spot.id}>
          <h2>{spot.name}</h2>
          <p>{spot.address}</p>
          <p>{spot.price}</p>
        </div>
      ))}
    </div>
  );
}

export default SpotList;
