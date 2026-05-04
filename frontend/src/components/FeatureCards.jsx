// Feature Cards Component
function FeatureCards() {

  // Feature data array
  const features = [
    {
      title: "QR Verification",
      description:
        "Instantly verify medicine authenticity using secure QR code scanning.",
      icon: "🔍",
    },

    {
      title: "Ownership Transfer",
      description:
        "Track manufacturer, distributor, and pharmacy ownership transparently.",
      icon: "🔄",
    },

    {
      title: "Blockchain Security",
      description:
        "Immutable blockchain records prevent counterfeit medicines and fraud.",
      icon: "🔐",
    },
  ];

  return (

    // Main Section
    <section 
        id="features" 
        className="bg-slate-950 text-white py-24 px-6">

      {/* Section Heading */}
      <div className="text-center mb-16">

        <h2 className="text-4xl md:text-5xl font-bold mb-5">
          Powerful Features
        </h2>

        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Modern blockchain technology combined with QR verification
          ensures complete transparency in the medicine supply chain.
        </p>

      </div>

      {/* Cards Grid */}
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

        {/* Feature Cards */}
        {features.map((feature, index) => (

          <div
            key={index}
            className="
              bg-white/5
              backdrop-blur-lg
              border
              border-white/10
              rounded-3xl
              p-8
              hover:border-cyan-400/40
              hover:-translate-y-2
              transition-all
              duration-300
              shadow-xl
            "
          >

            {/* Icon */}
            <div className="text-5xl mb-6">
              {feature.icon}
            </div>

            {/* Card Title */}
            <h3 className="text-2xl font-bold mb-4">
              {feature.title}
            </h3>

            {/* Card Description */}
            <p className="text-slate-400 leading-relaxed">
              {feature.description}
            </p>

          </div>
        ))}

      </div>
    </section>
  );
}

export default FeatureCards;