// Stats Section Component
function StatsSection() {

  // Stats data array
  const stats = [
    {
      number: "10K+",
      title: "Medicines Tracked",
    },

    {
      number: "25K+",
      title: "QR Verifications",
    },

    {
      number: "8K+",
      title: "Ownership Transfers",
    },
  ];

  return (

    // Main Section
    <section
      id="stats"
      className="
        bg-slate-950
        px-6
        pb-24
      "
    >

      {/* Stats Container */}
      <div
        className="
          max-w-6xl
          mx-auto
          grid
          grid-cols-1
          md:grid-cols-3
          gap-8
        "
      >

        {/* Individual Stat Cards */}
        {stats.map((stat, index) => (

          <div
            key={index}
            className="
              bg-white/5
              backdrop-blur-xl
              border
              border-cyan-400/10
              rounded-3xl
              p-10
              text-center
              shadow-2xl
              hover:-translate-y-3
              hover:border-cyan-400/40
              transition-all
              duration-300
            "
          >

            {/* Large Stat Number */}
            <h2
              className="
                text-5xl
                font-extrabold
                text-cyan-400
                mb-4
              "
            >
              {stat.number}
            </h2>

            {/* Stat Label */}
            <p
              className="
                text-slate-300
                text-lg
              "
            >
              {stat.title}
            </p>

          </div>
        ))}

      </div>
    </section>
  );
}

export default StatsSection;