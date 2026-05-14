const express = require("express");
const { Web3 } = require("web3");
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
const contractAddress = "0xfB6b898E1f6bE2fE5DD2c21091835803f2bb0f0b";

const abi = 
    [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_id",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_manufacturer",
        "type": "string"
      }
    ],
    "name": "addMedicine",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_id",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_id",
        "type": "string"
      }
    ],
    "name": "getOwnershipHistory",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "medicines",
    "outputs": [
      {
        "internalType": "string",
        "name": "id",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "manufacturer",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "exists",
        "type": "bool"
      },
      {
        "internalType": "address",
        "name": "currentOwner",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_id",
        "type": "string"
      }
    ],
    "name": "verifyMedicine",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
  

// ==============================
// 🧠 Contract Instance
// ==============================
const contract = new web3.eth.Contract(abi, contractAddress);

// ==============================
// 👤 Get Default Account
// ==============================
let account;

async function init() {
  const accounts = await web3.eth.getAccounts();
  account = accounts[0];
  console.log("Using account:", account);
}

init();

// ==============================
// 🚀 ROUTES
// ==============================

// Root route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Add Medicine
app.post("/api/addMedicine", async (req, res) => {

  try {

    const { id, name, manufacturer } = req.body;

    await contract.methods
      .addMedicine(id, name, manufacturer)
      .send({
        from: account,
        gas: 3000000
      });

    res.json({
      message: "Medicine added successfully ✅"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });
  }
});

// Get Medicine
app.get("/api/getMedicine/:id", async (req, res) => {
  try {
    const result = await contract.methods
      .verifyMedicine(req.params.id)
      .call();

   res.json({
  message: "Medicine fetched successfully",
  data: {
    batchId: result[0],
    name: result[1],
    manufacturer: result[2],
    currentOwner: result[3]
  }
});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

  // 📜 Get Ownership History
app.get("/api/getHistory/:id", async (req, res) => {

  try {

    const history = await contract.methods
      .getOwnershipHistory(req.params.id)
      .call();

    res.json({
      message: "Ownership history fetched",
      history
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });
  }
});

// Transfer Ownership
app.post("/api/transferOwnership", async (req, res) => {
  try {
    const { id, newOwner } = req.body;

    await contract.methods.transferOwnership(id, newOwner).send({
      from: account,
      gas: 3000000
    });

    res.json({ message: "Ownership transferred successfully 🔄" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==============================
// 🟢 START SERVER
// ==============================
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});