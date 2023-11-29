import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../../styles/spotList.css";

function SpotList({ spots, onBookNow, onAddToFavorites }) {
  const navigate = useNavigate();
  console.log('SpotList Props:', spots);

  const isSpotInFavorites = (spot) => {
    const favoriteSpots = JSON.parse(localStorage.getItem('favoriteSpots')) || [];
    return favoriteSpots.some(favorite => favorite.id === spot.id);
  };
  const handleBookNow = (spot) => {
    console.log(spot);
    navigate(`/spot/${spot.address}`, { state: { spot } });
  };
  
  const handleAddToFavorites = (spot) => {
    const existingFavorites = JSON.parse(localStorage.getItem("favoriteSpots")) || [];
  
    const isAlreadyInFavorites = existingFavorites.some((favSpot) => favSpot.address === spot.address);
  
    if (!isAlreadyInFavorites) {
      const updatedFavorites = [...existingFavorites, spot];
      localStorage.setItem("favoriteSpots", JSON.stringify(updatedFavorites));
      alert(`${spot.name} added to favorites!`);
    } else {
      alert('Spot is already in favorites!');
    }
  };
  
  

  return (
    <div className="spot-list">
      <h3>Parking Spots</h3>

      {spots.map((spot, index) => (
        <div key={index} className="spot-tile">
          <h4>{spot.name}</h4>
          <p>{spot.address}</p>
          <p>{spot.distance} KM</p>
          <button onClick={() => handleBookNow(spot)} className="book-now-btn">
            Book Now
          </button>
            <button onClick={() => handleAddToFavorites(spot)} className="favorite-btn">
            {isSpotInFavorites(spot) ? (
              <FontAwesomeIcon icon={faHeart} />
            ) : (
              <FontAwesomeIcon icon={faHeart} className="empty-heart" />
            )}
          </button>
        </div>
      ))}
    </div>
  );
}

export default SpotList;
