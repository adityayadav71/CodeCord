import axios from "axios";
import { BASE_URL } from "./apiConfig";

export const getCurrentUserData = async () => {
  const response = await axios.get(
    `${BASE_URL}/api/v1/users/profile`
  );
  return response.data;
};

export const getUserData = async (userId) => {
  const response = await axios.get(
    `${BASE_URL}/api/v1/users/profile/${userId}`
  );
  return response.data;
};

export const createUserProfile = async (username) => {
  await axios.post(`${BASE_URL}/api/v1/users/profile?username=${username}`);
};

export const updateUserProfile = async (data) => {
  const response = await axios.patch(`${BASE_URL}/api/v1/users/profile`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
