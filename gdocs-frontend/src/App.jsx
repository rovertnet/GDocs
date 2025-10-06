import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./component/PrivateRoute";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import AdminLayout from "./layouts/AdminLayout";
import { Toaster } from "react-hot-toast";
import AdminDashboard from "./pages/DashboardAdmin";
import Users from "./pages/Users";
import Settings from "./pages/Settings";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Routes Admin protégées */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["admin", "super-admin"]}>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>

      <Toaster position="top-right" />
    </>
  );
}

export default App;
