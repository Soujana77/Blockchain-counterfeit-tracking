import { useState } from "react";

import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("manufacturer");

  const handleLogin = (e) => {

    e.preventDefault();

    // ✅ Simple Demo Authentication
    if (
      email &&
      password
    ) {

      localStorage.setItem(
        "isAuthenticated",
        "true"
      );

      localStorage.setItem(
        "userRole",
        role
      );

      navigate("/dashboard");

    } else {

      alert("Enter credentials");
    }
  };

  return (

    <div
      className="
        min-h-screen
        bg-[#020617]
        flex
        items-center
        justify-center
        px-6
      "
    >

      <form
        onSubmit={handleLogin}
        className="
          w-full
          max-w-md
          bg-slate-900/70
          border
          border-cyan-500/20
          rounded-3xl
          p-8
          backdrop-blur-lg
        "
      >

        <h2
          className="
            text-4xl
            font-bold
            text-cyan-400
            text-center
            mb-8
          "
        >

          🔐 Supply Chain Login

        </h2>

        {/* ROLE */}
        <select
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
          className="
            w-full
            mb-5
            px-5
            py-4
            rounded-xl
            bg-slate-800
            border
            border-white/10
            outline-none
            focus:border-cyan-400
          "
        >

          <option value="manufacturer">
            Manufacturer
          </option>

          <option value="distributor">
            Distributor
          </option>

          <option value="wholesaler">
            Wholesaler
          </option>

          <option value="pharmacy">
            Pharmacy
          </option>

        </select>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="
            w-full
            mb-5
            px-5
            py-4
            rounded-xl
            bg-slate-800
            border
            border-white/10
            outline-none
            focus:border-cyan-400
          "
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="
            w-full
            mb-6
            px-5
            py-4
            rounded-xl
            bg-slate-800
            border
            border-white/10
            outline-none
            focus:border-cyan-400
          "
        />

        {/* BUTTON */}
        <button
          type="submit"
          className="
            w-full
            py-4
            rounded-xl
            bg-cyan-500
            hover:bg-cyan-400
            text-slate-900
            font-bold
            transition
          "
        >

          Login

        </button>

      </form>

    </div>
  );
}