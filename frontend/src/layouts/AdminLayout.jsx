import {
  LayoutDashboard,
  Pill,
  ShieldCheck,
  LogOut
} from "lucide-react";

import {
  Link,
  Outlet,
  useNavigate
} from "react-router-dom";
import { ArrowRightLeft } from "lucide-react";

export default function AdminLayout() {
const role =
  localStorage.getItem("userRole");
  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("isAuthenticated");

    navigate("/login");
  };

  return (

    <div className="min-h-screen flex bg-[#020617] text-white">

      {/* SIDEBAR */}
      <aside
        className="
          w-72
          bg-slate-900
          border-r
          border-cyan-500/10
          p-6
          flex
          flex-col
          justify-between
        "
      >

        <div>

          {/* LOGO */}
          <h1
            className="
              text-3xl
              font-bold
              text-cyan-400
              mb-12
            "
          >

          MediChain {role && `• ${role}`}

          </h1>

          {/* NAVIGATION */}
   <nav className="space-y-4">

  {/* DASHBOARD */}
  <Link
    to="/dashboard"
    className="
      flex
      items-center
      gap-3
      px-5
      py-3
      rounded-xl
      hover:bg-cyan-500/10
      transition
    "
  >

    <LayoutDashboard size={20} />

    Dashboard

  </Link>

  {/* MANUFACTURER */}
  {role === "manufacturer" && (

    <Link
      to="/medicine"
      className="
        flex
        items-center
        gap-3
        px-5
        py-3
        rounded-xl
        hover:bg-cyan-500/10
        transition
      "
    >

      <Pill size={20} />

      Medicine Management

    </Link>
  )}

  {/* DISTRIBUTOR / WHOLESALER */}
  {(role === "distributor" ||
    role === "wholesaler") && (

    <Link
      to="/transfer"
      className="
        flex
        items-center
        gap-3
        px-5
        py-3
        rounded-xl
        hover:bg-cyan-500/10
        transition
      "
    >

      <ArrowRightLeft size={20} />

      Transfer Ownership

    </Link>
  )}

  {/* PHARMACY */}
  {role === "pharmacy" && (

    <Link
      to="/verify"
      className="
        flex
        items-center
        gap-3
        px-5
        py-3
        rounded-xl
        hover:bg-cyan-500/10
        transition
      "
    >

      <ShieldCheck size={20} />

      Verify Medicine

    </Link>
  )}

  {/* COMMON */}
  <Link
    to="/verify"
    className="
      flex
      items-center
      gap-3
      px-5
      py-3
      rounded-xl
      hover:bg-cyan-500/10
      transition
    "
  >

    <ShieldCheck size={20} />

    Customer Verification

  </Link>

</nav>

        </div>

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="
            w-full
            py-3
            rounded-xl
            bg-red-500
            hover:bg-red-400
            text-white
            font-semibold
            transition
            flex
            items-center
            justify-center
            gap-2
          "
        >
          

          <LogOut size={18} />

          Logout

        </button>

      </aside>

      {/* PAGE CONTENT */}
      <main className="flex-1 overflow-y-auto p-10">

        <Outlet />

      </main>

    </div>
  );
}