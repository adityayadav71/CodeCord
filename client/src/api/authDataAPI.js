import axios from "axios";
axios.defaults.withCredentials = true;
import { BASE_URL } from "./apiConfig";

export const checkLogInStatus = async () => {
  const response = await axios.get(`${BASE_URL}/users/isLoggedIn`, {
    headers: {
      "Access-Control-Allow-Credentials": true,
    },
    credentials: "include",
  });
  return response.data;
};

export const signup = async (formData) => {
  const response = await axios.post(
    `${BASE_URL}/users/signup`,
    JSON.stringify(formData),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const login = async (formData) => {
  const response = await axios.post(
    `${BASE_URL}/users/login`,
    JSON.stringify(formData),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const logout = async () => {
  const response = await axios.post(`${BASE_URL}/users/logout`, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    },
  });
  return response.data.status === "success";
};

export const forgotPassword = async (formData) => {
  const response = await axios.post(
    `${BASE_URL}/users/forgotPassword`,
    JSON.stringify(formData),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const resetPassword = async (formData, token) => {
  const response = await axios.patch(
    `${BASE_URL}/users/resetPassword/${token}`,
    JSON.stringify(formData),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
