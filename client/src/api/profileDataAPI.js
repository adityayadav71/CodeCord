import axios from "axios";
import { BASE_URL } from "./apiConfig";

export const getCurrentUserProfile = async () => {
  const response = await axios.get(`${BASE_URL}/users/profile`);
  return response.data;
};

export const getUserProfile = async (username) => {
  const response = await axios.get(`${BASE_URL}/users/profile/${username}`);
  return response.data;
};

export const updateUserProfile = async (data) => {
  const response = await axios.patch(`${BASE_URL}/users/profile`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
