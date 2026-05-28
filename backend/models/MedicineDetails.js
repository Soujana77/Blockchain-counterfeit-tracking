const mongoose = require("mongoose");

const medicineDetailsSchema = new mongoose.Schema({

  medicineId: String,

  manufacturer: String,

  batchNumber: String,

  manufacturingDate: String,

  expiryDate: String,

  dosage: String,

  description: String,

  // 💊 Pharmacy Sale Status
  sold: {
    type: Boolean,
    default: false
  }

});

module.exports = mongoose.model(
  "MedicineDetails",
  medicineDetailsSchema
);