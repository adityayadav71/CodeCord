import axios from "axios";
import { BASE_URL } from "./apiConfig";

export const getAllProblems = async (filter) => {
  const queryString = `${filter.tags.length !== 0 ? `tags=${filter.tags}` : ""}${
    filter.difficulty ? `&difficulty=${filter.difficulty}` : ""
  }&fields=number,title,difficulty,stats.acceptance,stats.submissions&page=${
    filter.page
  }&limit=${filter.limit}`;

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
