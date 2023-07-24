import { configureStore } from '@reduxjs/toolkit'
import dashboardReducer from "./slice/dashboardSlice"
import disputeReducer from "./slice/disputeSlice"
import promotionsReducer from "./slice/promotionsSlice"
import tableReducer from "./slice/faqSlice"

export const store = configureStore({
  reducer: {
    dashboardState:dashboardReducer,
    disputeState:disputeReducer,
    promotionsState:promotionsReducer,
    tableData: tableReducer,


  },
})