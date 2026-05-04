// Import Navbar
import Navbar from "./components/Navbar";

// Import Routes
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div>

      {/* Navbar stays on all pages */}
      <Navbar />

      {/* Dynamic Page Content */}
      <AppRoutes />

    </div>
  );
}

export default App;