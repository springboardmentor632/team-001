import axios from "axios";

const API = "http://localhost:5000/api/communities";

const getToken = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});

export const getCommunities = () =>
  axios.get(API, getToken());

export const getCommunityById = (id) =>
  axios.get(`${API}/${id}`, getToken());

export const createCommunity = (data) =>
  axios.post(`${API}/create`, data, getToken());

export const joinCommunity = (id) =>
  axios.post(`${API}/${id}/join`, {}, getToken());

export const leaveCommunity = (id) =>
  axios.post(`${API}/${id}/leave`, {}, getToken());

export const deleteCommunity = (id) =>
  axios.delete(`${API}/${id}`, getToken());