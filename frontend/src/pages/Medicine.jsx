import { useState } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";

export default function Medicine() {

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
const [expiryDate, setExpiryDate] = useState("");
const [manufacturingDate, setManufacturingDate] = useState("");
const [dosage, setDosage] = useState("");
const [description, setDescription] = useState("");

  const [result, setResult] = useState(null);

  const [newOwner, setNewOwner] = useState("");

  const [showQR, setShowQR] = useState(false);
  

  // ➕ Add Medicine
  const handleAdd = async () => {

    try {

      if (!id || !name || !manufacturer) {

        alert("Please fill all fields");

        return;
      }

      const res = await axios.post(
        "http://localhost:8000/api/addMedicine",
        {
  id,
  name,
  manufacturer,
  batchNumber,
  expiryDate,
  manufacturingDate,
  dosage,
  description
}
      );

      alert(res.data.message);

      setShowQR(true);

    } catch (err) {

      alert(
        err.response?.data?.error || err.message
      );
    }
  };

  // 🔍 Get Medicine
  const handleGet = async () => {

    try {

      const res = await axios.get(
        `http://localhost:8000/api/getMedicine/${id}`
      );

      setResult(res.data.data);

    } catch {

      alert("Medicine not found");
    }
  };

  // 🔄 Transfer Ownership
  const handleTransfer = async () => {

    try {

      if (!id || !newOwner) {

        alert("Please enter ID and owner address");

        return;
      }

      const res = await axios.post(
        "http://localhost:8000/api/transferOwnership",
        {
          id,
          newOwner
        }
      );

      alert(res.data.message);

    } catch (err) {

      alert(
        err.response?.data?.error || err.message
      );
    }
  };

  return (

    <div className="min-h-screen text-white px-6 pt-28 bg-[#020617]">

      {/* PAGE TITLE */}
      <h1 className="text-5xl font-bold text-center mb-12 text-cyan-400">

        💊 Medicine Tracker

      </h1>

      {/* MAIN CARD */}
      <div className="max-w-3xl mx-auto bg-slate-900/70 border border-cyan-500/20 rounded-3xl p-8 shadow-2xl">

        {/* INPUTS */}
        <div className="grid gap-5">

          <input
            type="text"
            placeholder="Medicine ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full px-5 py-4 rounded-xl bg-slate-800 border border-white/10 outline-none focus:border-cyan-400"
          />

          <input
            type="text"
            placeholder="Medicine Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-5 py-4 rounded-xl bg-slate-800 border border-white/10 outline-none focus:border-cyan-400"
          />

          <input
            type="text"
            placeholder="Manufacturer"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            className="w-full px-5 py-4 rounded-xl bg-slate-800 border border-white/10 outline-none focus:border-cyan-400"
          />
          <input
  type="text"
  placeholder="Batch Number"
  value={batchNumber}
  onChange={(e) => setBatchNumber(e.target.value)}
  className="w-full px-5 py-4 rounded-xl bg-slate-800 border border-white/10 outline-none focus:border-cyan-400"
/>
<input
  type="date"
  value={manufacturingDate}
  onChange={(e) => setManufacturingDate(e.target.value)}
  className="w-full px-5 py-4 rounded-xl bg-slate-800 border border-white/10 outline-none focus:border-cyan-400"
/>
<input
  type="date"
  value={expiryDate}
  onChange={(e) => setExpiryDate(e.target.value)}
  className="w-full px-5 py-4 rounded-xl bg-slate-800 border border-white/10 outline-none focus:border-cyan-400"
/>
<input
  type="text"
  placeholder="Dosage (e.g. 500mg)"
  value={dosage}
  onChange={(e) => setDosage(e.target.value)}
  className="w-full px-5 py-4 rounded-xl bg-slate-800 border border-white/10 outline-none focus:border-cyan-400"
/>
<textarea
  placeholder="Medicine Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  className="w-full px-5 py-4 rounded-xl bg-slate-800 border border-white/10 outline-none focus:border-cyan-400"
  rows={4}
/>

        </div>

        {/* ACTION BUTTONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">

          <button
            onClick={handleAdd}
            className="py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold transition duration-300 shadow-lg"
          >
            ➕ Add Medicine
          </button>

          <button
            onClick={handleGet}
            className="py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold transition duration-300 shadow-lg"
          >
            🔍 Get Medicine
          </button>

        </div>

        {/* TRANSFER OWNERSHIP */}
        <div className="mt-10 border-t border-white/10 pt-8">

          <h2 className="text-2xl font-semibold mb-5 text-yellow-400">

            🔄 Transfer Ownership

          </h2>

          <input
            type="text"
            placeholder="New Owner Wallet Address"
            value={newOwner}
            onChange={(e) => setNewOwner(e.target.value)}
            className="w-full px-5 py-4 rounded-xl bg-slate-800 border border-white/10 outline-none focus:border-yellow-400"
          />

          <button
            onClick={handleTransfer}
            className="w-full mt-5 py-4 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold transition duration-300 shadow-lg"
          >
            🚀 Transfer Ownership
          </button>

        </div>

        {/* QR CODE */}
        {showQR && (

          <div className="mt-10 bg-white p-8 rounded-2xl text-center">

            <h3 className="text-2xl font-bold text-slate-900 mb-5">

              📷 Medicine QR Code

            </h3>

            <div className="flex justify-center">

              <QRCodeCanvas
                value={id}
                size={220}
              />

            </div>

            <p className="mt-5 text-slate-900 font-semibold">

              Medicine ID: {id}

            </p>

          </div>
        )}

        {/* RESULT */}
        {result && (

          <div className="mt-10 p-6 rounded-2xl bg-emerald-900/30 border border-emerald-500">

            <h3 className="text-3xl font-bold text-emerald-400 mb-5">

              ✅ Medicine Details

            </h3>

            <div className="space-y-3 text-lg">

              <p>
                <span className="text-cyan-400 font-semibold">
                  ID:
                </span>{" "}
                {result.batchId}
              </p>

              <p>
                <span className="text-cyan-400 font-semibold">
                  Name:
                </span>{" "}
                {result.name}
              </p>

              <p>
                <span className="text-cyan-400 font-semibold">
                  Manufacturer:
                </span>{" "}
                {result.manufacturer}
              </p>

              <p className="break-words">
                <span className="text-cyan-400 font-semibold">
                  Current Owner:
                </span>{" "}
                {result.currentOwner}
              </p>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}