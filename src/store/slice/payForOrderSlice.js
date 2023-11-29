//payment details for order

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { usePayForOrderMutation } from '../../app/api/apiSlice';


export const payForOrderAsync = createAsyncThunk(
  'payForOrder/payForOrderAsync',
  async ({ orderId, paymentDetails }, { dispatch }) => {
    const [payForOrder] = usePayForOrderMutation();

    try {
      dispatch(setLoader(true));
      const response = await payForOrder(orderId, paymentDetails);
      dispatch(setLoader(false));
      console.log('Payment successful:', response);
      return response;
    } catch (error) {
      dispatch(setLoader(false));
      dispatch(setError(error.message));
      console.error('Error making payment:', error);
      throw error;
    }
  }
);

export const payForOrderSlice = createSlice({
  name: 'payForOrder',
  initialState: {
    cardId: null,
    payment_method: '',
    order_id: null,
    save_card: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    setPaymentDetails: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setLoader: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetPayForOrder: (state) => {
      return {
        cardId: null,
        payment_method: '',
        order_id: null,
        save_card: false,
        isLoading: false,
        error: null,
      };
    },
  },
});

export const {
  setPaymentDetails,
  setLoader,
  setError,
  resetPayForOrder,
} = payForOrderSlice.actions;

export const selectPayForOrder = (state) => state.payForOrder;

export default payForOrderSlice.reducer;
