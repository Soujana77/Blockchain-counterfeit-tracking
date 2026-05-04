// Import components
import FeatureCards from "../components/FeatureCards";
import StatsSection from "../components/StatsSection";

function Home() {
  return (
    <div className="w-full text-white">

      {/* ================= HERO SECTION ================= */}
      <section
        id="home"
        className="
          min-h-[calc(100vh-80px)]
          flex flex-col
          items-center justify-center
          text-center
          px-6
        "
      >
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Secure Drug Tracking
          <span className="block text-cyan-400">
            Using Blockchain
          </span>
        </h1>

        <p className="mt-6 text-slate-300 max-w-2xl">
          Ensure medicine authenticity, transparent ownership transfer,
          and QR-based verification using a secure blockchain-powered system.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-xl font-semibold transition">
            Verify Medicine
          </button>

          <button className="px-6 py-3 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 rounded-xl font-semibold transition">
            Add Medicine
          </button>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="py-20 px-6">
        <FeatureCards />
      </section>

      {/* ================= STATS ================= */}
      <section id="stats" className="py-20 px-6">
        <StatsSection />
      </section>

    </div>
  );
}

export default Home;