import axios from "axios";
import { BASE_URL } from "./apiConfig";

export const getAllProblems = async (filter) => {
  const queryString = `fields=number,title,difficulty,tags,stats.acceptance,stats.submissions`;
  const response = await axios.get(
    `${BASE_URL}/api/v1/problems?${queryString}`
  );
  return response.data;
};

export const getProblem = async (slugs) => {
  const slugString = slugs.join(",");
  const response = await axios.get(
    `${BASE_URL}/api/v1/problems/selected?problems=${slugString}`
  );
  return response.data;
};

export const getRandomProblems = async () => {
  const response = await axios.get(
    `${BASE_URL}/api/v1/problems/set/four-problems`
  );
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
