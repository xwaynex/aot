// order details

import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    sender_name: "",
    sender_phone_number: "",
    item_category: "",
    quantity: "",
    delivery_description: "",
    recipient_name: "",
    recipient_phone_number: "",
    recipient_address: "",
    sender_address: "",
    origin: {
      latitude: 0,
      longitude: 0,
    },
    destination: {
      latitude: 0,
      longitude: 0,
    },
  },

  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetForm: (state) => {
      Object.keys(state).forEach((key) => {
        state[key] = "";
      });
    },
    updateCoordinates: (state, action) => {
      const { type, coordinates } = action.payload;
      state[type] = coordinates;
    },
    /* setSelectedVehicle: (state, action) => {
      state.selectedVehicle = action.payload;
    },
    setCoordinates: (state, action) => {
      const { type, coordinates } = action.payload;
      state[type] = coordinates;
    },
    setDistanceTime: (state, action) => {
      const { distance, duration } = action.payload;
      state.distance = distance;
      state.duration = duration;
    },
    calculateDistanceTime: () => async (dispatch, getState) => {
      const { distance } = getState();
      const { origin, destination, selectedVehicle } = distance;

      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.latitude},${origin.longitude}&destinations=${destination.latitude},${destination.longitude}&mode=${selectedVehicle}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        );

        const distance = response.data.rows[0].elements[0].distance.text;
        const duration = response.data.rows[0].elements[0].duration.text;

        dispatch(setDistanceTime({ distance, duration }));
      } catch (error) {
        console.error("Error fetching distance and duration:", error);
      }
    }, */
  },
});

export const {
  updateCoordinates,
  updateField,
  resetForm,
  setSelectedVehicle,
  setCoordinates,
  setDistanceTime,
  calculateDistanceTime
} = orderSlice.actions;
export const selectOrder = (state) => state.order;
export default orderSlice.reducer;
