import { createSlice } from "@reduxjs/toolkit";
import { getJobDetailsDispatch } from "./jobDetailsThunk";

const initialState = {
  jobDetails: [],
  isLoading: false,
  error: null,
};

const jobDetailsSlice = createSlice({
  name: "job-details",
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getJobDetailsDispatch.fulfilled, (state, action) => {
      state.jobDetails = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(getJobDetailsDispatch.rejected, (state, action) => {
      state.jobDetails = [];
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(getJobDetailsDispatch.pending, (state, action) => {
      state.jobDetails = [];
      state.isLoading = true;
    });
  },
});

export const { setJobs } = jobDetailsSlice.actions;
export default jobDetailsSlice.reducer;
