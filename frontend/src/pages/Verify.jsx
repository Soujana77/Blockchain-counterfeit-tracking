import { useState } from "react";
import QrScanner from "../components/QrScanner";

function Verify() {
  const [scanResult, setScanResult] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  return (
    <div className="min-h-screen text-white px-6 pt-28">

      {/* TITLE */}
      <h1 className="text-4xl font-bold text-center mb-10">
        Verify Medicine
      </h1>

      {/* MAIN CARD */}
      <div className="max-w-2xl mx-auto bg-slate-900/60 p-8 rounded-2xl border border-white/10">

        {/* Public Key */}
        <div className="mb-6">
          <label className="block mb-2 text-sm">Public Key</label>
          <input
            type="text"
            placeholder="Enter public key"
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none"
          />
        </div>

        {/* Private Key */}
        <div className="mb-6">
          <label className="block mb-2 text-sm">Private Key</label>
          <input
            type="text"
            placeholder="Enter private key"
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none"
          />
        </div>

        {/* Verify Button */}
        <button className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-xl font-semibold">
          Verify Medicine
        </button>

        {/* ================= QR SECTION (NOW INSIDE CARD) ================= */}

        <div className="mt-10 text-center">
          <h2 className="text-xl font-semibold mb-4">
            Scan QR Code
          </h2>

          {/* Toggle Button */}
          <button
            onClick={() => setShowScanner(!showScanner)}
            className="mb-6 px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-xl font-semibold"
          >
            {showScanner ? "Stop Scanner" : "Start Scanner"}
          </button>

          {/* Scanner */}
          {showScanner && (
            <div className="rounded-xl overflow-hidden border border-white/10">
              <QrScanner onScan={setScanResult} />
            </div>
          )}

          {/* Result */}
          {scanResult && (
            <div className="mt-6 p-4 bg-slate-800 rounded-xl border border-white/10">
              <p className="text-cyan-400 font-semibold">
                Scanned Data:
              </p>
              <p className="text-sm mt-2 break-words">
                {scanResult}
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Verify;