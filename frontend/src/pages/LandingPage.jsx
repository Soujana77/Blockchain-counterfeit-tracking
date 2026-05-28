import { Link } from "react-router-dom";

import {
  ShieldCheck,
  ScanLine,
  Globe,
  Siren,
  Factory,
  Link2,
  Settings2,
  Shield
} from "lucide-react";

export default function LandingPage() {

  return (

    <div className="min-h-screen bg-[#020617] text-white overflow-hidden">

      {/* HERO SECTION */}
      <section className="relative px-6 pt-20 pb-6 text-center">
        <div className="max-w-5xl mx-auto">

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">

            Blockchain-Based

            <span className="text-cyan-400">
              {" "}Drug Traceability
            </span>

            <br />

            & Counterfeit Detection

          </h1>

          <p className="mt-6 text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">

            Secure pharmaceutical supply chains using
            blockchain verification, QR intelligence,
            geo-tracking, and counterfeit detection.

          </p>

          {/* BUTTONS */}<div className="mt-8 flex flex-wrap justify-center gap-4">
          

            <Link
              to="/verify"
              className="
                px-8
                py-4
                bg-cyan-500
                hover:bg-cyan-400
                text-slate-900
                rounded-2xl
                font-semibold
                transition
              "
            >

              Verify Medicine

            </Link>

            <Link
              to="/login"
              className="
                px-8
                py-4
                border
                border-cyan-400
                hover:bg-cyan-400/10
                rounded-2xl
                font-semibold
                transition
              "
            >

              Manufacturer Portal

            </Link>

          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="px-6 py-10">

        <div className="max-w-7xl mx-auto">

          {/* SECTION TITLE */}
          <div className="flex items-center justify-center gap-4 mb-16">

            <ShieldCheck
              size={40}
              className="text-cyan-400"
            />

            <h2 className="text-4xl font-bold">

              Platform Features

            </h2>

          </div>

          {/* FEATURE GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

            {/* FEATURE 1 */}
            <div className="bg-slate-900/60 border border-cyan-500/20 rounded-2xl p-6">

              <Shield
                size={48}
                className="text-cyan-400 mb-5"
              />

              <h3 className="text-2xl font-bold text-cyan-400 mb-4">

                Blockchain Security

              </h3>

              <p className="text-slate-300 leading-relaxed">

                Immutable medicine records with secure
                blockchain ownership tracking.

              </p>

            </div>

            {/* FEATURE 2 */}
            <div className="bg-slate-900/60 border border-cyan-500/20 rounded-2xl p-6">

              <ScanLine
                size={48}
                className="text-cyan-400 mb-5"
              />

              <h3 className="text-2xl font-bold text-cyan-400 mb-4">

                QR Verification

              </h3>

              <p className="text-slate-300 leading-relaxed">

                Instantly verify medicines using
                QR code scanning and blockchain validation.

              </p>

            </div>

            {/* FEATURE 3 */}
            <div className="bg-slate-900/60 border border-cyan-500/20 rounded-2xl p-6">

              <Globe
                size={48}
                className="text-cyan-400 mb-5"
              />

              <h3 className="text-2xl font-bold text-cyan-400 mb-4">

                Geo Intelligence

              </h3>

              <p className="text-slate-300 leading-relaxed">

                Track suspicious scan locations and
                counterfeit movement patterns.

              </p>

            </div>

            {/* FEATURE 4 */}
            <div className="bg-slate-900/60 border border-cyan-500/20 rounded-2xl p-6">

              <Siren
                size={48}
                className="text-cyan-400 mb-5"
              />

              <h3 className="text-2xl font-bold text-cyan-400 mb-4">

                Counterfeit Detection

              </h3>

              <p className="text-slate-300 leading-relaxed">

                Detect duplicate QR scans and
                suspicious pharmaceutical activity.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-20">

        <div className="max-w-6xl mx-auto">

          {/* SECTION TITLE */}
          <div className="flex items-center justify-center gap-4 mb-16">

            <Settings2
              size={40}
              className="text-cyan-400"
            />

            <h2 className="text-4xl font-bold">

              How The System Works

            </h2>

          </div>

          {/* WORKFLOW */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">

            {/* STEP 1 */}
            <div>

              <Factory
                size={52}
                className="text-cyan-400 mx-auto mb-5"
              />

              <h3 className="text-2xl font-bold mb-3">

                Manufacturer

              </h3>

              <p className="text-slate-400">

                Medicines registered securely on blockchain.

              </p>

            </div>

            {/* STEP 2 */}
            <div>

              <Link2
                size={52}
                className="text-cyan-400 mx-auto mb-5"
              />

              <h3 className="text-2xl font-bold mb-3">

                Ownership Transfer

              </h3>

              <p className="text-slate-400">

                Supply chain movement tracked transparently.

              </p>

            </div>

            {/* STEP 3 */}
            <div>

              <ScanLine
                size={52}
                className="text-cyan-400 mx-auto mb-5"
              />

              <h3 className="text-2xl font-bold mb-3">

                QR Verification

              </h3>

              <p className="text-slate-400">

                Customers scan QR to verify authenticity.

              </p>

            </div>

            {/* STEP 4 */}
            <div>

              <Siren
                size={52}
                className="text-cyan-400 mx-auto mb-5"
              />

              <h3 className="text-2xl font-bold mb-3">

                Detection Engine

              </h3>

              <p className="text-slate-400">

                Counterfeit activities detected automatically.

              </p>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}