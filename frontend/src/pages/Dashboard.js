import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement
} from 'chart.js';
import { Pie, Bar, Doughnut } from 'react-chartjs-2';
import { FaUsers, FaUserGraduate, FaMapMarkerAlt, FaUniversity, FaDollarSign, FaGraduationCap, FaFilePdf, FaFileCsv, FaFileExcel, FaSync } from 'react-icons/fa';
import MemberManagement from '../components/MemberManagement';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement
);

export default function Dashboard() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    male: 0,
    female: 0,
    institutions: {},
    graduationYears: {},
    provinces: {},
    membershipTypes: {},
    financials: {
      fortnightly: 0,
      monthly: 0,
      yearly: 0,
      donation: 0
    }
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      if (!token) throw new Error('No token found');
      const response = await fetch('/api/members', {
        headers: { 
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json' 
        }
      });
      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        window.location.href = '/admin/login';
        return;
      }
      if (!response.ok) throw new Error('Failed to fetch members');
      const data = await response.json();
      const membersData = data.members || data;
      setMembers(membersData);
      calculateStats(membersData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const stats = { 
      total: data.length, 
      male: 0, 
      female: 0, 
      institutions: {}, 
      graduationYears: {}, 
      provinces: {}, 
      membershipTypes: {}, 
      financials: { 
        fortnightly: 0, 
        monthly: 0, 
        yearly: 0, 
        donation: 0 
      } 
    };
    data.forEach(member => {
      if (member.sex === 'Male') stats.male++;
      if (member.sex === 'Female') stats.female++;
      if (member.institution) {
        stats.institutions[member.institution] = (stats.institutions[member.institution] || 0) + 1;
      }
      if (member.graduation_year) {
        const year = member.graduation_year.toString();
        stats.graduationYears[year] = (stats.graduationYears[year] || 0) + 1;
      }
      if (member.home_province) {
        stats.provinces[member.home_province] = (stats.provinces[member.home_province] || 0) + 1;
      }
      if (member.membership_type) {
        stats.membershipTypes[member.membership_type] = (stats.membershipTypes[member.membership_type] || 0) + 1;
      }
      stats.financials.fortnightly += parseFloat(member.fortnightly_amount) || 0;
      stats.financials.monthly += parseFloat(member.monthly_amount) || 0;
      stats.financials.yearly += parseFloat(member.yearly_amount) || 0;
      stats.financials.donation += parseFloat(member.donation_amount) || 0;
    });
    setStats(stats);
  };

  // Chart Data with thin white borders (borderWidth: 1)
  const genderData = {
    labels: ['Male', 'Female'],
    datasets: [{ 
      data: [stats.male, stats.female], 
      backgroundColor: ['#1a3a5c', '#e8a53e'], 
      borderColor: 'rgba(255,255,255,0.8)',
      borderWidth: 1
    }]
  };

  const institutionData = {
    labels: Object.keys(stats.institutions).slice(0, 8),
    datasets: [{ 
      label: 'Members', 
      data: Object.values(stats.institutions).slice(0, 8), 
      backgroundColor: 'rgba(26, 58, 92, 0.85)', 
      borderColor: 'rgba(255,255,255,0.6)',
      borderWidth: 1,
      borderRadius: 4
    }]
  };

  const graduationData = {
    labels: Object.keys(stats.graduationYears).sort(),
    datasets: [{ 
      label: 'Members', 
      data: Object.keys(stats.graduationYears).sort().map(key => stats.graduationYears[key]), 
      backgroundColor: 'rgba(26, 58, 92, 0.85)', 
      borderColor: 'rgba(255,255,255,0.6)',
      borderWidth: 1,
      borderRadius: 4
    }]
  };

  // Province colors
  const provinceColors = [
    '#1a3a5c', '#2a5a7a', '#3a7a9a', '#4a8aaa', '#5a9aba',
    '#6aaaca', '#7abada', '#8acaea', '#9adafa', '#aaeaff',
    '#1a3a5c', '#2a5a7a', '#3a7a9a', '#4a8aaa', '#5a9aba',
    '#6aaaca', '#7abada', '#8acaea', '#9adafa', '#aaeaff'
  ];

  const provinceLabels = Object.keys(stats.provinces);
  const provinceDataValues = Object.values(stats.provinces);
  const provinceBackgroundColors = provinceLabels.map((_, index) => 
    provinceColors[index % provinceColors.length]
  );

  const provinceData = {
    labels: provinceLabels,
    datasets: [{
      label: 'Members',
      data: provinceDataValues,
      backgroundColor: provinceBackgroundColors,
      borderColor: 'rgba(255,255,255,0.6)',
      borderWidth: 1,
      borderRadius: 4,
    }]
  };

  const membershipTypeColors = ['#1a3a5c', '#2a5a7a', '#3a7a9a', '#5c9bbc', '#e8a53e'];
  const membershipTypeData = {
    labels: Object.keys(stats.membershipTypes),
    datasets: [{ 
      data: Object.values(stats.membershipTypes), 
      backgroundColor: membershipTypeColors.slice(0, Object.keys(stats.membershipTypes).length), 
      borderColor: 'rgba(255,255,255,0.8)',
      borderWidth: 1
    }]
  };

  const financialData = {
    labels: ['Fortnightly', 'Monthly', 'Yearly', 'Donation'],
    datasets: [{ 
      label: 'Amount (Kina)', 
      data: [
        stats.financials.fortnightly, 
        stats.financials.monthly, 
        stats.financials.yearly, 
        stats.financials.donation
      ], 
      backgroundColor: ['#1a3a5c', '#2a5a7a', '#3a7a9a', '#e8a53e'], 
      borderColor: 'rgba(255,255,255,0.6)',
      borderWidth: 1,
      borderRadius: 4
    }]
  };

  const totalContributions = stats.financials.fortnightly + stats.financials.monthly + stats.financials.yearly + stats.financials.donation;

  const handleExport = (path) => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      alert('Please login again');
      window.location.href = '/admin/login';
      return;
    }
    window.open(`${path}?token=${encodeURIComponent(token)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12 px-4" style={{ background: 'linear-gradient(135deg, #4ea9e5 0%, #0050b5 50%, #00125c 100%)' }}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-white text-2xl">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-12 px-4" style={{ background: 'linear-gradient(135deg, #4ea9e5 0%, #0050b5 50%, #00125c 100%)' }}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-red-500/20 border border-red-500 text-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">Error Loading Dashboard</h2>
            <p>{error}</p>
            <button 
              onClick={fetchMembers}
              className="mt-4 bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: 'linear-gradient(135deg, #4ea9e5 0%, #0050b5 50%, #00125c 100%)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">📊 Dashboard</h1>
            <p className="text-white/70 text-sm">TSCF Vision Partners Analytics</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => handleExport('/api/reports/membership')} className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 text-sm shadow-md">
              <FaFilePdf /> PDF
            </button>
            <button onClick={() => handleExport('/api/export/csv')} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 text-sm shadow-md">
              <FaFileCsv /> CSV
            </button>
            <button onClick={() => handleExport('/api/export/excel')} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 text-sm shadow-md">
              <FaFileExcel /> Excel
            </button>
            <button onClick={fetchMembers} className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 text-sm backdrop-blur-sm">
              <FaSync /> Refresh
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Total Members</p>
                <p className="text-white text-3xl font-bold">{stats.total}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-full">
                <FaUsers className="text-white text-xl" />
              </div>
            </div>
            <div className="mt-2 text-xs text-white/50">+{stats.total} registered</div>
          </div>
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Male</p>
                <p className="text-white text-3xl font-bold">{stats.male}</p>
              </div>
              <div className="bg-blue-400/30 p-3 rounded-full">
                <FaUsers className="text-blue-200 text-xl" />
              </div>
            </div>
            <div className="mt-2 text-xs text-white/50">{stats.total > 0 ? Math.round((stats.male/stats.total)*100) : 0}% of total</div>
          </div>
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Female</p>
                <p className="text-white text-3xl font-bold">{stats.female}</p>
              </div>
              <div className="bg-pink-400/30 p-3 rounded-full">
                <FaUsers className="text-pink-200 text-xl" />
              </div>
            </div>
            <div className="mt-2 text-xs text-white/50">{stats.total > 0 ? Math.round((stats.female/stats.total)*100) : 0}% of total</div>
          </div>
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Contributions</p>
                <p className="text-white text-3xl font-bold">K{totalContributions.toFixed(0)}</p>
              </div>
              <div className="bg-yellow-400/30 p-3 rounded-full">
                <FaDollarSign className="text-yellow-200 text-xl" />
              </div>
            </div>
            <div className="mt-2 text-xs text-white/50">Total raised</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gender Distribution */}
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
              <FaUsers className="text-blue-300" /> Gender Distribution
            </h3>
            <div className="h-56 flex items-center justify-center">
              {stats.total > 0 ? (
                <Pie data={genderData} options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: { 
                        color: 'white', 
                        font: { size: 13, weight: '500' },
                        padding: 20
                      }
                    }
                  }
                }} />
              ) : (
                <p className="text-white/50">No data available</p>
              )}
            </div>
          </div>

          {/* Membership Types */}
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
              <FaUserGraduate className="text-purple-300" /> Membership Types
            </h3>
            <div className="h-56 flex items-center justify-center">
              {Object.keys(stats.membershipTypes).length > 0 ? (
                <Doughnut data={membershipTypeData} options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: { 
                        color: 'white', 
                        font: { size: 13, weight: '500' },
                        padding: 20
                      }
                    }
                  }
                }} />
              ) : (
                <p className="text-white/50">No data available</p>
              )}
            </div>
          </div>

          {/* Members by Institution */}
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
              <FaUniversity className="text-green-300" /> Top Institutions
            </h3>
            <div className="h-56">
              {Object.keys(stats.institutions).length > 0 ? (
                <Bar data={institutionData} options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: { color: 'rgba(255,255,255,0.7)', stepSize: 1 },
                      grid: { color: 'rgba(255,255,255,0.1)' }
                    },
                    x: {
                      ticks: { color: 'rgba(255,255,255,0.7)', maxRotation: 45, font: { size: 10 } },
                      grid: { display: false }
                    }
                  }
                }} />
              ) : (
                <p className="text-white/50 text-center mt-8">No data available</p>
              )}
            </div>
          </div>

          {/* Graduation Years */}
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
              <FaGraduationCap className="text-yellow-300" /> Graduation Years
            </h3>
            <div className="h-56">
              {Object.keys(stats.graduationYears).length > 0 ? (
                <Bar data={graduationData} options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: { color: 'rgba(255,255,255,0.7)', stepSize: 1 },
                      grid: { color: 'rgba(255,255,255,0.1)' }
                    },
                    x: {
                      ticks: { color: 'rgba(255,255,255,0.7)', maxRotation: 45, font: { size: 10 } },
                      grid: { display: false }
                    }
                  }
                }} />
              ) : (
                <p className="text-white/50 text-center mt-8">No data available</p>
              )}
            </div>
          </div>

          {/* Members by Province */}
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/20 md:col-span-2">
            <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-300" /> Members by Province
            </h3>
            <div className="h-64">
              {Object.keys(stats.provinces).length > 0 ? (
                <Bar data={provinceData} options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          return provinceLabels[context.dataIndex] + ': ' + context.parsed.y + ' members';
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: { color: 'rgba(255,255,255,0.7)', stepSize: 1 },
                      grid: { color: 'rgba(255,255,255,0.1)' }
                    },
                    x: {
                      ticks: { color: 'rgba(255,255,255,0.7)', maxRotation: 45, font: { size: 10 } },
                      grid: { display: false }
                    }
                  }
                }} />
              ) : (
                <p className="text-white/50 text-center mt-8">No data available</p>
              )}
            </div>
          </div>

          {/* Financial Contributions */}
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/20 md:col-span-2">
            <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
              <FaDollarSign className="text-green-300" /> Financial Contributions (Kina)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div className="bg-white/10 rounded-lg p-3 text-center border border-white/10">
                <p className="text-white/60 text-xs">Fortnightly</p>
                <p className="text-white text-lg font-bold">K{stats.financials.fortnightly.toFixed(2)}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center border border-white/10">
                <p className="text-white/60 text-xs">Monthly</p>
                <p className="text-white text-lg font-bold">K{stats.financials.monthly.toFixed(2)}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center border border-white/10">
                <p className="text-white/60 text-xs">Yearly</p>
                <p className="text-white text-lg font-bold">K{stats.financials.yearly.toFixed(2)}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center border border-white/10">
                <p className="text-white/60 text-xs">Donations</p>
                <p className="text-white text-lg font-bold">K{stats.financials.donation.toFixed(2)}</p>
              </div>
            </div>
            <div className="h-56">
              <Bar data={financialData} options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: { color: 'rgba(255,255,255,0.7)' },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                  },
                  x: {
                    ticks: { color: 'rgba(255,255,255,0.7)' },
                    grid: { display: false }
                  }
                }
              }} />
            </div>
          </div>
        </div>

        {/* Member Management */}
        <div className="mt-6">
          <MemberManagement />
        </div>

        {/* Footer Summary */}
        <div className="mt-6 bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <div className="flex flex-wrap justify-between items-center">
            <div>
              <p className="text-white/60 text-sm">Total Registered Members</p>
              <p className="text-white text-3xl font-bold">{stats.total}</p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-white/70">
              <span>👨 Male: <strong className="text-white">{stats.male}</strong></span>
              <span>👩 Female: <strong className="text-white">{stats.female}</strong></span>
              <span>🏛️ Institutions: <strong className="text-white">{Object.keys(stats.institutions).length}</strong></span>
              <span>📍 Provinces: <strong className="text-white">{Object.keys(stats.provinces).length}</strong></span>
              <span>🎓 Grad Years: <strong className="text-white">{Object.keys(stats.graduationYears).length}</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
