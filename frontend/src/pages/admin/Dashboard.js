import React, { useEffect, useState } from "react";
import API from "../../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalMembers: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
    lifeMembers: 0,
    totalDonations: 0
  });

  const [loading, setLoading] = useState(true);

  // ================================
  // FETCH DASHBOARD STATS
  // ================================
  const fetchStats = async () => {
    try {
      const res = await API.get("/dashboard/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Failed to load dashboard stats");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // ================================
  // STATS CARD COMPONENT
  // ================================
  const Card = ({ title, value, color }) => (
    <div className={`p-4 rounded shadow text-white ${color}`}>
      <h2 className="text-sm">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );

  if (loading) {
    return (
      <div className="text-center p-10">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6 text-green-800">
        Admin Dashboard
      </h1>

      {/* ========================= */}
      {/* STATS GRID */}
      {/* ========================= */}
      <div className="grid grid-cols-3 gap-4">

        <Card
          title="Total Members"
          value={stats.totalMembers}
          color="bg-green-700"
        />

        <Card
          title="Approved"
          value={stats.approved}
          color="bg-blue-600"
        />

        <Card
          title="Pending"
          value={stats.pending}
          color="bg-yellow-600"
        />

        <Card
          title="Rejected"
          value={stats.rejected}
          color="bg-red-600"
        />

        <Card
          title="Life Members"
          value={stats.lifeMembers}
          color="bg-purple-600"
        />

        <Card
          title="Total Donations (K)"
          value={stats.totalDonations}
          color="bg-gray-800"
        />

      </div>

      {/* ========================= */}
      {/* SUMMARY SECTION */}
      {/* ========================= */}
      <div className="mt-8 bg-white p-4 shadow">
        <h2 className="font-bold mb-2">Overview</h2>

        <p>
          This dashboard provides real-time insights into membership
          applications, approvals, and financial contributions for TSCF Vision Partners.
        </p>
      </div>

    </div>
  );
};

export default Dashboard;
