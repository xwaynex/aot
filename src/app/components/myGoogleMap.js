import { useState, useMemo, CSSProperties } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxPopover,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { Height } from "@mui/icons-material";

export default function MyGoogleMap() {
  const [selected, setSelected] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  if (loadError) return <div>Error loading maps</div>;
  
  const handleSelect = (place) => {
    setSelected(place);
  };

  return (
    <>
    <PlacesAutocomplete setSelected={handleSelect} />
    
      <Map selected={selected} />
    </>
  );
}

function Map({ selected }) {
  const center = useMemo(() => ({ lat: 7.443309999999999, lng: 3.900317 }), []);
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

 /*  const inputStyle = {
    boxSizing: `border-box`,
    border: `1px solid transparent`,
    width: `240px`,
    height: `32px`,
    padding: `0 12px`,
    borderRadius: `3px`,
    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
    fontSize: `14px`,
    outline: `none`,
    textOverflow: `ellipses`,
    position: "absolute",
    top: "10px",
    right: "10px",
  }; */

  return (
    <GoogleMap
      center={selected || center}
      zoom={10}
      mapContainerStyle={containerStyle}
    >
    
      {/* <StandaloneSearchBox>
        <input
          type="text"
          placeholder="Enter an address"
          style={inputStyle}
        />
      </StandaloneSearchBox> */}

      {selected && <Marker position={selected} />}
    </GoogleMap>
  );
}

const PlacesAutocomplete = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 500,
  });

  const inputStyle = {
    boxSizing: `border-box`,
    border: `1px solid transparent`,
    width: `240px`,
    height: `32px`,
    padding: `0 12px`,
    borderRadius: `3px`,
    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
    fontSize: `14px`,
    outline: `none`,
    textOverflow: `ellipses`,
    position: "absolute",
    top: "13%",
    right: "37%",
    zIndex: "1",
  }

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = getLatLng(results[0]);
      setSelected({ lat, lng });
    } catch (error) {
      console.error("Error geocoding address", error);
    }
  };

  return (
    <div className="places-autocomplete">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          style={inputStyle}
          disabled={!ready}
          placeholder="Enter an address"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ description, place_id }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};
