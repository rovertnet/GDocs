import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000"; // adapte à ton backend

export const login = async (data) => {
  const res = await axios.post(`${API_URL}/auth/login`, data);
  return res.data;
};

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
};

export const getProfile = async () => {
  const res = await axios.get(`${API_URL}/auth/profile`);
  return res.data;
};