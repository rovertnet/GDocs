import React from "react";
import { Home, FileText, Users, Settings, LogOut, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ open, setOpen }) {
  const { logout } = useAuth();

  const menu = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/admin" },
    {
      name: "Documents",
      icon: <FileText size={20} />,
      path: "/admin/documents",
    },
    { name: "Utilisateurs", icon: <Users size={20} />, path: "/admin/users" },
    {
      name: "Paramètres",
      icon: <Settings size={20} />,
      path: "/admin/settings",
    },
  ];

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <aside
        className={`fixed md:static z-30 h-full bg-gray-900 text-gray-100 w-64 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">AdminPanel</h2>
          <button className="md:hidden" onClick={() => setOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-3">
          {menu.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-lg transition ${
                  isActive ? "bg-gray-800" : "hover:bg-gray-800"
                }`
              }
              onClick={() => setOpen(false)}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-4 w-full px-4">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full text-left bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg"
          >
            <LogOut size={18} /> Déconnexion
          </button>
        </div>
      </aside>
    </>
  );
}
