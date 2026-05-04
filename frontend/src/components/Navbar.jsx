// Navbar Component
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="
        fixed top-0 left-0 w-full z-50
        bg-slate-950/90
        backdrop-blur-lg
        border-b border-white/10
      "
    >
      <div
        className="
          w-full
          px-10
          py-4
          flex items-center justify-between
        "
      >
        {/* Logo */}
        <h1 className="text-3xl font-extrabold text-cyan-400 tracking-wide">
          MediChain
        </h1>

        {/* Navigation Links */}
        <ul className="flex items-center gap-8 text-sm md:text-base font-medium">

          {/* Home */}
          <li>
            <Link
              to="/"
              className="
                text-white
                transition duration-300
                hover:text-cyan-400
                hover:scale-105
              "
            >
              Home
            </Link>
          </li>

          {/* Features (scroll to section) */}
          <li>
            <a
              href="#features"
              className="
                text-white
                transition duration-300
                hover:text-cyan-400
                hover:scale-105
              "
            >
              Features
            </a>
          </li>

          {/* Stats (scroll to section) */}
          <li>
            <a
              href="#stats"
              className="
                text-white
                transition duration-300
                hover:text-cyan-400
                hover:scale-105
              "
            >
              Stats
            </a>
          </li>

          {/* Verify Button */}
          <li>
            <Link
              to="/verify"
              className="
                px-5 py-2 rounded-xl
                bg-cyan-500
                hover:bg-cyan-400
                text-slate-900
                font-semibold
                transition-all duration-300
                hover:scale-105
              "
            >
              Verify
            </Link>
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;