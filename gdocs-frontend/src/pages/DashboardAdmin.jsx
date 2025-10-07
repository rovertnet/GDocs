import React, { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = {
    documents: 42,
    totalSize: "120MB",
    recentUploads: ["Doc1.pdf", "Doc2.docx", "Image1.png"],
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Page content */}
        <motion.main
          className="p-6 overflow-y-auto flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-bold mb-4">Tableau de bord</h1>
          <p className="text-gray-600 mb-6">
            Bienvenue sur votre espace d’administration 👋
          </p>

          {/* Statistiques */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="">
              <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
                <h2 className="font-semibold text-gray-700 mb-2">Documents</h2>
                <p className="text-3xl font-bold">{stats.documents}</p>
              </div>
            </div>

            <div className="">
              <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
                <h2 className="font-semibold text-gray-700 mb-2">
                  Taille totale
                </h2>
                <p className="text-3xl font-bold">{stats.totalSize}</p>
              </div>
            </div>

            <div className="">
              <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
                <h2 className="font-semibold text-gray-700 mb-2">
                  Uploads récents
                </h2>
                <ul className="list-disc ml-6 text-gray-600">
                  {stats.recentUploads.map((doc, idx) => (
                    <li key={idx}>{doc}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.main>
      </div>
    </div>
  );
}
