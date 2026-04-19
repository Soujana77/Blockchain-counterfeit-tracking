let medicines = [];

// POST /addMedicine
exports.addMedicine = (req, res) => {
  const { name, manufacturer, batchId } = req.body;

  // Validation
  if (!name || !manufacturer || !batchId) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  // Check duplicate batchId
  const exists = medicines.find(med => med.batchId === batchId);
  if (exists) {
    return res.status(400).json({
      message: "Medicine with this batchId already exists"
    });
  }

  const newMedicine = {
    name,
    manufacturer,
    batchId,
    currentOwner: "Manufacturer",
    history: [],
    createdAt: new Date().toISOString()
  };

  medicines.push(newMedicine);

  res.json({
    message: "Medicine added successfully",
    data: newMedicine
  });
};

// GET /getMedicine/:batchId
exports.getMedicine = (req, res) => {
  const { batchId } = req.params;

  const medicine = medicines.find(med => med.batchId === batchId);

  if (!medicine) {
    return res.status(404).json({
      message: "Medicine not found"
    });
  }

  res.json({
    message: "Medicine fetched successfully",
    data: medicine
  });
};

// POST /transferOwnership
exports.transferOwnership = (req, res) => {
  const { batchId, to } = req.body;

  if (!batchId || !to) {
    return res.status(400).json({
      message: "batchId and new owner (to) are required"
    });
  }

  const medicine = medicines.find(med => med.batchId === batchId);

  if (!medicine) {
    return res.status(404).json({
      message: "Medicine not found"
    });
  }

  const from = medicine.currentOwner;

  const transaction = {
    from,
    to,
    timestamp: new Date().toISOString()
  };

  medicine.history.push(transaction);
  medicine.currentOwner = to;

  res.json({
    message: "Ownership transferred successfully",
    data: medicine
  });
};