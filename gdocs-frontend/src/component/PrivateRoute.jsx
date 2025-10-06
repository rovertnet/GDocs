import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { token } = useAuth();

  // Si pas connecté → redirige vers login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Sinon → autorise l’accès
  return children;
}
