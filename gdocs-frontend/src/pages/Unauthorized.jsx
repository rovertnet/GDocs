import React from "react";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-red-600">403</h1>
      <p className="mt-4 text-lg text-gray-700">
        Accès refusé 🚫 – Vous n’avez pas la permission d’accéder à cette page.
      </p>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retour à l’accueil
        </button>

        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Se reconnecter
        </button>
      </div>
    </div>
  );
}
