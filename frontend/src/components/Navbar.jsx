import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

import {
  ShieldCheck,
  LayoutDashboard,
  Home
} from "lucide-react";

export default function Navbar() {

  const [wallet, setWallet] = useState("");

  const [connecting, setConnecting] = useState(false);

  useEffect(() => {

    const savedWallet =
      localStorage.getItem("walletAddress");

    if (savedWallet) {

      setWallet(savedWallet);
    }

  }, []);

  const connectWallet = async () => {

    try {

      if (!window.ethereum) {

        alert("Install MetaMask");

        return;
      }

      setConnecting(true);

      const accounts =
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });

      const walletAddress = accounts[0];

      setWallet(walletAddress);

      localStorage.setItem(
        "walletAddress",
        walletAddress
      );

      setConnecting(false);

    } catch (err) {

      console.log("METAMASK ERROR:", err);

      alert(
        err.message || "Wallet connection failed"
      );

      setConnecting(false);
    }
  };

  return (

    <nav
      className="
        fixed
        top-0
        left-0
        w-full
        z-50
        bg-[#020617]
        border-b
        border-cyan-500/10
        shadow-lg
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
            text-white
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

            Verify Medicine

          </Link>

          {/* CONNECT WALLET */}
          <button
            onClick={() => {

              if (!wallet) {

                connectWallet();
              }
            }}
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

           {
  connecting
    ? "Connecting..."
    : wallet
      ? `Wallet Connected`
      : "Connect Wallet"
}
          </button>

        </div>

      </div>

    </nav>
  );
}