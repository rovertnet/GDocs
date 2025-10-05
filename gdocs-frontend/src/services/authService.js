import axios from "axios";

const API_URL = "http://localhost:3000/auth"; // ton backend NestJS

// ✅ Inscription
export const register = async (data) => {
  const res = await axios.post(`${API_URL}/register`, data);
  return res.data; // { message: "ok", user: {...} }
};

// ✅ Connexion
export const login = async (data) => {
  const res = await axios.post(`${API_URL}/login`, data);
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
