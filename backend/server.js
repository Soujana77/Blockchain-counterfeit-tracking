const express = require("express");
const Web3 = require("web3");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ==============================
// 🔗 Connect to Ganache
// ==============================
const web3 = new Web3("http://127.0.0.1:7545");

// ==============================
// 📌 Contract Details
// ==============================
const contractAddress = "0xcbC4F66f891c700Caa17539D04Ce876f73fda2E3";

const abi = [
  {
    "inputs": [
      { "internalType": "string", "name": "_id", "type": "string" },
      { "internalType": "string", "name": "_name", "type": "string" }
    ],
    "name": "addMedicine",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "", "type": "string" }
    ],
    "name": "medicines",
    "outputs": [
      { "internalType": "string", "name": "id", "type": "string" },
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "address", "name": "currentOwner", "type": "address" },
      { "internalType": "bool", "name": "exists", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_id", "type": "string" },
      { "internalType": "address", "name": "_newOwner", "type": "address" }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_id", "type": "string" }
    ],
    "name": "verifyMedicine",
    "outputs": [
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "address", "name": "", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// ==============================
// 🧠 Contract Instance
// ==============================
const contract = new web3.eth.Contract(abi, contractAddress);

// ==============================
// 👤 Default Ganache Account
// ==============================
let account;

web3.eth.getAccounts().then((accounts) => {
  account = accounts[0];
  console.log("Using account:", account);
});

// ==============================
// 🚀 ROUTES
// ==============================

// Root route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully!");
});

// Add Medicine
app.post("/addMedicine", async (req, res) => {
  try {
    const { id, name } = req.body;

    await contract.methods.addMedicine(id, name).send({
      from: account,
      gas: 3000000
    });

    res.json({
      success: true,
      message: "Medicine added successfully ✅"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get Medicine
app.get("/getMedicine/:id", async (req, res) => {
  try {
    const result = await contract.methods
      .verifyMedicine(req.params.id)
      .call();

    res.json({
      success: true,
      id: result[0],
      name: result[1],
      owner: result[2]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Verify Medicine
app.get("/verifyMedicine/:id", async (req, res) => {
  try {
    const result = await contract.methods
      .verifyMedicine(req.params.id)
      .call();

    res.json({
      success: true,
      id: result[0],
      name: result[1],
      owner: result[2]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Transfer Ownership
app.post("/transferOwnership", async (req, res) => {
  try {
    const { id, newOwner } = req.body;

    await contract.methods.transferOwnership(id, newOwner).send({
      from: account,
      gas: 3000000
    });

    res.json({
      success: true,
      message: "Ownership transferred successfully 🔄"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ==============================
// 🟢 START SERVER
// ==============================
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
