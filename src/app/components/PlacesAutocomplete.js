import React, { useState, useEffect } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const PlacesAutocompleteComponent = ({ onSelect, value: propValue }) => {
  const [address, setAddress] = useState(propValue || "");

  useEffect(() => {
    setAddress(propValue || ""); // Update value when propValue changes
  }, [propValue]);

  const handleChange = (newAddress) => {
    setAddress(newAddress);
  };

  const handleSelect = async (newAddress) => {
    try {
      const results = await geocodeByAddress(newAddress);
      const { lat, lng } = await getLatLng(results[0]);
      onSelect(newAddress, { latitude: lat, longitude: lng });
      setAddress(newAddress);
    } catch (error) {
      console.error("Error geocoding address:", error);
    }
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({
              placeholder: "Search Places ...",
              className: "location-search-input",
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}

            {suggestions.slice(0, 5).map((suggestion) => (
              <div
                key={suggestion.placeId}
                {...getSuggestionItemProps(suggestion)}
                style={{
                  cursor: "pointer",
                  padding: "6px",
                  backgroundColor: suggestion.active ? "#fafafa" : "#ffffff",
                  width: "200px", // Set width to 200px
                  borderRadius: "4px", // Add border radius
                }}
              >
                <span>{suggestion.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default PlacesAutocompleteComponent;
