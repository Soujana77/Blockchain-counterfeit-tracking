import { useState } from "react";

import axios from "axios";

import { QRCodeCanvas } from "qrcode.react";

import {
  Pill,
  PlusCircle,
  Search,
  RefreshCcw
} from "lucide-react";

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

  // ➕ ADD MEDICINE
  const handleAdd = async () => {

    try {

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

  // 🔍 GET MEDICINE
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

  // 🔄 TRANSFER OWNERSHIP
  const handleTransfer = async () => {

    try {

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

    <div className="min-h-screen bg-[#020617] text-white p-10">

      {/* HEADER */}
      <div className="mb-10">

        <div className="flex items-center gap-4 mb-3">

          <Pill
            size={45}
            className="text-cyan-400"
          />

          <h1
            className="
              text-5xl
              font-bold
              text-cyan-400
            "
          >

            Medicine Management

          </h1>

        </div>

        <p className="text-slate-400 text-lg">

          Register medicines, generate QR codes,
          and manage ownership securely.

        </p>

      </div>

      {/* MAIN GRID */}
      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-3
          gap-8
        "
      >

        {/* LEFT SECTION */}
        <div
          className="
            xl:col-span-2
            bg-slate-900/60
            border
            border-cyan-500/10
            rounded-3xl
            p-8
          "
        >

          <h2 className="text-2xl font-bold mb-8">

            Medicine Information

          </h2>

          {/* FORM GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <input
              placeholder="Medicine ID"
              value={id}
              onChange={(e) =>
                setId(e.target.value)
              }
              className="bg-slate-800 p-4 rounded-xl outline-none"
            />

            <input
              placeholder="Medicine Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="bg-slate-800 p-4 rounded-xl outline-none"
            />

            <input
              placeholder="Manufacturer"
              value={manufacturer}
              onChange={(e) =>
                setManufacturer(e.target.value)
              }
              className="bg-slate-800 p-4 rounded-xl outline-none"
            />

            <input
              placeholder="Batch Number"
              value={batchNumber}
              onChange={(e) =>
                setBatchNumber(e.target.value)
              }
              className="bg-slate-800 p-4 rounded-xl outline-none"
            />

            <input
              type="date"
              value={manufacturingDate}
              onChange={(e) =>
                setManufacturingDate(
                  e.target.value
                )
              }
              className="bg-slate-800 p-4 rounded-xl outline-none"
            />

            <input
              type="date"
              value={expiryDate}
              onChange={(e) =>
                setExpiryDate(
                  e.target.value
                )
              }
              className="bg-slate-800 p-4 rounded-xl outline-none"
            />

            <input
              placeholder="Dosage"
              value={dosage}
              onChange={(e) =>
                setDosage(e.target.value)
              }
              className="bg-slate-800 p-4 rounded-xl outline-none"
            />

          </div>

          {/* DESCRIPTION */}
          <textarea
            placeholder="Medicine Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            rows={5}
            className="
              w-full
              mt-6
              bg-slate-800
              p-4
              rounded-xl
              outline-none
            "
          />

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-5 mt-8">

            <button
              onClick={handleAdd}
              className="
                flex
                items-center
                gap-2
                px-7
                py-4
                rounded-xl
                bg-cyan-500
                hover:bg-cyan-400
                text-slate-900
                font-semibold
                transition
              "
            >

              <PlusCircle size={20} />

              Add Medicine

            </button>

            <button
              onClick={handleGet}
              className="
                flex
                items-center
                gap-2
                px-7
                py-4
                rounded-xl
                border
                border-cyan-400
                hover:bg-cyan-400/10
                font-semibold
                transition
              "
            >

              <Search size={20} />

              Get Medicine

            </button>

          </div>

          {/* OWNERSHIP */}
          <div className="mt-10">

            <h3 className="text-2xl font-bold mb-5">

              Transfer Ownership

            </h3>

            <div className="flex flex-col md:flex-row gap-4">

              <input
                placeholder="New Owner Address"
                value={newOwner}
                onChange={(e) =>
                  setNewOwner(e.target.value)
                }
                className="
                  flex-1
                  bg-slate-800
                  p-4
                  rounded-xl
                  outline-none
                "
              />

              <button
                onClick={handleTransfer}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  px-6
                  py-4
                  rounded-xl
                  bg-purple-500
                  hover:bg-purple-400
                  font-semibold
                  transition
                "
              >

                <RefreshCcw size={20} />

                Transfer

              </button>

            </div>

          </div>

        </div>

        {/* RIGHT SECTION */}
        <div
          className="
            bg-slate-900/60
            border
            border-cyan-500/10
            rounded-3xl
            p-8
          "
        >

          <h2 className="text-2xl font-bold mb-8">

            QR Preview

          </h2>

          {showQR ? (

            <div className="text-center">

              <div
                className="
                  bg-white
                  inline-block
                  p-5
                  rounded-2xl
                "
              >

                <QRCodeCanvas
                  value={id}
                  size={220}
                />

              </div>

              <p className="mt-5 text-slate-300">

                Medicine ID: {id}

              </p>

            </div>

          ) : (

            <div
              className="
                h-[300px]
                flex
                items-center
                justify-center
                text-slate-500
                border
                border-dashed
                border-slate-700
                rounded-2xl
              "
            >

              QR Preview Appears Here

            </div>

          )}

          {/* RESULT */}
          {result && (

            <div className="mt-10">

              <h3 className="text-2xl font-bold mb-5">

                Medicine Details

              </h3>

              <div className="space-y-4 text-slate-300">

                <p>
                  <span className="text-cyan-400">
                    ID:
                  </span>{" "}
                  {result.batchId}
                </p>

                <p>
                  <span className="text-cyan-400">
                    Name:
                  </span>{" "}
                  {result.name}
                </p>

                <p>
                  <span className="text-cyan-400">
                    Manufacturer:
                  </span>{" "}
                  {result.manufacturer}
                </p>

                <p>
                  <span className="text-cyan-400">
                    Owner:
                  </span>{" "}
                  {result.currentOwner}
                </p>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}