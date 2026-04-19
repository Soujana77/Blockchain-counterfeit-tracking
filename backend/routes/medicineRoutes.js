const express = require("express");
const router = express.Router();

// Import controllers
const {
  addMedicine,
  getMedicine,
  transferOwnership
} = require("../controllers/medicineController");

// Test route
router.get("/test", (req, res) => {
  res.send("Test route working");
});

// APIs
router.post("/addMedicine", addMedicine);
router.get("/getMedicine/:batchId", getMedicine);
router.post("/transferOwnership", transferOwnership);

module.exports = router;