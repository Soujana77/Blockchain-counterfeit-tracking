import { useLocation } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";

import AppRoutes from "./routes/AppRoutes";

export default function App() {

  const location = useLocation();

  // ✅ Admin Pages
  const adminRoutes = [

    "/dashboard",
    "/medicine",
    "/transfer"
  ];

  // ✅ Hide Public Navbar On Admin Pages
  const isAdminPage =

    adminRoutes.some((route) =>
      location.pathname.startsWith(route)
    );

  return (

    <div className="bg-[#020617] min-h-screen text-white">

      {/* GLOBAL TOAST */}
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

      {/* PUBLIC NAVBAR */}
      {!isAdminPage && <Navbar />}

      {/* ROUTES */}
      <AppRoutes />

    </div>
  );
}