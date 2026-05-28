import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import ScanMap from "../components/ScanMap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState({
    totalMedicines: 0,
    totalScans: 0,
    suspiciousCount: 0,
    recentScans: [],
    counterfeitAlerts: []
  });
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:8000/api/analytics");
      const data = await res.json();
      setAnalytics(data);
    } catch (err) {
      console.error("Failed to fetch analytics:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen text-white px-6 pt-28 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-300">Loading analytics...</p>
        </div>
      </div>
    );
  }
  // 📈 Line Chart Data
const scanTrendData = [

  { day: "Mon", scans: 12 },
  { day: "Tue", scans: 19 },
  { day: "Wed", scans: 8 },
  { day: "Thu", scans: 25 },
  { day: "Fri", scans: 17 },
  { day: "Sat", scans: 30 },
  { day: "Sun", scans: 21 }
];

// 🚨 Pie Chart Data
const suspiciousData = [

  {
    name: "Safe",
    value: analytics.totalScans - analytics.suspiciousCount
  },

  {
    name: "Suspicious",
    value: analytics.suspiciousCount
  }
];
// 🚨 Live Alert Feed
const liveAlerts = [

  {
    type: "High Risk",
    message: "Possible cloned QR detected for MED003",
    time: "2 mins ago"
  },

  {
    type: "Warning",
    message: "Excessive scan activity detected",
    time: "10 mins ago"
  },

  {
    type: "Info",
    message: "Ownership transferred successfully",
    time: "25 mins ago"
  }
];

  // Map recent scans for visualization
  const scanLocations = analytics.recentScans
    .filter(scan => scan.latitude && scan.longitude)
    .map(scan => ({
      lat: scan.latitude,
      lng: scan.longitude,
      medicineId: scan.medicineId
    }));

  return (
    <div className="min-h-screen text-white px-6 pt-28 pb-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-cyan-400 mb-2">
          📊 Admin Analytics Dashboard
        </h1>
        <p className="text-slate-400">Real-time blockchain drug traceability insights</p>
      </div>
{/* 📈 Analytics Charts */}
<div className="max-w-7xl mx-auto mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">

  {/* Scan Trend */}
  <div className="bg-slate-900/60 border border-cyan-500/20 rounded-2xl p-6">

    <h3 className="text-2xl font-bold text-cyan-400 mb-6">

      📈 Weekly Scan Activity

    </h3>

    <ResponsiveContainer width="100%" height={300}>

      <LineChart data={scanTrendData}>

        <XAxis dataKey="day" stroke="#94a3b8" />

        <YAxis stroke="#94a3b8" />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="scans"
          stroke="#22d3ee"
          strokeWidth={3}
        />

      </LineChart>

    </ResponsiveContainer>

  </div>

  {/* Suspicious Distribution */}
  <div className="bg-slate-900/60 border border-red-500/20 rounded-2xl p-6">

    <h3 className="text-2xl font-bold text-red-400 mb-6">

      🚨 Product Safety Distribution

    </h3>

    <ResponsiveContainer width="100%" height={300}>

      <PieChart>

        <Pie
          data={suspiciousData}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label
        >

          <Cell fill="#22c55e" />

          <Cell fill="#ef4444" />

        </Pie>

        <Tooltip />

      </PieChart>

    </ResponsiveContainer>

  </div>

</div>
      {/* Quick Analytics Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Total Medicines */}
        <div className="bg-slate-900/60 border border-cyan-400/20 rounded-2xl p-6 hover:border-cyan-400/40 transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-300 font-medium">Total Medicines</h3>
            <span className="text-4xl">💊</span>
          </div>
          <p className="text-5xl font-bold text-cyan-400">{analytics.totalMedicines}</p>
          <p className="text-slate-400 text-sm mt-2">Unique products on blockchain</p>
        </div>

        {/* Total Scans */}
        <div className="bg-slate-900/60 border border-emerald-400/20 rounded-2xl p-6 hover:border-emerald-400/40 transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-300 font-medium">Total Scans</h3>
            <span className="text-4xl">📱</span>
          </div>
          <p className="text-5xl font-bold text-emerald-400">{analytics.totalScans}</p>
          <p className="text-slate-400 text-sm mt-2">QR verifications completed</p>
        </div>

        {/* Suspicious Products */}
        <div className="bg-slate-900/60 border border-red-400/20 rounded-2xl p-6 hover:border-red-400/40 transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-300 font-medium">Suspicious Products</h3>
            <span className="text-4xl">🚨</span>
          </div>
          <p className="text-5xl font-bold text-red-400">{analytics.suspiciousCount}</p>
          <p className="text-slate-400 text-sm mt-2">Potential counterfeits detected</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Scan Activity */}
        <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-cyan-400 mb-4">📋 Recent Scan Activity</h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {analytics.recentScans.length > 0 ? (
              analytics.recentScans.map((scan, index) => (
                <div key={index} className="bg-slate-800/50 rounded-lg p-3 border border-white/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-cyan-300">
                        {scan.medicineId.substring(0, 20)}...
                      </p>
                      <p className="text-slate-400 text-sm">
                        {formatDate(scan.scannedAt)}
                      </p>
                    </div>
                    <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded">
                      Verified
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-400 text-center py-4">No recent scans</p>
            )}
          </div>
        </div>

        {/* Counterfeit Alerts */}
        <div className="bg-slate-900/60 border border-red-400/20 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-red-400 mb-4">🚨 Counterfeit Alerts</h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {analytics.counterfeitAlerts.length > 0 ? (
              analytics.counterfeitAlerts.map((alert, index) => (
                <div key={index} className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                  <p className="font-semibold text-red-300">
                    {alert._id.substring(0, 15)}...
                  </p>
                  <p className="text-slate-400 text-sm">
                    {alert.scanCount} scans detected - Possible counterfeit
                  </p>
                </div>
              ))
            ) : (
              <p className="text-slate-400 text-center py-4">No alerts</p>
            )}
          </div>
        </div>
      </div>

      {/* Live Scan Map */}
      {scanLocations.length > 0 && (
        <div className="max-w-7xl mx-auto mt-8">
          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-cyan-400 mb-4">🌍 Live Scan Map</h3>
            <ScanMap logs={analytics.recentScans} />
          </div>
        </div>
      )}
{/* 🚨 Live Security Alerts */}
<div className="max-w-7xl mx-auto mt-10">

  <div className="bg-slate-900/60 border border-red-500/20 rounded-2xl p-6">

    <h3 className="text-2xl font-bold text-red-400 mb-6">

      🚨 Live Security Alerts

    </h3>

    <div className="space-y-4">

      {liveAlerts.map((alert, index) => (

        <div
          key={index}
          className="p-4 rounded-xl border border-white/10 bg-slate-800/50 flex justify-between items-center"
        >

          <div>

            <p className="font-semibold text-white">
              {alert.message}
            </p>

            <p className="text-sm text-slate-400 mt-1">
              {alert.time}
            </p>

          </div>

          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold
              ${
                alert.type === "High Risk"
                  ? "bg-red-500/20 text-red-400"
                  : alert.type === "Warning"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-cyan-500/20 text-cyan-400"
              }`}
          >

            {alert.type}

          </span>

        </div>
      ))}

    </div>

  </div>

</div>
      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto mt-12">
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/medicine"
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-xl font-semibold transition"
          >
            ➕ Add Medicine
          </Link>
          <Link
            to="/verify"
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-xl font-semibold transition"
          >
            🔍 Verify Medicine
          </Link>
          <button
            onClick={fetchAnalytics}
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-xl font-semibold transition"
          >
            🔄 Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
}