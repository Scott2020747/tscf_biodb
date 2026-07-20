import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGraduationCap, FaUser, FaCalendar, FaBuilding, FaBook, FaIdCard } from 'react-icons/fa';

export default function MemberProfile() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMember();
  }, [id]);

  const fetchMember = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch(`/api/members/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.status === 401) {
        window.location.href = '/admin/login';
        return;
      }
      
      if (!response.ok) {
        throw new Error('Failed to fetch member');
      }
      
      const data = await response.json();
      setMember(data.member);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12 px-4" style={{ background: 'linear-gradient(135deg, #4ea9e5 0%, #0050b5 50%, #00125c 100%)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-white text-2xl">Loading member profile...</div>
        </div>
      </div>
    );
  }

  if (error || !member) {
    return (
      <div className="min-h-screen py-12 px-4" style={{ background: 'linear-gradient(135deg, #4ea9e5 0%, #0050b5 50%, #00125c 100%)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-red-500/20 border border-red-500 text-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">Error</h2>
            <p>{error || 'Member not found'}</p>
            <Link to="/dashboard" className="inline-block mt-4 bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: 'linear-gradient(135deg, #4ea9e5 0%, #0050b5 50%, #00125c 100%)' }}>
      <div className="max-w-4xl mx-auto">
        <Link to="/dashboard" className="inline-flex items-center text-white hover:text-white/80 transition mb-6">
          <FaArrowLeft className="mr-2" /> Back to Dashboard
        </Link>

        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl">
                <FaUser className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{member.given_name} {member.surname}</h1>
                <p className="text-white/70">{member.membership_type}</p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              member.application_status === 'Approved' ? 'bg-green-500/30 text-green-300' :
              member.application_status === 'Rejected' ? 'bg-red-500/30 text-red-300' :
              'bg-yellow-500/30 text-yellow-300'
            }`}>
              {member.application_status || 'Pending'}
            </span>
          </div>

          {/* Membership Details */}
          <div className="bg-white/5 rounded-xl p-4 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-white/60 text-sm">Membership Number</p>
                <p className="text-white font-bold">{member.membership_number || 'N/A'}</p>
              </div>
              <div>
                <p className="text-white/60 text-sm">Membership Type</p>
                <p className="text-white font-bold">{member.membership_type || 'N/A'}</p>
              </div>
              <div>
                <p className="text-white/60 text-sm">Joined On</p>
                <p className="text-white font-bold">{new Date(member.created_at).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-white/60 text-sm">Status</p>
                <p className="text-white font-bold">{member.application_status || 'Pending'}</p>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <FaUser /> Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-white/60 text-sm">Email</p>
              <p className="text-white flex items-center gap-2"><FaEnvelope className="text-blue-400" /> {member.email}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-white/60 text-sm">Mobile</p>
              <p className="text-white flex items-center gap-2"><FaPhone className="text-blue-400" /> {member.mobile || 'N/A'}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-white/60 text-sm">Phone</p>
              <p className="text-white flex items-center gap-2"><FaPhone className="text-blue-400" /> {member.phone || 'N/A'}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-white/60 text-sm">Date of Birth</p>
              <p className="text-white flex items-center gap-2"><FaCalendar className="text-blue-400" /> {member.dob ? new Date(member.dob).toLocaleDateString() : 'N/A'}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-white/60 text-sm">Gender</p>
              <p className="text-white">{member.sex || 'N/A'}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-white/60 text-sm">Marital Status</p>
              <p className="text-white">{member.marital_status || 'N/A'}</p>
            </div>
          </div>

          {/* Address */}
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <FaMapMarkerAlt /> Address
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-white/60 text-sm">Province</p>
              <p className="text-white">{member.home_province || 'N/A'}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-white/60 text-sm">Country</p>
              <p className="text-white">{member.country || 'N/A'}</p>
            </div>
            <div className="md:col-span-2 bg-white/5 rounded-lg p-3">
              <p className="text-white/60 text-sm">Address</p>
              <p className="text-white">{member.address || 'N/A'}</p>
            </div>
          </div>

          {/* Education */}
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <FaGraduationCap /> Education & Membership
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-white/60 text-sm">Institution</p>
              <p className="text-white flex items-center gap-2"><FaBuilding className="text-blue-400" /> {member.institution || 'N/A'}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-white/60 text-sm">University Attended</p>
              <p className="text-white">{member.university_attended || 'N/A'}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-white/60 text-sm">Field of Study</p>
              <p className="text-white flex items-center gap-2"><FaBook className="text-blue-400" /> {member.field_of_study || 'N/A'}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-white/60 text-sm">Graduation Year</p>
              <p className="text-white">{member.graduation_year || 'N/A'}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-white/60 text-sm">Membership Role</p>
              <p className="text-white flex items-center gap-2"><FaIdCard className="text-blue-400" /> {member.membership_role || 'N/A'}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-white/60 text-sm">Leadership Role</p>
              <p className="text-white">{member.leadership_role || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
