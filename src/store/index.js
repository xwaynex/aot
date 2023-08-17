import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice'; 
import dashboardReducer from "./slice/dashboardSlice";
import disputeReducer from "./slice/disputeSlice";
import promotionsReducer from "./slice/promotionsSlice";
import tableReducer from "./slice/faqSlice";
import api from '@/app/api/apiSlice';

export const store = configureStore({
  reducer: {
    dashboardState: dashboardReducer,
    disputeState: disputeReducer,
    promotionsState: promotionsReducer,
    tableData: tableReducer,
    user: userReducer, // Add the user reducer
    [api.reducerPath]: api.reducer, // Add RTK Query reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

const userState = store.getState().user;


