import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function SuperAdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // données fictives pour super admin
  const stats = {
    totalUsers: 10,
    totalDocuments: 150,
    recentAdmins: ["admin1", "admin2", "admin3"],
  };

  return (
    <motion.div
      className="p-6 min-h-screen bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Déconnexion
        </button>
      </div>

      <p className="mb-4">Bienvenue, {user?.name || "Super Admin"} !</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold">Utilisateurs</h2>
          <p className="text-2xl">{stats.totalUsers}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold">Documents</h2>
          <p className="text-2xl">{stats.totalDocuments}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold">Admins récents</h2>
          <ul className="list-disc ml-5">
            {stats.recentAdmins.map((admin, idx) => (
              <li key={idx}>{admin}</li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
