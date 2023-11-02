import { useState, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
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

      <Map selected ={selected} />
    </>
  );

  // return <Map containerStyle={containerStyle} />;
}

function Map({ selected }) {
  const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
  const containerStyle = {
    width: '100%',
    height: '100%'
  };

  return (
    <GoogleMap center={selected || center} zoom={10}  mapContainerStyle={containerStyle}>

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
  } = usePlacesAutocomplete();

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
    /*  const results = await getGeocode({ address });
    const { lat, lng } = getLatLng(results[0]);
    setSelected({ lat, lng }); */
  };

  return (
    <div className="places-autocomplete">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
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
