import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000"; // adapte à ton backend

// ✅ Inscription
export const register = async (data) => {
  const res = await axios.post(`${API_URL}/auth/register`, data);
  return res.data; // { message: "ok", user: {...} }
};

// ✅ Connexion
export const login = async (data) => {
  const res = await axios.post(`${API_URL}/auth/login`, data);
  return res.data; // { token: "...", user: {...} }
};

// ✅ Définir le token pour les futures requêtes axios
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
