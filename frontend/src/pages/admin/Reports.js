import React, { useEffect, useState } from "react";
import API from "../../services/api";

const Reports = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/members");
        setMembers(res.data);
      } catch (err) {
        console.error("Failed to load reports");
      }
    };

    fetchData();
  }, []);

  // ================================
  // BASIC ANALYTICS
  // ================================
  const total = members.length;
  const approved = members.filter(m => m.application_status === "Approved").length;
  const pending = members.filter(m => m.application_status === "Pending").length;
  const rejected = members.filter(m => m.application_status === "Rejected").length;

  return (
    <div>

      <h1 className="text-2xl font-bold text-green-800 mb-4">
        Reports & Analytics
      </h1>

      {/* ========================= */}
      {/* STATS CARDS */}
      {/* ========================= */}
      <div className="grid grid-cols-4 gap-4 mb-6">

        <div className="bg-green-700 text-white p-4 rounded">
          Total<br />
          <span className="text-2xl font-bold">{total}</span>
        </div>

        <div className="bg-blue-600 text-white p-4 rounded">
          Approved<br />
          <span className="text-2xl font-bold">{approved}</span>
        </div>

        <div className="bg-yellow-600 text-white p-4 rounded">
          Pending<br />
          <span className="text-2xl font-bold">{pending}</span>
        </div>

        <div className="bg-red-600 text-white p-4 rounded">
          Rejected<br />
          <span className="text-2xl font-bold">{rejected}</span>
        </div>

      </div>

      {/* ========================= */}
      {/* EXPORT BUTTONS (UI ONLY) */}
      {/* ========================= */}
      <div className="bg-white p-4 shadow">

        <h2 className="font-bold mb-2">Export Reports</h2>

        <div className="space-x-2">

          <button className="bg-green-700 text-white px-4 py-2">
            Export CSV
          </button>

          <button className="bg-blue-700 text-white px-4 py-2">
            Export Excel
          </button>

          <button className="bg-red-700 text-white px-4 py-2">
            Export PDF
          </button>

        </div>

        <p className="text-sm text-gray-600 mt-3">
          (Backend export endpoints can be connected later)
        </p>

      </div>

    </div>
  );
};

export default Reports;
