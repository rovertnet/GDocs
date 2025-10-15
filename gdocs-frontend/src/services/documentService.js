import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const uploadDocument = async (file, title, description, token) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("title", title);
  if (description) formData.append("description", description);

  const res = await axios.post(`${API_URL}/documents/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const getDocuments = async (token) => {
  const res = await axios.get(`${API_URL}/documents`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteDocument = async (id, token) => {
  const res = await axios.delete(`${API_URL}/documents/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
