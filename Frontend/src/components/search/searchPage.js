import React, { useState, useRef } from "react";
import SearchBar from "./searchBar.js";
import SpotList from "./spotList.js";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/SearchPage.css";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; 
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; 
  return distance;
};

function SearchPage() {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const [selectedSpot, setSelectedSpot] = useState(null);
  const mapRef = useRef(null);
  const [mapCenter, setMapCenter] = useState({ lat: -34.397, lng: 150.644 });

  const handleSearchSubmit = async (location) => {
    try {
      const geocodeResponse = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyD3q0Mxt9mnz2s3PcSAHez5tJbXvbje8_Y`
      );
      const geocodeData = await geocodeResponse.json();

      if (geocodeData.results && geocodeData.results.length > 0) {
        const latlng = geocodeData.results[0].geometry.location;
        setMapCenter(latlng);

        const BACKEND_ENDPOINT = `http://localhost:4000/api/search?location=${location}`;
        const parkingResponse = await fetch(BACKEND_ENDPOINT);
        if (!parkingResponse.ok) {
          throw new Error(
            `Server responded with ${parkingResponse.status}: ${parkingResponse.statusText}`
          );
        }
        const parkingData = await parkingResponse.json();

        if (parkingData && parkingData.length > 0) {
          const spots = parkingData.map((spot) => {
            const distance = calculateDistance(
              latlng.lat,
              latlng.lng,
              spot.lat,
              spot.lng
            );

            return {
              id: spot.id || Math.random().toString(36).substr(2, 9),
              name: spot.name,
              address: spot.location,
              price: "Not specified",
              lat: spot.lat,
              lng: spot.lng,
              distance: distance.toFixed(2), 
            };
          });

          const sortedSpots = [...spots].sort(
            (a, b) => a.distance - b.distance
          );
          setResults(sortedSpots);
        } else {
          console.log("No Parking Spots Found");
        }
      } else {
        console.log("No Geocoding Results Found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleBookNow = (spot) => {
    navigate(`/spot/${spot.location}`, { state: { spot } });
  };

  return (
    <div className="search-container">
      <div className="navigation-container">
        <button onClick={() => navigate(-1)} className="go-back-button">
          ←
        </button>
      </div>
      <br></br>
      <div className="navigation-container">
        <h2 className="search-title">
          Enter your desired destination address here...
        </h2>
      </div>
      <SearchBar
        onSearch={handleSearchSubmit}
        inputClassName="search-input"
        buttonClassName="search-button"
      />

      <LoadScript googleMapsApiKey="AIzaSyD3q0Mxt9mnz2s3PcSAHez5tJbXvbje8_Y">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "400px" }}
          center={mapCenter}
          zoom={14}
          ref={mapRef}
        >
          {results.map((spot, index) => (
            <Marker
              key={index}
              position={{ lat: spot.lat, lng: spot.lng }}
              title={spot.name}
              onClick={() => setSelectedSpot(spot)}
            >
              {selectedSpot && selectedSpot.id === spot.id && (
                <InfoWindow
                  position={{ lat: selectedSpot.lat, lng: selectedSpot.lng }}
                  onCloseClick={() => setSelectedSpot(null)}
                >
                  <div>
                    <h4>{selectedSpot.name}</h4>
                    <p>{selectedSpot.address}</p>
                    <p>{selectedSpot.distance}km</p>
                    <button
                      onClick={() => handleBookNow(selectedSpot)}
                      className="book-now-btn"
                    >
                      Book Now
                    </button>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
      </LoadScript>
      <SpotList spots={results} onBookNow={handleBookNow}/>
    </div>
  );
}

export default SearchPage;
