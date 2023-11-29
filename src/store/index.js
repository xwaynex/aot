import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice'; 
import dashboardReducer from "./slice/dashboardSlice";
import disputeReducer from "./slice/disputeSlice";
import promotionsReducer from "./slice/promotionsSlice";
import tableReducer from "./slice/faqSlice";
import searchReducer from './slice/searchSlice';
import api from '@/app/api/apiSlice';
import paginationReducer from './slice/paginationSlice';

import orderReducer from './slice/pickUpDetailsSlice';
import payForOrderReducer from "./slice/payForOrderSlice"
// Update with the actual path


export const store = configureStore({
  reducer: {
    dashboardState: dashboardReducer,
    disputeState: disputeReducer,
    promotionsState: promotionsReducer,
    tableData: tableReducer,
    search: searchReducer,
    user: userReducer, // Add the user reducer
    order: orderReducer, //Add the order
    payForOrder: payForOrderReducer,
    [api.reducerPath]: api.reducer, // Add RTK Query reducer
    paginationState: paginationReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});


const userState = store.getState().user;

export default store;