import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useParams, useNavigate } from "react-router-dom";

const MemberDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [member, setMember] = useState(null);

  // ================================
  // FETCH SINGLE MEMBER
  // ================================
  const fetchMember = async () => {
    try {
      const res = await API.get(`/members/${id}`);
      setMember(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMember();
  }, []);

  // ================================
  // UPDATE STATUS
  // ================================
  const updateStatus = async (status) => {
    try {
      await API.put(`/members/${id}/status`, { status });
      fetchMember();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  // ================================
  // DELETE MEMBER
  // ================================
  const deleteMember = async () => {
    if (!window.confirm("Delete this member?")) return;

    try {
      await API.delete(`/members/${id}`);
      navigate("/admin/members");
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (!member) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-6 shadow">

      <h1 className="text-2xl font-bold mb-4">
        Member Details
      </h1>

      {/* BASIC INFO */}
      <div className="grid grid-cols-2 gap-2 mb-6">

        <p><b>Name:</b> {member.surname} {member.given_name}</p>
        <p><b>Email:</b> {member.email}</p>
        <p><b>Phone:</b> {member.mobile}</p>
        <p><b>Province:</b> {member.home_province}</p>
        <p><b>Country:</b> {member.country}</p>
        <p><b>Membership:</b> {member.membership_type}</p>
        <p><b>Status:</b> {member.application_status}</p>
        <p><b>Membership No:</b> {member.membership_number}</p>

      </div>

      {/* ACTIONS */}
      <div className="space-x-2">

        <button
          onClick={() => updateStatus("Approved")}
          className="bg-green-600 text-white px-4 py-2"
        >
          Approve
        </button>

        <button
          onClick={() => updateStatus("Rejected")}
          className="bg-red-600 text-white px-4 py-2"
        >
          Reject
        </button>

        <button
          onClick={deleteMember}
          className="bg-gray-800 text-white px-4 py-2"
        >
          Delete
        </button>

      </div>

    </div>
  );
};

export default MemberDetails;
