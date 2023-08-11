import { configureStore } from '@reduxjs/toolkit'
import dashboardReducer from "./slice/dashboardSlice"
import disputeReducer from "./slice/disputeSlice"
import promotionsReducer from "./slice/promotionsSlice"
import tableReducer from "./slice/faqSlice"
import { apiSlice } from "../../src/app/api/apiSlice"
import authReducer from '../features/auth/authSlice'


export const store = configureStore({
  reducer: {
    dashboardState:dashboardReducer,
    disputeState:disputeReducer,
    promotionsState:promotionsReducer,

    tableData: tableReducer,
    
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,


  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware().concat(apiSlice.middleware),
devTools: true
})