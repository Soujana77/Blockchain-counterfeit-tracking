import { useState } from "react";
import QrScanner from "../components/QrScanner";

function Verify() {

  const [medicineId, setMedicineId] = useState("");
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState("");

  const [scanResult, setScanResult] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  // 🔍 Verify Medicine
  const handleVerify = async (id) => {

    try {

      const res = await fetch(
        `http://127.0.0.1:8000/api/getMedicine/${id}`
      );

      if (!res.ok) {
        throw new Error("Not found");
      }

      const data = await res.json();

      setResult(data.data);
      setStatus("authentic");

    } catch (error) {

      setResult(null);
      setStatus("fake");
    }
  };

  // 🔍 Button Verify
  const handleVerifyClick = () => {

    if (!medicineId) return;

    handleVerify(medicineId);
  };

  // 📷 QR Scan
  const handleScan = (data) => {

    if (data) {

      setScanResult(data);

      setMedicineId(data);

      // AUTO VERIFY
      handleVerify(data);
    }
  };

  return (
    <div className="min-h-screen text-white px-6 pt-28">

      {/* TITLE */}
      <h1 className="text-4xl font-bold text-center mb-10">
        Verify Medicine
      </h1>

      {/* MAIN CARD */}
      <div className="max-w-2xl mx-auto bg-slate-900/60 p-8 rounded-2xl border border-white/10">

        {/* INPUT */}
        <input
          type="text"
          placeholder="Enter Medicine ID"
          value={medicineId}
          onChange={(e) => setMedicineId(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-xl bg-slate-800 border border-white/10 outline-none"
        />

        {/* VERIFY BUTTON */}
        <button
          onClick={handleVerifyClick}
          className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-xl font-semibold"
        >
          Verify Medicine
        </button>

        {/* AUTHENTIC */}
        {status === "authentic" && result && (
          <div className="mt-6 p-4 bg-green-900/40 border border-green-500 rounded-xl">

            <h3 className="text-green-400 font-semibold text-lg mb-2">
              ✅ Authentic Medicine
            </h3>

            <p>ID: {result.batchId}</p>
            <p>Name: {result.name}</p>
            <p>Owner: {result.currentOwner}</p>

          </div>
        )}

        {/* FAKE */}
        {status === "fake" && (
          <div className="mt-6 p-4 bg-red-900/40 border border-red-500 rounded-xl">

            <h3 className="text-red-400 font-semibold text-lg">
              ❌ Fake / Not Found
            </h3>

          </div>
        )}

        {/* QR SECTION */}
        <div className="mt-10 text-center">

          <h2 className="text-xl font-semibold mb-4">
            Scan QR Code
          </h2>

          {/* TOGGLE */}
          <button
            onClick={() => setShowScanner(!showScanner)}
            className="mb-6 px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-xl font-semibold"
          >
            {showScanner ? "Stop Scanner" : "Start Scanner"}
          </button>

          {/* SCANNER */}
          {showScanner && (
            <div className="rounded-xl overflow-hidden border border-white/10 p-4">

              <QrScanner onScan={handleScan} />

            </div>
          )}

          {/* SCAN RESULT */}
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