import axios from "axios";

// Définir l'URL de base de ton API (depuis .env ou valeur par défaut)
const API_URL = import.meta.env.VITE_API_URL + "/users"; // ⚠ /users ajouté

// 🧩 Récupérer tous les utilisateurs
export const getUsers = async () => {
  const response = await axios.get(API_URL);
  // Si ton backend renvoie { users: [...] }, on prend juste la liste
  return Array.isArray(response.data)
    ? response.data
    : response.data.users || [];
};

// 🧩 Ajouter un utilisateur
export const addUser = async (userData) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
};

// 🧩 Mettre à jour un utilisateur
export const updateUser = async (id, userData) => {
  const response = await axios.patch(`${API_URL}/${id}`, userData);
  return response.data;
};

// 🧩 Supprimer un utilisateur
export const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
