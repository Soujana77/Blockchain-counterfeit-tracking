const express = require("express");
const router = express.Router();

const {
  addMedicine,
  getMedicine
} = require("../controllers/medicineController");

// TEST ROUTE
router.get("/test", (req, res) => {
  res.send("Test route working");
});

// POST API
router.post("/addMedicine", addMedicine);

// GET API
router.get("/getMedicine/:id", getMedicine);

module.exports = router;