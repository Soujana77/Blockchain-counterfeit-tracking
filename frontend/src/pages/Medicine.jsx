import { useState } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";

export default function Medicine() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [result, setResult] = useState(null);
  const [newOwner, setNewOwner] = useState("");
  const [showQR, setShowQR] = useState(false);

  // ➕ Add Medicine
  const handleAdd = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/addMedicine",
        { id, name }
      );

      alert(res.data.message);

      // Show QR after successful add
      setShowQR(true);

    } catch (err) {
      alert(err.response?.data?.error || err.message);
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
      const res = await axios.post(
        "http://localhost:8000/api/transferOwnership",
        { id, newOwner }
      );

      alert(res.data.message);

    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        color: "white",
        paddingTop: "120px",
      }}
    >
      <h2>💊 Medicine Tracker</h2>

      {/* Medicine ID */}
      <input
        style={{
          padding: "10px",
          margin: "10px 0",
          width: "250px",
          backgroundColor: "#fff",
          color: "#000",
          borderRadius: "5px",
          border: "none"
        }}
        placeholder="Medicine ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <br />

      {/* Medicine Name */}
      <input
        style={{
          padding: "10px",
          margin: "10px 0",
          width: "250px",
          backgroundColor: "#fff",
          color: "#000",
          borderRadius: "5px",
          border: "none"
        }}
        placeholder="Medicine Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />

      {/* Buttons */}
      <button onClick={handleAdd}>Add Medicine</button>
      <button onClick={handleGet}>Get Medicine</button>

      <br /><br />

      {/* Transfer Ownership */}
      <input
        style={{
          padding: "10px",
          margin: "10px 0",
          width: "250px",
          backgroundColor: "#fff",
          color: "#000",
          borderRadius: "5px",
          border: "none"
        }}
        placeholder="New Owner Address"
        value={newOwner}
        onChange={(e) => setNewOwner(e.target.value)}
      />

      <br />

      <button onClick={handleTransfer}>
        Transfer Ownership
      </button>

      {/* QR CODE */}
      {showQR && (
        <div
          style={{
            marginTop: "30px",
            background: "#fff",
            display: "inline-block",
            padding: "20px",
            borderRadius: "10px"
          }}
        >
          <h3 style={{ color: "#000" }}>
            Medicine QR Code
          </h3>

          <QRCodeCanvas
            value={id}
            size={200}
          />

          <p style={{ color: "#000", marginTop: "10px" }}>
            ID: {id}
          </p>
        </div>
      )}

      {/* Result */}
      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Result:</h3>

          <p>ID: {result.batchId}</p>
          <p>Name: {result.name}</p>
          <p>Owner: {result.currentOwner}</p>
        </div>
      )}
    </div>
  );
}