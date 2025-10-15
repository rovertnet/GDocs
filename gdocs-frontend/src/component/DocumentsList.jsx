import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getDocuments, deleteDocument } from "../services/documentService";
import { useAuth } from "../context/AuthContext";

export default function DocumentList({ refreshTrigger }) {
  const { token } = useAuth();
  const [documents, setDocuments] = useState([]);

  const fetchDocuments = async () => {
    try {
      const docs = await getDocuments(token);
      setDocuments(docs);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Supprimer ce document ?")) {
      await deleteDocument(id, token);
      fetchDocuments();
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [refreshTrigger]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-3">
        📚 Mes documents
      </h2>
      {documents.length === 0 ? (
        <p className="text-gray-500">Aucun document disponible</p>
      ) : (
        <div className="grid gap-3">
          {documents.map((doc) => (
            <motion.div
              key={doc.id}
              whileHover={{ scale: 1.02 }}
              className="flex justify-between items-center border rounded-lg p-4 bg-gray-50"
            >
              <div>
                <h3 className="font-medium">{doc.title}</h3>
                <p className="text-sm text-gray-600">{doc.description}</p>
              </div>
              <div className="flex gap-3">
                <a
                  href={`http://localhost:4000/uploads/${doc.storageKey}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Télécharger
                </a>
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="text-red-500 hover:underline"
                >
                  Supprimer
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
