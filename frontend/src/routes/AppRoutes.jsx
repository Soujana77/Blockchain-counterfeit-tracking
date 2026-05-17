import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Verify from "../pages/Verify";
import Medicine from "../pages/Medicine";
import AdminDashboard from "../pages/AdminDashboard";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/add-medicine" element={<Medicine />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default AppRoutes;