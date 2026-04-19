const express = require("express");
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
});