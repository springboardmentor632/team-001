import API from "../api/axios";

export const getDashboardStats = () => {
  return API.get("/dashboard/stats");
};

export const getRecentDecisions = () => {
  return API.get("/dashboard/recent-decisions");
};

export const getDashboardAnalytics = () => {
  return API.get("/dashboard/analytics");
};

export const getVotingParticipation = () => {
  return API.get("/dashboard/voting-participation");
};

export const getVoteDistribution = () => {
  return API.get("/dashboard/vote-distribution");
};

export const getDecisionTrends = () => {
  return API.get("/dashboard/decision-trends");
};