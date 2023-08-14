// your/user/slice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null, // Set the initial state based on your authentication logic
  reducers: {
    setUser: (state, action) => action.payload,
    clearUser: () => null,
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
