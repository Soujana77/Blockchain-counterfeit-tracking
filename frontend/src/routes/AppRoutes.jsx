import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";

// Temporary pages
function AddMedicine() {
  return <h1>Add Medicine Page</h1>;
}

function Transfer() {
  return <h1>Transfer Ownership Page</h1>;
}

function Verify() {
  return <h1>Verify Medicine Page</h1>;
}

// Routing Component
function AppRoutes() {
  return (
    <Routes>

      {/* Home Page */}
      <Route path="/" element={<Home />} />

      {/* Other Pages */}
      <Route path="/add-medicine" element={<AddMedicine />} />
      <Route path="/transfer" element={<Transfer />} />
      <Route path="/verify" element={<Verify />} />

    </Routes>
  );
}

export default AppRoutes;