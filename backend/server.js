const express = require("express");
<<<<<<< Updated upstream
<<<<<<< HEAD
const Web3 = require("web3");
=======
const { Web3 } = require("web3");
>>>>>>> Stashed changes
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// 🔗 Connect to Ganache
const web3 = new Web3("http://127.0.0.1:7545");

<<<<<<< Updated upstream
// ⚠️ IMPORTANT: Replace with YOUR contract details
const contractAddress = "0x06a92657bfBf325EdbCa2A712334F66a0f2B0aEc"; // no "..."
=======
// ==============================
// 📌 Contract Details
// ==============================
const contractAddress = "0xc8a53067Ba7d3b34620b9DF44D88046A843AAD8c";

>>>>>>> Stashed changes
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
  }
];

// 🧠 Create contract instance
const contract = new web3.eth.Contract(abi, contractAddress);

// 📌 Get default account
let account;
web3.eth.getAccounts().then(acc => {
  account = acc[0];
  console.log("Using account:", account);
});

// ==============================
// 🚀 ROUTES
// ==============================

// ➕ Add Medicine
app.post("/addMedicine", async (req, res) => {
  try {
    const { id, name } = req.body;

    await contract.methods
      .addMedicine(id, name)
      .send({ from: account, gas: 3000000 });

    res.send("Medicine added successfully ✅");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// 🔍 Get Medicine
app.get("/getMedicine/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = await contract.methods
      .verifyMedicine(id)
      .call();

    res.json({
      id: result[0],
      name: result[1],
      owner: result[2]
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// 🔁 Transfer Ownership
app.post("/transferOwnership", async (req, res) => {
  try {
    const { id, newOwner } = req.body;

    await contract.methods
      .transferOwnership(id, newOwner)
      .send({ from: account, gas: 3000000 });

    res.send("Ownership transferred successfully 🔄");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ==============================
// 🟢 START SERVER
// ==============================

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:3000`);
=======
const app = express();

app.use(express.json());

// Import routes
const medicineRoutes = require("./routes/medicineRoutes");

// Use routes
app.use("/api", medicineRoutes);

// Test root
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
>>>>>>> 0c2ca10f470da7e1fdedd5a1ff2feabcbd564c30
});