import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import ScrollToHash from "./utils/ScrollToHash";

function App() {
  return (
    <div>
      <Navbar />
      <ScrollToHash />   {/* 👈 ADD THIS */}
      <AppRoutes />
    </div>
  );
}

export default App;