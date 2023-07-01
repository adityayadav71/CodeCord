import axios from "axios";
import { BASE_URL } from "./apiConfig";

export const runCode = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/execute/run`, data);
    return response.data;
  } catch (err) {
    console.log("Something went wrong! Please try again.");
  }
};

export const getResult = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/execute/${token}`);
    return response.data.result;
  } catch (err) {
    console.log("Something went wrong! Please try again.");
  }
};
