import { Routes, Route } from "react-router-dom";

// 🌍 Public Pages
import LandingPage from "../pages/LandingPage";
import Verify from "../pages/Verify";

import Login from "../pages/Login";

// 🔐 Admin Pages
import AdminDashboard from "../pages/AdminDashboard";
import Medicine from "../pages/Medicine";

// 🔒 Protection
import ProtectedRoute from "../components/ProtectedRoute";

// 🧭 Layout
import AdminLayout from "../layouts/AdminLayout";

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

        <Route
          path="/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/medicine"
          element={<Medicine />}
        />

      </Route>

    </Routes>
  );
}