import axios from "axios";
import { BASE_URL } from "./apiConfig";

export const getUserData = async (username) => {
  const response = await axios.get(
    `${BASE_URL}/api/v1/users/profile?username=${username}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const createUserProfile = async (username) => {
  await axios.post(
    `${BASE_URL}/api/v1/users/profile`,
    JSON.stringify({ username: username }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
