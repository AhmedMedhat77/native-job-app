import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getJobsDispatch = createAsyncThunk(
  "jobs/getJobs",
  async ({ endPoint, query }) => {
    console.log({ endPoint, query });
    const options = {
      method: "GET",
      url: `https://jsearch.p.rapidapi.com/${endPoint}`,
      params: {
        ...(query ?? {}),
      },
      headers: {
        "X-RapidAPI-Key": "da9ad77e36mshdb3e2c815c7c8a3p11d120jsncc56680ad21b",
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      },
    };
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
