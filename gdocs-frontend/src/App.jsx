import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./component/PrivateRoute";
import Login from "./pages/Login";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardSuperAdmin from "./pages/DashboardSuperAdmin;";
import Unauthorized from "./pages/Unauthorized";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Dashboard Admin */}
      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <DashboardAdmin />
          </PrivateRoute>
        }
      />

      {/* Dashboard Super Admin */}
      <Route
        path="/super-admin"
        element={
          <PrivateRoute allowedRoles={["super-admin"]}>
            <DashboardSuperAdmin />
          </PrivateRoute>
        }
      />

      {/* Page Unauthorized */}
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
}

export default App;
