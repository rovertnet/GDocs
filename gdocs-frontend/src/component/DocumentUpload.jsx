import { useState } from "react";
import { motion } from "framer-motion";
import { uploadDocument } from "../services/documentService";
import { useAuth } from "../context/AuthContext";

export default function DocumentUpload({ onUploaded }) {
  const { token } = useAuth();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file || !title) return alert("Fichier et titre requis");
    try {
      setLoading(true);
      const doc = await uploadDocument(file, title, description, token);
      alert("✅ Upload réussi !");
      setFile(null);
      setTitle("");
      setDescription("");
      onUploaded(doc);
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de l’upload");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-md rounded-2xl p-6 flex flex-col gap-4"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        📄 Ajouter un document
      </h2>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="border rounded p-2"
      />
      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded p-2"
      />
      <input
        type="text"
        placeholder="Description (optionnel)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border rounded p-2"
      />
      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
      >
        {loading ? "Envoi en cours..." : "Ajouter le document"}
      </button>
    </motion.div>
  );
}
