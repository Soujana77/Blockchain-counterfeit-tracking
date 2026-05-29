import { useState } from "react";

import axios from "axios";
import jsPDF from "jspdf";

import {
  ShieldCheck,
  Search,
  AlertTriangle,
  MapPinned,
  FileCheck,
QrCode,
ArrowDown
} from "lucide-react";

import ScanMap from "../components/ScanMap";

import QrScanner from "../components/QrScanner";

export default function Verify() {

  const [medicineId, setMedicineId] = useState("");

  const [result, setResult] = useState(null);

  const [status, setStatus] = useState("");

  const [history, setHistory] = useState([]);

  const [showScanner, setShowScanner] = useState(false);
const role = localStorage.getItem("userRole");
const [markingSold, setMarkingSold] = useState(false);
const handleMarkSold = async () => {

  try {

    setMarkingSold(true);

    const response = await axios.post(
      "http://localhost:8000/api/markSold",
      {
        medicineId: result.batchId
      }
    );

    alert(response.data.message);

    setResult({
      ...result,
      sold: true
    });

  } catch (error) {

    alert(
      error.response?.data?.error ||
      "Failed to mark medicine as sold"
    );

  } finally {

    setMarkingSold(false);
  }
};
// 📄 DOWNLOAD REPORT
const downloadReport = () => {

  if (!result) return;

  const doc = new jsPDF();

  doc.setFontSize(22);

  doc.text(
    "Medicine Verification Report",
    20,
    20
  );

  doc.setFontSize(14);

  doc.text(
    `Medicine ID: ${result.batchId}`,
    20,
    40
  );

  doc.text(
    `Medicine Name: ${result.name}`,
    20,
    55
  );

  doc.text(
    `Manufacturer: ${result.manufacturer}`,
    20,
    70
  );

  doc.text(
    `Current Owner: ${result.currentOwner}`,
    20,
    85
  );

  doc.text(
    `Total Scans: ${result.scanCount}`,
    20,
    100
  );

  doc.text(
    `Verification Status: Authentic`,
    20,
    115
  );

  doc.text(
    `Suspicious Activity: ${
      result.suspicious
        ? "YES"
        : "NO"
    }`,
    20,
    130
  );
{/* SUPPLY CHAIN TIMELINE */}
<div
  className="
    mt-10
    bg-slate-900/40
    rounded-2xl
    p-6
  "
>

  <div className="flex items-center gap-3 mb-8">

    <ShieldCheck
      size={30}
      className="text-cyan-400"
    />

    <h2 className="text-2xl font-bold">

      Supply Chain Timeline

    </h2>

  </div>

  <div className="flex flex-col items-center">

    {/* MANUFACTURER */}
    <div
      className="
        w-full
        bg-cyan-500/10
        border
        border-cyan-400/20
        rounded-2xl
        p-5
      "
    >

      <p className="text-cyan-400 text-sm mb-2">

        Manufacturer

      </p>

      <h3 className="font-semibold text-lg">

        {result.manufacturer}

      </h3>

    </div>

    {/* TIMELINE */}
    {history.length > 0 && history.map((owner, index) => (

      <div
        key={index}
        className="w-full flex flex-col items-center"
      >

        {/* ARROW */}
        <ArrowDown
          size={28}
          className="text-cyan-400 my-3"
        />

        {/* OWNER CARD */}
        <div
          className="
            w-full
            bg-slate-800
            border
            border-slate-700
            rounded-2xl
            p-5
          "
        >

          <p className="text-slate-400 text-sm mb-2">

            Ownership Transfer #{index + 1}

          </p>

          <h3 className="font-semibold break-all">

            {owner}

          </h3>

        </div>

      </div>
    ))}

    {/* CUSTOMER */}
    <ArrowDown
      size={28}
      className="text-green-400 my-3"
    />

    <div
      className="
        w-full
        bg-green-500/10
        border
        border-green-400/20
        rounded-2xl
        p-5
      "
    >

      <p className="text-green-400 text-sm mb-2">

        Verified By Customer

      </p>

      <h3 className="font-semibold">

        Blockchain Verification Successful

      </h3>

    </div>

  </div>

</div>
  // Ownership history
  doc.text(
    "Ownership History:",
    20,
    150
  );

  let y = 165;

  history.forEach((owner, index) => {

    doc.text(
      `${index + 1}. ${owner}`,
      25,
      y
    );

    y += 12;
  });

  doc.save(
    `${result.batchId}_Verification_Report.pdf`
  );
};
  // ==============================
  // VERIFY MEDICINE
  // ==============================
  const verifyMedicine = async (idToVerify) => {

    try {

      navigator.geolocation.getCurrentPosition(

        async (position) => {

          try {

            const lat = position.coords.latitude;

            const lng = position.coords.longitude;

            // ✅ Verify medicine
            const res = await axios.get(
              `http://localhost:8000/api/getMedicine/${idToVerify}?lat=${lat}&lng=${lng}`
            );

            setResult(res.data.data);

            // ✅ Fetch ownership history
            const historyRes = await axios.get(
              `http://localhost:8000/api/getHistory/${idToVerify}`
            );

            setHistory(historyRes.data.history);

            setStatus("authentic");

          } catch (err) {

            console.log(err);

            setStatus("fake");

            alert(
              err.response?.data?.error ||
              "Medicine not found"
            );
          }
        }
      );

    } catch (err) {

      console.log(err);

      setStatus("fake");

      alert(
        err.response?.data?.error ||
        "Medicine not found"
      );
    }
  };

  // ==============================
  // MANUAL VERIFY
  // ==============================
  const handleVerify = () => {

    verifyMedicine(medicineId);
  };

  // ==============================
  // QR SCAN
  // ==============================
  const handleScan = async (decodedText) => {

    setMedicineId(decodedText);

    setShowScanner(false);

    verifyMedicine(decodedText);
  };

  return (

    <div className="min-h-screen bg-[#020617] text-white px-6 py-16">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-14">

          <div className="flex justify-center mb-5">

            <ShieldCheck
              size={70}
              className="text-cyan-400"
            />

          </div>

          <h1
            className="
              text-5xl
              md:text-6xl
              font-bold
              mb-5
            "
          >

            Medicine Verification

          </h1>

          <p
            className="
              text-slate-400
              text-lg
              max-w-3xl
              mx-auto
            "
          >

            Verify pharmaceutical authenticity
            using blockchain validation,
            QR intelligence, and counterfeit analysis.

          </p>

        </div>

        {/* SEARCH BOX */}
        <div
          className="
            bg-slate-900/60
            border
            border-cyan-500/10
            rounded-3xl
            p-8
            max-w-3xl
            mx-auto
            mb-12
          "
        >

          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              placeholder="Enter Medicine ID"
              value={medicineId}
              onChange={(e) =>
                setMedicineId(e.target.value)
              }
              className="
                flex-1
                bg-slate-800
                p-5
                rounded-2xl
                outline-none
                border
                border-transparent
                focus:border-cyan-400
              "
            />

            <button
              onClick={handleVerify}
              className="
                flex
                items-center
                justify-center
                gap-2
                px-8
                py-5
                rounded-2xl
                bg-cyan-500
                hover:bg-cyan-400
                text-slate-900
                font-bold
                transition
              "
            >

              <Search size={22} />

              Verify

            </button>

            {/* QR BUTTON */}
            <button
              onClick={() =>
                setShowScanner(!showScanner)
              }
              className="
                flex
                items-center
                justify-center
                gap-2
                px-6
                py-5
                rounded-2xl
                bg-purple-500
                hover:bg-purple-400
                text-white
                font-bold
                transition
              "
            >

              <QrCode size={22} />

              Scan QR

            </button>

          </div>

          {/* QR SCANNER */}
          {showScanner && (

            <div className="mt-8">

              <QrScanner onScan={handleScan} />

            </div>

          )}

        </div>

        {/* AUTHENTIC RESULT */}
        {status === "authentic" && result && (

          <div
            className="
              bg-green-900/20
              border
              border-green-500/30
              rounded-3xl
              p-8
              mb-10
            "
          >

            <div className="flex items-center gap-4 mb-8">

              <ShieldCheck
                size={40}
                className="text-green-400"
              />

              <h2
                className="
                  text-3xl
                  font-bold
                  text-green-400
                "
              >

                Authentic Medicine Verified

              </h2>
              {result.sold && (

  <div
    className="
      mt-4
      px-4
      py-2
      rounded-xl
      bg-green-500/20
      border
      border-green-400/30
      text-green-300
      font-semibold
    "
  >

    ✅ SOLD TO CUSTOMER

  </div>

)}
<button
  onClick={downloadReport}
  className="
    mt-5
    px-5
    py-3
    bg-cyan-500
    hover:bg-cyan-400
    rounded-xl
    text-slate-900
    font-semibold
    transition
  "
>

  Download Verification Report

</button>
{role === "pharmacy" && !result.sold && (

  <button
    onClick={handleMarkSold}
    disabled={markingSold}
    className="
      ml-4
      mt-5
      px-5
      py-3
      bg-green-600
      hover:bg-green-500
      rounded-xl
      text-white
      font-semibold
      transition
    "
  >

    {
      markingSold
        ? "Processing..."
        : "Mark As Sold"
    }

  </button>

)}
            </div>

            {/* DETAILS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="bg-slate-900/40 p-5 rounded-2xl">

                <p className="text-slate-400 mb-2">
                  Medicine ID
                </p>

                <h3 className="text-xl font-semibold">

                  {result.batchId}

                </h3>

              </div>

              <div className="bg-slate-900/40 p-5 rounded-2xl">

                <p className="text-slate-400 mb-2">
                  Medicine Name
                </p>

                <h3 className="text-xl font-semibold">

                  {result.name}

                </h3>

              </div>

              <div className="bg-slate-900/40 p-5 rounded-2xl">

                <p className="text-slate-400 mb-2">
                  Manufacturer
                </p>

                <h3 className="text-xl font-semibold">

                  {result.manufacturer}

                </h3>

              </div>

              <div className="bg-slate-900/40 p-5 rounded-2xl">

                <p className="text-slate-400 mb-2">
                  Total Scans
                </p>

                <h3 className="text-xl font-semibold">

                  {result.scanCount}

                </h3>

              </div>

              {/* CURRENT OWNER */}
              <div className="bg-slate-900/40 p-5 rounded-2xl md:col-span-2">

                <p className="text-slate-400 mb-2">
                  Current Owner
                </p>

                <h3 className="text-lg font-semibold break-all">

                  {result.currentOwner}

                </h3>

              </div>

            </div>

            {/* OWNERSHIP HISTORY */}
            <div
              className="
                mt-10
                bg-slate-900/40
                rounded-2xl
                p-6
              "
            >

              <div className="flex items-center gap-3 mb-6">

                <FileCheck
                  size={30}
                  className="text-cyan-400"
                />

                <h2 className="text-2xl font-bold">

                  Ownership History

                </h2>

              </div>

              <div className="space-y-4">

                {history.length > 0 ? (

                  history.map((owner, index) => (

                    <div
                      key={index}
                      className="
                        bg-slate-800
                        p-4
                        rounded-xl
                        border
                        border-slate-700
                      "
                    >

                      <p className="text-slate-400 text-sm mb-2">

                        Owner #{index + 1}

                      </p>

                      <p className="break-all font-semibold">

                        {owner}

                      </p>

                    </div>
                  ))

                ) : (

                  <p className="text-slate-400">

                    No ownership history found.

                  </p>

                )}

              </div>

            </div>

            {/* WARNING */}
            {result.suspicious && (

              <div
                className="
                  mt-8
                  bg-red-900/30
                  border
                  border-red-500/30
                  rounded-2xl
                  p-6
                "
              >

                <div className="flex items-center gap-3">

                  <AlertTriangle
                    size={30}
                    className="text-red-400"
                  />

                  <h3
                    className="
                      text-2xl
                      font-bold
                      text-red-400
                    "
                  >

                    Suspicious Activity Detected

                  </h3>

                </div>

                <p className="mt-4 text-slate-300">

                  Excessive scan activity detected
                  for this medicine.

                </p>

              </div>

            )}

          </div>

        )}

        {/* FAKE RESULT */}
        {status === "fake" && (

          <div
            className="
              bg-red-900/20
              border
              border-red-500/30
              rounded-3xl
              p-8
              text-center
            "
          >

            <AlertTriangle
              size={60}
              className="
                text-red-400
                mx-auto
                mb-5
              "
            />

            <h2
              className="
                text-4xl
                font-bold
                text-red-400
                mb-4
              "
            >

              Counterfeit Product Detected

            </h2>

            <p className="text-slate-300">

              This medicine could not be verified
              on blockchain records.

            </p>

          </div>

        )}

        {/* MAP */}
        {result && (

          <div
            className="
              mt-10
              bg-slate-900/60
              border
              border-cyan-500/10
              rounded-3xl
              p-8
            "
          >

            <div className="flex items-center gap-3 mb-6">

              <MapPinned
                size={35}
                className="text-cyan-400"
              />

              <h2 className="text-3xl font-bold">

                Scan Intelligence Map

              </h2>

            </div>

            <ScanMap />

          </div>

        )}

      </div>

    </div>
  );
}