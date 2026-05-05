import { useState } from "react";
import axios from "axios";

export default function Medicine() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [result, setResult] = useState(null);
  const [newOwner, setNewOwner] = useState("");

  const handleAdd = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/addMedicine",
        { id, name }
      );
      alert(res.data.message);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGet = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/getMedicine/${id}`
      );
      setResult(res.data);
    } catch {
      alert("Not found");
    }
  };

  const handleTransfer = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/transferOwnership",
        { id, newOwner }
      );
      alert(res.data.message);
    } catch (err) {
      alert(err.message);
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

      <input
  style={{
    padding: "10px",
    margin: "10px 0",
    width: "250px",
    backgroundColor: "#fff",
    color: "#000",   // 👈 IMPORTANT
    borderRadius: "5px",
    border: "none"
  }}
  placeholder="Medicine ID"
  value={id}
  onChange={(e) => setId(e.target.value)}
/>

      <br />

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

      <button onClick={handleAdd}>Add Medicine</button>
      <button onClick={handleGet}>Get Medicine</button>

      <br /><br />

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

      <button onClick={handleTransfer}>Transfer Ownership</button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Result:</h3>
          <p>ID: {result.id}</p>
          <p>Name: {result.name}</p>
          <p>Owner: {result.owner}</p>
        </div>
      )}
    </div>
  );
}