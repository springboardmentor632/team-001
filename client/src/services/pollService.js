import API from "../api/axios";

export const getAllPolls = (params) => API.get("/polls", { params });
export const getPollById = (id) => API.get(`/polls/${id}`);
export const createPoll = (data) => API.post("/polls", data);
export const updatePoll = (id, data) => API.put(`/polls/${id}`, data);
export const deletePoll = (id) => API.delete(`/polls/${id}`);
export const castVote = (data) => API.post("/polls/vote/cast", data);
export const removeVote = (voteId) => API.delete(`/polls/vote/${voteId}`);
export const getPollResults = (id) => API.get(`/polls/${id}/results`);
export const getTotalVotes = () => API.get("/polls/votes/total");
export const getTotalPolls = () => API.get("/polls/total");
export const verifyPollAccess = (id, accessCode) => API.post(`/polls/${id}/verify-access`, { accessCode });
