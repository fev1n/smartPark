import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import '../styles/SearchPage.css';

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      parkingLocations: [
        { name: 'Location 1', lat: 43.651070, lng: -79.347015 },
        { name: 'Location 2', lat: 43.656071, lng: -79.380101 },
        { name: 'Location 3', lat: 43.668491, lng: -79.390753 },
        { name: 'Location 4', lat: 43.660116, lng: -79.352660 },
      ],
      activeMarker: null,
      selectedPlace: null,
    };
  }

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  }

  onMarkerClick = (props, marker) => {
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
    });
  }

  render() {
    const { google } = this.props;
    const { searchQuery, parkingLocations, activeMarker, selectedPlace } = this.state;

    const filteredLocations = parkingLocations.filter(location =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
<div className="search-container">
  <div className="search-bar">
    {/* Search input */}
    <input
      type="text"
      placeholder="Search for parking locations..."
      value={searchQuery}
      onChange={this.handleSearchChange}
    />
    {/* Location list */}
    <div className="location-list">
      {filteredLocations.map((location, index) => (
        <div
          key={index}
          className="location-list-item"
          onClick={() => this.onMarkerClick({ name: location.name })}
        >
          {location.name}
        </div>
      ))}
    </div>
  </div>
  <div className="map-container">
    {/* Google Map */}
    <Map
      google={google}
      zoom={13}
      initialCenter={{
        lat: 43.651070, // Toronto, Canada
        lng: -79.347015,
      }}
    >
      {filteredLocations.map((location, index) => (
        <Marker
          key={index}
          title={location.name}
          name={location.name}
          position={{ lat: location.lat, lng: location.lng }}
          onClick={this.onMarkerClick}
          visible={true}
        />
      ))}
      <InfoWindow
        marker={activeMarker}
        visible={activeMarker !== null}
      >
        <div>
          <h4>{selectedPlace && selectedPlace.name}</h4>
        </div>
      </InfoWindow>
    </Map>
  </div>
</div>
    );
  }
}
//THE FOLLOWING API USES GOOGLE MAPS AND HAS YASH PATEL'S CARD INFO PLEASE CONTACT 4372990071(whatspp) if any query
//DONT USE IT WITHOUT ASKING ABOUT BILL
export default GoogleApiWrapper({
  apiKey: 'AIzaSyD3q0Mxt9mnz2s3PcSAHez5tJbXvbje8_Y',
})(SearchPage);
