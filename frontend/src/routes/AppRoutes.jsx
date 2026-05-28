import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

// 🌍 Public Pages
import LandingPage from "../pages/LandingPage";
import Verify from "../pages/Verify";
import Login from "../pages/Login";

// 🔐 Admin Pages
import AdminDashboard from "../pages/AdminDashboard";
import Medicine from "../pages/Medicine";
import TransferOwnership from "../pages/TransferOwnership";

// 🔒 Protection
import ProtectedRoute from "../components/ProtectedRoute";

// 🧭 Layout
import AdminLayout from "../layouts/AdminLayout";

// ==============================
// ROLE PROTECTION
// ==============================
const RoleProtectedRoute = ({
  children,
  allowedRoles
}) => {

  const role =
    localStorage.getItem("userRole");

  if (!allowedRoles.includes(role)) {

    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default function AppRoutes() {

  return (

    <Routes>

      {/* 🌍 PUBLIC ROUTES */}
      <Route
        path="/"
        element={<LandingPage />}
      />

      <Route
        path="/verify"
        element={<Verify />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      {/* 🔐 PROTECTED ADMIN ROUTES */}
      <Route
        element={
          <ProtectedRoute>

            <AdminLayout />

          </ProtectedRoute>
        }
      >

        {/* COMMON DASHBOARD */}
        <Route
          path="/dashboard"
          element={<AdminDashboard />}
        />

        {/* MANUFACTURER ONLY */}
        <Route
          path="/medicine"
          element={
            <RoleProtectedRoute
              allowedRoles={[
                "manufacturer"
              ]}
            >

              <Medicine />

            </RoleProtectedRoute>
          }
        />

        {/* DISTRIBUTOR + WHOLESALER */}
        <Route
          path="/transfer"
          element={
            <RoleProtectedRoute
              allowedRoles={[
                "distributor",
                "wholesaler"
              ]}
            >

              <TransferOwnership />

            </RoleProtectedRoute>
          }
        />

      </Route>

    </Routes>
  );
}