import { BASE_URL } from "./apiConfig";
import axios from "axios";

export const getSubmissionDetails = async (submissionId) => {
  const response = await axios.get(`${BASE_URL}/submissions/${submissionId}`);
  return response.data.submission;
};

export const updateSubmissionDetails = async (submissionDetails) => {
  const response = await axios.post(
    `${BASE_URL}/submissions/${submissionDetails._id}`,
    {
      data: submissionDetails,
    }
  );
  return response.data.submission;
};
