import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { login, setAuthToken } from "../services/authService";

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
      const res = await login(data);
      const { token, user } = res.data; // attention au .data selon axios
      saveLogin(token, user);
      setAuthToken(token);

      toast.success("Connexion réussie 🎉");

      if (user.role === "super-admin") {
        navigate("/super-admin");
      } else {
        navigate("/admin");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Erreur de connexion");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 bg-white rounded-lg shadow space-y-4 w-96"
      >
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: "L’email est requis" })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="ex: admin@example.com"
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
            })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="********"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Rôle</label>
          <select
            {...register("role", { required: "Le rôle est obligatoire" })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Sélectionnez un rôle --</option>
            <option value="admin">Admin</option>
            <option value="super-admin">Super Admin</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-all duration-200"
        >
          {isSubmitting ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
