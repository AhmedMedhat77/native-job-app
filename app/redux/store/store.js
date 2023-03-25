import { configureStore } from "@reduxjs/toolkit";
import jobDetailsSlice from "../jobDetailsSlice/jobDetailsSlice";
import jobsSlice from "../jobsReducer/jobsSlice";

export const store = configureStore({
  reducer: {
    jobsData: jobsSlice,
    jobDetailsData: jobDetailsSlice,
  },
});
