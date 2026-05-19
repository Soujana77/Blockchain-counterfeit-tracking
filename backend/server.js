const express = require("express");
const { Web3 } = require("web3");
const cors = require("cors");
const mongoose = require("mongoose");
const geolib = require("geolib");
const MedicineDetails = require("./models/MedicineDetails");

const app = express();
app.use(express.json());
app.use(cors());

// ==============================
// 🔗 Connect to Ganache
// ==============================
const web3 = new Web3("http://127.0.0.1:7545");

// ==============================
// 🍃 Connect MongoDB Atlas
// ==============================
mongoose.connect(
  "mongodb+srv://varshajanya77_db_user:STfarNTvAkF1dZxE@drug-traceability-db.5ak38uz.mongodb.net/drugtraceability?retryWrites=true&w=majority&appName=drug-traceability-db"
)

.then(() => {
  console.log("MongoDB Connected ✅");
})

.catch((err) => {
  console.log("MongoDB Error ❌", err);
});

// ==============================
// 📌 Contract Details
// ==============================
const contractAddress = "0x9f83111F05Dd0b05d0c3De0e844A939499C8AE00";

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
// 📜 Scan Log Schema
// ==============================
const scanLogSchema = new mongoose.Schema({

  medicineId: {
    type: String,
    required: true
  },

  latitude: {
    type: Number
  },

  longitude: {
    type: Number
  },

  scannedAt: {
    type: Date,
    default: Date.now
  }

});
const ScanLog = mongoose.model(
  "ScanLog",
  scanLogSchema
);

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

    // 📝 Store extra medicine details
await MedicineDetails.create({

  medicineId: id,

  manufacturer,

  batchNumber,

  manufacturingDate,

  expiryDate,

  dosage,

  description
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

    const medicineId = req.params.id;

    // 🔍 Verify from blockchain
    const result = await contract.methods
      .verifyMedicine(medicineId)
      .call();

    // 📍 Current location
    const latitude = parseFloat(req.query.lat);
    const longitude = parseFloat(req.query.lng);

    // 🚨 Suspicious Detection
  let suspicious = false;

let warnings = [];

    // 📜 Get previous scan
    const previousScan = await ScanLog
      .findOne({ medicineId })
      .sort({ scannedAt: -1 });

    // 🌍 Impossible Location Jump Detection
    if (
  previousScan &&
  previousScan.latitude !== undefined &&
  previousScan.longitude !== undefined &&
  !isNaN(latitude) &&
  !isNaN(longitude)
) {

      // 📏 Calculate distance
      const distanceInMeters = geolib.getDistance(

        {
          latitude: previousScan.latitude,
          longitude: previousScan.longitude
        },

        {
          latitude,
          longitude
        }
      );

      // Convert meters → km
      const distanceInKm =
        distanceInMeters / 1000;

      // ⏱ Time difference
      const previousTime =
        new Date(previousScan.scannedAt).getTime();

      const currentTime =
        new Date().getTime();

      const timeDifferenceMinutes =
        (currentTime - previousTime) / 60000;

      // 🚨 Impossible travel logic
      if (
        distanceInKm > 50 &&
        timeDifferenceMinutes < 5
      ) {

        suspicious = true;

       warnings.push(
  "⚠ Possible Cloned QR / Counterfeit Product"
);
      }
    }

    // 📝 Store new scan
    await ScanLog.create({
      medicineId,
      latitude,
      longitude
    });

    // 📊 Total scans
    const scanCount = await ScanLog.countDocuments({
      medicineId
    });

    // 🚨 Excessive scans
    if (scanCount > 5) {

      suspicious = true;

     warnings.push(
  "⚠ Excessive Scan Activity Detected"
);
    }

    // ✅ Send response
    res.json({

      message: "Medicine fetched successfully",

      data: {
        batchId: result[0],
        name: result[1],
        manufacturer: result[2],
        currentOwner: result[3],
        manufacturer: details?.manufacturer,
batchNumber: details?.batchNumber,
manufacturingDate: details?.manufacturingDate,
expiryDate: details?.expiryDate,
dosage: details?.dosage,
description: details?.description,
        scanCount,
        suspicious,
        warnings
      }
    });
    // 📦 Get medicine details
const details = await MedicineDetails.findOne({
  medicineId
});

  } catch (error) {

  console.log("VERIFY ERROR ❌", error);

  res.status(500).json({
    error: error.message
  });
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

// 📜 Get Scan History
app.get("/api/scanHistory/:id", async (req, res) => {

  try {

    const logs = await ScanLog.find({
      medicineId: req.params.id
    });

    res.json({
      message: "Scan history fetched",
      totalScans: logs.length,
      logs
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
// 📊 Analytics Endpoint
// ==============================
app.get("/api/analytics", async (req, res) => {
  try {
    // Total scans from MongoDB
    const totalScans = await ScanLog.countDocuments();

    // Recent scans (last 10)
    const recentScans = await ScanLog.find()
      .sort({ scannedAt: -1 })
      .limit(10);

    // Total unique medicines from blockchain events (approximate from scans)
    const uniqueMedicines = await ScanLog.distinct("medicineId");
    const totalMedicines = uniqueMedicines.length;

    // Counterfeit alerts from suspicious scans
    const counterfeitAlerts = await ScanLog.aggregate([
      {
        $group: {
          _id: "$medicineId",
          scanCount: { $sum: 1 }
        }
      },
      {
        $match: {
          scanCount: { $gt: 5 }
        }
      }
    ]);

    // Suspicious products count
    const suspiciousCount = counterfeitAlerts.length;

    res.json({
      totalMedicines,
      totalScans,
      suspiciousCount,
      recentScans,
      counterfeitAlerts
    });
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