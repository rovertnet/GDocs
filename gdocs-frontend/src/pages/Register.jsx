import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { register as registerService } from "../services/authService";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerService(data);
      toast.success("Inscription réussie ! Vous pouvez vous connecter.");
      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || "Erreur d’inscription");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 bg-white shadow-md rounded w-96"
      >
        <h2 className="text-xl font-bold mb-4">Inscription</h2>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          {...register("email", { required: "Email obligatoire" })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          type="text"
          placeholder="Nom d’utilisateur"
          className="border p-2 w-full mb-3"
          {...register("username", { required: "Nom d’utilisateur obligatoire" })}
        />
        {errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}
        <input
          type="password"
          placeholder="Mot de passe"
          className="border p-2 w-full mb-3"
          {...register("password", {
            required: "Mot de passe obligatoire",
            minLength: { value: 6, message: "Min 6 caractères" },
          })}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          S’inscrire
        </button>
      </form>
    </div>
  );
}
