import axios from "axios";
import { BASE_URL } from "./apiConfig";

export const getUserData = async (username) => {
  const response = await axios.get(`${BASE_URL}/api/v1/users/profile?username=${username}`);
  return response.data;
};

export const createUserProfile = async (username) => {
  await axios.post(`${BASE_URL}/api/v1/users/profile?username=${username}`);
};

export const updateUserProfile = async (data) => {
  await axios.patch(`${BASE_URL}/api/v1/users/profile`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
