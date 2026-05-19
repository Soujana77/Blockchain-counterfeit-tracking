import { useState } from "react";
import QrScanner from "../components/QrScanner";
import ScanMap from "../components/ScanMap";

function Verify() {

  const [medicineId, setMedicineId] = useState("");
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState("");

  const [scanResult, setScanResult] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  const [history, setHistory] = useState([]);
  const [scanLogs, setScanLogs] = useState([]);

  // 🔍 Verify Medicine
const handleVerify = async (id) => {

  try {

    // 📍 Get Browser Location
    navigator.geolocation.getCurrentPosition(

      async (position) => {

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // 🔍 Verify Medicine + Send Location
        const res = await fetch(
          `http://127.0.0.1:8000/api/getMedicine/${id}?lat=${latitude}&lng=${longitude}`
        );

        if (!res.ok) {
          throw new Error("Not found");
        }

        const data = await res.json();

        // 📜 Ownership History
        const historyRes = await fetch(
          `http://127.0.0.1:8000/api/getHistory/${id}`
        );

        const historyData = await historyRes.json();

// 🌍 Fetch scan logs
const scanRes = await fetch(
  `http://127.0.0.1:8000/api/scanHistory/${id}`
);

const scanData = await scanRes.json();

setResult(data.data);

setHistory(historyData.history);

setScanLogs(scanData.logs);

setStatus("authentic");
      },

      (error) => {

        console.log(error);

        alert("Location access denied");
      }

    );

  } catch (error) {

    setResult(null);

    setHistory([]);

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
  
// ⏰ Expiry Check
const isExpired =
  result?.expiryDate &&
  new Date(result.expiryDate) < new Date();

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
          <div className="mt-6 p-6 bg-green-900/40 border border-green-500 rounded-xl">

            <h3 className="text-green-400 font-semibold text-2xl mb-4">
              ✅ Authentic Medicine
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

  <div className="bg-slate-800/50 p-4 rounded-xl">
    <p className="text-cyan-400 font-semibold">
      Medicine ID
    </p>
    <p>{result.batchId}</p>
  </div>

  <div className="bg-slate-800/50 p-4 rounded-xl">
    <p className="text-cyan-400 font-semibold">
      Medicine Name
    </p>
    <p>{result.name}</p>
  </div>

  <div className="bg-slate-800/50 p-4 rounded-xl">
    <p className="text-cyan-400 font-semibold">
      Manufacturer
    </p>
    <p>{result.manufacturer}</p>
  </div>

  <div className="bg-slate-800/50 p-4 rounded-xl break-words">
    <p className="text-cyan-400 font-semibold">
      Current Owner
    </p>
    <p>{result.currentOwner}</p>
  </div>

  <div className="bg-slate-800/50 p-4 rounded-xl">
    <p className="text-cyan-400 font-semibold">
      Batch Number
    </p>
    <p>{result.batchNumber}</p>
  </div>

  <div className="bg-slate-800/50 p-4 rounded-xl">
    <p className="text-cyan-400 font-semibold">
      Dosage
    </p>
    <p>{result.dosage}</p>
  </div>

  <div className="bg-slate-800/50 p-4 rounded-xl">
    <p className="text-cyan-400 font-semibold">
      Manufacturing Date
    </p>
    <p>{result.manufacturingDate}</p>
  </div>

  <div className="bg-slate-800/50 p-4 rounded-xl">
    <p className="text-cyan-400 font-semibold">
      Expiry Date
    </p>
    <p>{result.expiryDate}</p>
  </div>

  <div className="bg-slate-800/50 p-4 rounded-xl">
    <p className="text-cyan-400 font-semibold">
      Total Scans
    </p>
    <p>{result.scanCount}</p>
  </div>

</div>
{/* ⏰ Expiry Warning */}
{isExpired && (

  <div className="mt-5 p-4 bg-red-900/40 border border-red-500 rounded-xl">

    <h3 className="text-red-400 font-bold text-lg">

      ⚠ Expired Medicine Detected

    </h3>

    <p className="text-slate-300 mt-2">

      This medicine has crossed its expiry date
      and may not be safe for consumption.

    </p>

  </div>
)}
{/* DESCRIPTION */}
<div className="mt-5 bg-slate-800/50 p-5 rounded-xl">

  <p className="text-cyan-400 font-semibold mb-2">
    Description
  </p>

  <p className="text-slate-300 leading-relaxed">
    {result.description}
  </p>

</div>

{/* 🚨 Suspicious Warnings */}
{result.suspicious && result.warnings?.length > 0 && (

  <div className="mt-6 p-4 bg-red-900/40 border border-red-500 rounded-xl">

    <h3 className="text-red-400 font-bold text-lg mb-3">
      🚨 Suspicious Activity Detected
    </h3>

    <div className="space-y-3">

      {result.warnings.map((warning, index) => (

        <div
          key={index}
          className="p-3 bg-red-950/40 rounded-lg border border-red-500/30"
        >

          <p className="text-red-300 font-semibold">
            {warning}
          </p>

        </div>

      ))}

    </div>

  </div>
)}

{/* OWNERSHIP HISTORY */}
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

               {/* 🌍 MAP */}
        {scanLogs.length > 0 && (
          <ScanMap logs={scanLogs} />
        )}
      </div>
      </div>
    </div>
  );
}

export default Verify;