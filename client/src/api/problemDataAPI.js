import axios from "axios";
import { BASE_URL } from "./apiConfig";

export const getAllProblems = async (filters) => {
  let queryString = `fields=number,title,difficulty,tags,stats.acceptance,stats.submissions${
    filters.tags.length !== 0 && `&tags=${filters.tags}`
  }${filters.difficulty && `&difficulty=${filters.difficulty}`}${filters.page && `&page=${filters.page}`}${filters.limit && `&limit=${filters.limit}`}`;
  const response = await axios.get(`${BASE_URL}/problems?${queryString}`);
  return response.data;
};

export const getProblem = async (slugs) => {
  const slugString = slugs.join(",");
  const response = await axios.get(
    `${BASE_URL}/problems/selected?problems=${slugString}`
  );
  return response.data;
};

export const getAllProblemTags = async (fields) => {
  const response = await axios.get(
    `${BASE_URL}/problems/tags?fields=${fields}`
  );
  return response.data.tags;
};

export const getRandomProblems = async () => {
  const response = await axios.get(`${BASE_URL}/problems/set/four-problems`);
  return response.data;
};

export const updateProblem = async (problemId) => {
  const response = await axios.patch(`${BASE_URL}/problems/${problemId}`);
  return response.data;
};

export const deleteProblem = async (problemId) => {
  const response = await axios.delete(`${BASE_URL}/problems/${problemId}`);
  return response.data;
};

export const getPreviousSubmissions = async (problemId) => {
  const response = await axios.get(
    `${BASE_URL}/users/submissions/${problemId}`
  );
  return response.data.submissions;
};
