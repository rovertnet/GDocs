import React from "react";
import { useAuth } from "../context/AuthContext";

export default function DashboardSuperAdmin() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-purple-700 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Tableau de Bord - Super Admin</h1>
        <div className="flex items-center gap-4">
          <span className="font-medium">👑 {user?.username}</span>
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
        <h2 className="text-2xl font-semibold mb-4">
          Bienvenue Super Admin 🚀
        </h2>
        <p className="text-gray-700">
          Vous avez accès à toutes les fonctionnalités et à la gestion des
          administrateurs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white shadow p-4 rounded-lg">
            <h3 className="font-bold text-lg">⚙️ Gestion des Admins</h3>
            <p className="text-gray-600">Ajoutez ou supprimez des admins.</p>
          </div>
          <div className="bg-white shadow p-4 rounded-lg">
            <h3 className="font-bold text-lg">🔒 Sécurité</h3>
            <p className="text-gray-600">Contrôlez les accès et rôles.</p>
          </div>
          <div className="bg-white shadow p-4 rounded-lg">
            <h3 className="font-bold text-lg">📊 Super Stats</h3>
            <p className="text-gray-600">Vue complète sur le système.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
