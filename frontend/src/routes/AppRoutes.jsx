import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Verify from "../pages/Verify";
import Medicine from "../pages/Medicine";
import AdminDashboard from "../pages/AdminDashboard";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/add-medicine" element={<Medicine />} />
      <Route path="/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
    </Routes>
  );
}

export default AppRoutes;