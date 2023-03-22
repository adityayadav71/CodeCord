import axios from "axios";
import { BASE_URL } from "./apiConfig";

export const getAllProblems = async () => {
  const response = await axios.get(`${BASE_URL}/api/v1/problems`);
  return response.data;
};

export const getProblem = async (problemId) => {
  console.log(problemId);
  const response = await axios.get(`${BASE_URL}/api/v1/problems/${problemId}`);
  return response.data;
};

export const updateProblem = async (problemId) => {
  const response = await axios.patch(
    `${BASE_URL}/api/v1/problems/${problemId}`
  );
  return response.data;
};

export const deleteProblem = async (problemId) => {
  const response = await axios.delete(
    `${BASE_URL}/api/v1/problems/${problemId}`
  );
  return response.data;
};
