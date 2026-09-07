import axios from "axios";

const API =
"http://localhost:5000/api/notifications";

export const getNotifications =
() =>
axios.get(API, {
  headers: {
    Authorization:
      `Bearer ${localStorage.getItem("token")}`
  }
});

export const markAsRead =
(id) =>
axios.put(
  `${API}/${id}/read`,
  {},
  {
    headers: {
      Authorization:
      `Bearer ${localStorage.getItem("token")}`
    }
  }
);

export const deleteNotification =
(id) =>
axios.delete(
  `${API}/${id}`,
  {
    headers: {
      Authorization:
      `Bearer ${localStorage.getItem("token")}`
    }
  }
);