import React, { useState, useRef } from "react";
import SearchBar from "./searchBar.js";
import SpotList from "./spotList.js";
import { useNavigate } from "react-router-dom";
import "../../styles/searchPage.css";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

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
            console.log("spot.lat" + spot.lat);
            console.log("spot.lng" + spot.lng);

            return {
              id: spot.id || Math.random().toString(36).substr(2, 9),
              name: spot.name,
              address: spot.location,
              price: "Not specified",
              lat: spot.lat,
              lng: spot.lng,
            };
          });

          setResults(spots);
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
            />
          ))}

          {selectedSpot && (
            <InfoWindow
              position={{ lat: selectedSpot.lat, lng: selectedSpot.lng }}
              onCloseClick={() => setSelectedSpot(null)}
            >
              <div>
                <h4>{selectedSpot.name}</h4>
                <p>{selectedSpot.address}</p>
                <p>{selectedSpot.price}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>

      <SpotList spots={results} />
    </div>
  );
}

export default SearchPage;
