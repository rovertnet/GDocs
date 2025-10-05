import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children, allowedRoles }) {
  const { token, user } = useAuth();

  // Pas connecté => redirection login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Si des rôles sont définis et que l'utilisateur n'est pas autorisé
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" />; // page d'erreur/403 à créer
  }

  // Sinon, on autorise l'accès
  return children;
}
