import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Automatically attach token to headers
api.interceptors.request.use((config) => {
  const stored = JSON.parse(localStorage.getItem("user"));
  if (stored && stored.token) {
    config.headers.Authorization = `Bearer ${stored.token}`;
  }
  return config;
});

export default api;
