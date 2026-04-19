let medicines = []; // temporary storage

// POST /addMedicine
exports.addMedicine = (req, res) => {
  const data = req.body;

  medicines.push(data); // store data

  res.json({
    message: "Medicine added successfully",
    data: data
  });
};

// GET /getMedicine/:id
exports.getMedicine = (req, res) => {
  const id = req.params.id;

  const medicine = medicines[id];

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