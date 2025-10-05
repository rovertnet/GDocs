import React from "react";
import { useAuth } from "../context/AuthContext";

export default function DashboardAdmin() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Tableau de Bord - Admin</h1>
        <div className="flex items-center gap-4">
          <span className="font-medium">👤 {user?.username}</span>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
          >
            Déconnexion
          </button>
        </div>
      </header>

      {/* Contenu */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-4">Bienvenue Admin 👋</h2>
        <p className="text-gray-700">
          Ici, vous pouvez gérer les documents, consulter les statistiques et
          superviser les utilisateurs standards.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white shadow p-4 rounded-lg">
            <h3 className="font-bold text-lg">📂 Documents</h3>
            <p className="text-gray-600">Gérez et organisez vos fichiers.</p>
          </div>
          <div className="bg-white shadow p-4 rounded-lg">
            <h3 className="font-bold text-lg">👥 Utilisateurs</h3>
            <p className="text-gray-600">
              Consultez et administrez vos membres.
            </p>
          </div>
          <div className="bg-white shadow p-4 rounded-lg">
            <h3 className="font-bold text-lg">📊 Statistiques</h3>
            <p className="text-gray-600">Aperçu rapide des activités.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
