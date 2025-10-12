import React, { useEffect, useState } from "react";
import { getUsers, addUser, deleteUser } from "../services/userService";
import { motion, AnimatePresence } from "framer-motion";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);


  // Modal création utilisateur
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role:"",
  });

  // Modal profil utilisateur
  const [selectedUser, setSelectedUser] = useState(null);

  // Charger tous les utilisateurs
  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erreur chargement utilisateurs :", err);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Création utilisateur
  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addUser(formData);
      setFormData({ name: "", email: "", password: "" });
      setIsCreateModalOpen(false);
      fetchUsers(); // mise à jour immédiate
    } catch (err) {
      console.error("Erreur création :", err);
    } finally {
      setLoading(false);
    }
  };

  // Suppression utilisateur
  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet utilisateur ?")) return;
    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Erreur suppression :", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Gestion des utilisateurs
        </h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Ajouter un utilisateur
        </button>
      </div>

      {/* Liste utilisateurs */}
      {users.length === 0 ? (
        <p className="text-gray-500 text-center">Aucun utilisateur trouvé.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <motion.div
              key={user.id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg cursor-pointer relative"
              whileHover={{ scale: 1.03 }}
            >
              <div onClick={() => setSelectedUser(user)}>
                <h3 className="font-bold text-lg text-gray-800">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-500 text-sm">{user.role}</p>
              </div>

              <button
                onClick={() => handleDelete(user.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold"
              >
                X
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal création utilisateur */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCreateModalOpen(false)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} // bloque la propagation du clic
            >
              <h2 className="text-xl font-semibold mb-4 text-center">
                Créer un utilisateur
              </h2>
              <form onSubmit={handleCreate} className="space-y-3">
                <input
                  type="text"
                  placeholder="Nom"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                  required
                />
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">-- Sélectionner un rôle --</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                </select>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {loading ? "Création..." : "Créer"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal affichage profil */}
      <AnimatePresence>
        {showModal && selectedUser && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6 w-96 relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center text-center">
                <img
                  src={selectedUser.avatar || defaultAvatar}
                  alt={selectedUser.name}
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
                <h2 className="text-2xl font-semibold mb-2">
                  {selectedUser.name}
                </h2>
                <p className="text-gray-500 mb-4">{selectedUser.email}</p>

                <div className="w-full text-left space-y-2">
                  <p>
                    <span className="font-medium">Rôle :</span>{" "}
                    {selectedUser.role}
                  </p>
                  <p>
                    <span className="font-medium">Créé le :</span>{" "}
                    {new Date(selectedUser.createdAt).toLocaleDateString()}
                  </p>
                  {selectedUser.updatedAt && (
                    <p>
                      <span className="font-medium">
                        Dernière mise à jour :
                      </span>{" "}
                      {new Date(selectedUser.updatedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}