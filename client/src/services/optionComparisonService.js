import axios from "axios";

const API =
  "http://localhost:5000/api/option-comparison";

const getToken = () => {
  const token = localStorage.getItem("token");

  console.log("TOKEN:", token);

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const createComparison = (data) =>
  axios.post(API, data, getToken());

export const getComparison = (decisionId) =>
  axios.get(
    `${API}/${decisionId}`,
    getToken()
  );

export const getAllComparisons = () =>
  axios.get(API, getToken());

export const updateComparison = (
  id,
  data
) =>
  axios.put(
    `${API}/${id}`,
    data,
    getToken()
  );

export const deleteComparison = (id) =>
  axios.delete(
    `${API}/${id}`,
    getToken()
  );