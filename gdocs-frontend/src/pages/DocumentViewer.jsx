import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function DocumentViewer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doc, setDoc] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const res = await axios.get(`${API_URL}/documents/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoc(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement :", err);
        setError("Impossible de charger ce document.");
      }
    };
    fetchDocument();
  }, [id, token]);

  if (error)
    return (
      <div className="p-10 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-700 text-white rounded-md"
        >
          Retour
        </button>
      </div>
    );

  if (!doc) return <p className="text-center mt-10">Chargement...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        {doc.title}
      </h1>
      {doc.description && (
        <p className="text-gray-600 text-center">{doc.description}</p>
      )}

      <iframe
        src={`${API_URL}/uploads/${encodeURIComponent(doc.storageKey)}`}
        className="w-full h-[80vh] border rounded-lg shadow-md"
        title="Aperçu du document"
      />

      <div className="flex justify-center gap-4 mt-4">
        <a
          href={`${API_URL}/uploads/${encodeURIComponent(doc.storageKey)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          📥 Télécharger
        </a>

        <button
          onClick={() => window.print()}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          🖨️ Imprimer
        </button>

        <button
          onClick={() => navigate(-1)}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
        >
          🔙 Retour
        </button>
      </div>
    </div>
  );
}