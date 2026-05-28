import { useLocation } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";

import AppRoutes from "./routes/AppRoutes";

export default function App() {

  const location = useLocation();

  // 🔐 Admin Pages
  const adminRoutes = [

    "/dashboard",
    "/medicine",
    "/transfer"
  ];

  const isAdminPage =

    adminRoutes.includes(location.pathname);

  return (

    <div>

      {/* ✅ Global Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0f172a",
            color: "#fff",
            border: "1px solid #334155",
          },
        }}
      />

      {/* 🌍 Show Navbar Only On Public Pages */}
      {!isAdminPage && <Navbar />}

      <AppRoutes />

    </div>
  );
}