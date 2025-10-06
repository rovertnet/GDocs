import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { login as apiLogin, setAuthToken } from "../services/authService";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { login: saveLogin } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await apiLogin(data); // appel API
      console.log("API response:", res); // dev
      const token = res.access_token; // ✅ récupère access_token
      if (!token) throw new Error("Aucun token reçu");

      saveLogin(token, null); // stocke dans le contexte
      setAuthToken(token); // configure axios

      toast.success("Connexion réussie 🎉");
      navigate("/admin", { replace: true }); // redirection
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Erreur de connexion");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 bg-white rounded-lg shadow space-y-4 w-96"
        autoComplete="off"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Connexion</h2>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: "L’email est requis" })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="admin@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Mot de passe</label>
          <input
            type="password"
            {...register("password", {
              required: "Le mot de passe est requis",
              minLength: { value: 6, message: "Au moins 6 caractères" },
            })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="********"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-all duration-200"
        >
          {isSubmitting ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
