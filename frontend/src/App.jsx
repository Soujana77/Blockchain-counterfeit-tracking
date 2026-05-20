import { useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";

import AppRoutes from "./routes/AppRoutes";

export default function App() {

  const location = useLocation();

  // 🔐 Admin Pages
  const adminRoutes = [

    "/dashboard",
    "/medicine"
  ];

  const isAdminPage =

    adminRoutes.includes(location.pathname);

  return (

    <div>

      {/* 🌍 Show Navbar Only On Public Pages */}
      {!isAdminPage && <Navbar />}

      <AppRoutes />

    </div>
  );
}