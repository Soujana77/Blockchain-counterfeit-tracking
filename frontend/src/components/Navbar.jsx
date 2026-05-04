import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-slate-950/70 border-b border-white/10">
      
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-3xl font-extrabold text-cyan-400 tracking-wide">
          MediChain
        </h1>

        <ul className="flex gap-8 items-center text-sm md:text-base font-medium">

          {/* Home */}
          <li>
            <Link
              to="/#home"
              className="text-white hover:text-cyan-400 transition duration-300"
            >
              Home
            </Link>
          </li>

          {/* Features */}
          <li>
            <Link
              to="/#features"
              className="text-white hover:text-cyan-400 transition duration-300"
            >
              Features
            </Link>
          </li>

          {/* Stats */}
          <li>
            <Link
              to="/#stats"
              className="text-white hover:text-cyan-400 transition duration-300"
            >
              Stats
            </Link>
          </li>

          {/* Verify */}
          <li>
            <Link
              to="/verify"
              className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold transition"
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