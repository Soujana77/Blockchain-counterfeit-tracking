import { Link } from "react-router-dom";

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

          <Link
            to="/"
            className="hover:text-cyan-400 transition"
          >
            Home
          </Link>

          <Link
            to="/verify"
            className="hover:text-cyan-400 transition"
          >
            Verify
          </Link>

          <Link
            to="/scanner"
            className="hover:text-cyan-400 transition"
          >
            Scan QR
          </Link>

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
            "
          >

            Manufacturer Portal

          </Link>

        </div>

      </div>

    </nav>
  );
}