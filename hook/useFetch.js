import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
// import { RAPPID_API_KEY } from "@env";
// const rappidApiKey = RAPPID_API_KEY;
const useFetch = (endPoint, query) => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch(); 
  const jobsData = useSelector((state)=>state.jobsData.jobs);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);
  const options = {
    url: `https://jsearch.p.rapidapi.com/${endPoint}`,
    params: {
      ...query,
    },
    headers: {
      "X-RapidAPI-Key": "da9ad77e36mshdb3e2c815c7c8a3p11d120jsncc56680ad21b",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };
  const fetchData = async () => {
    setIsloading(true);
    try {
      const response = await axios.get(options);
      setData(response.data.data);
    } catch (error) {
      setError(error);
      console.log(error);

      alert("There is an error");
    } finally {
      setIsloading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const reFetch = fetchData;
  return { data, isLoading, error, reFetch };
};

export default useFetch;
