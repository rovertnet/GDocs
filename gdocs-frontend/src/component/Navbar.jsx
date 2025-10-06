import React from "react";
import { Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ toggleSidebar }) {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm flex items-center justify-between px-6 py-3">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu size={24} />
        </button>
        <h1 className="font-bold text-xl text-gray-800">
          Panneau d’administration
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-700">
            {user?.name || "Admin"}
          </p>
          <p className="text-xs text-gray-500">
            {user?.role || "Administrateur"}
          </p>
        </div>
        <img
          src="https://ui-avatars.com/api/?name=Admin"
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </header>
  );
}
