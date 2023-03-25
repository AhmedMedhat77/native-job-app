import { createSlice } from "@reduxjs/toolkit";
import { getJobsDispatch } from "./jobsThunk";
const initialState = {
  jobs: [],
  isLoading: false,
  error: null,
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getJobsDispatch.fulfilled, (state, action) => {
      state.jobs = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(getJobsDispatch.rejected, (state, action) => {
      state.jobs = [];
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(getJobsDispatch.pending, (state, action) => {
      state.jobs = [];
      state.isLoading = true;
    });
  },
});

export const { setJobs } = jobsSlice.actions;
export default jobsSlice.reducer;
