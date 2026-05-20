
import { Link } from "react-router-dom";

import {
  ShieldCheck,
  ScanLine,
  LayoutDashboard,
  Home
} from "lucide-react";

export default function Navbar() {

  return (

    <nav
      className="
        fixed
        top-0
        left-0
        w-full
        z-50
        bg-[#020617]/90
        backdrop-blur-lg
        border-b
        border-cyan-500/10
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          py-4
          flex
          items-center
          justify-between
        "
      >

        {/* LOGO */}
        <Link
          to="/"
          className="
            text-2xl
            font-bold
            text-cyan-400
            tracking-wide
          "
        >

          MediChain

        </Link>

        {/* NAV LINKS */}
        <div
          className="
            flex
            items-center
            gap-6
            text-sm
            md:text-base
          "
        >

          {/* HOME */}
          <Link
            to="/"
            className="
              hover:text-cyan-400
              transition
              flex
              items-center
              gap-2
            "
          >

            <Home size={18} />

            Home

          </Link>

          {/* VERIFY */}
          <Link
            to="/verify"
            className="
              hover:text-cyan-400
              transition
              flex
              items-center
              gap-2
            "
          >

            <ShieldCheck size={18} />

            Verify

          </Link>

          {/* SCAN QR */}
          <Link
            to="/verify"
            className="
              hover:text-cyan-400
              transition
              flex
              items-center
              gap-2
            "
          >

            <ScanLine size={18} />

            Scan QR

          </Link>

          {/* MANUFACTURER PORTAL */}
          <Link
            to="/login"
            className="
              px-5
              py-2
              rounded-xl
              bg-cyan-500
              hover:bg-cyan-400
              text-slate-900
              font-semibold
              transition
              flex
              items-center
              gap-2
            "
          >

            <LayoutDashboard size={18} />

            Manufacturer Portal

          </Link>

        </div>

      </div>

    </nav>
  );
}