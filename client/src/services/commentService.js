import axios from "axios";

const API = "http://localhost:5000/api/comments";

export const getComments = (pollId) =>
  axios.get(`${API}/${pollId}`);

export const addComment = (data) =>
  axios.post(`${API}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

export const updateComment = (id, text) =>
  axios.put(
    `${API}/${id}`,
    { text },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );

export const deleteComment = (id) =>
  axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });