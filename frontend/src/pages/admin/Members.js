import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // ================================
  // FETCH MEMBERS
  // ================================
  const fetchMembers = async () => {
    try {
      const res = await API.get("/members");
      setMembers(res.data);
    } catch (err) {
      console.error("Error loading members");
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // ================================
  // FILTER SEARCH
  // ================================
  const filtered = members.filter((m) =>
    `${m.surname} ${m.given_name} ${m.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>

      <h1 className="text-2xl font-bold mb-4 text-green-800">
        Members Management
      </h1>

      {/* SEARCH */}
      <input
        className="border p-2 mb-4 w-full"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <div className="bg-white shadow overflow-x-auto">

        <table className="w-full text-left">

          <thead className="bg-green-800 text-white">
            <tr>
              <th className="p-2">Name</th>
              <th>Email</th>
              <th>Type</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((m) => (
              <tr key={m.id} className="border-b">

                <td className="p-2">
                  {m.surname} {m.given_name}
                </td>

                <td>{m.email}</td>

                <td>{m.membership_type}</td>

                <td>
                  <span className={`px-2 py-1 text-white text-sm rounded
                    ${
                      m.application_status === "Approved"
                        ? "bg-green-600"
                        : m.application_status === "Rejected"
                        ? "bg-red-600"
                        : "bg-yellow-600"
                    }
                  `}>
                    {m.application_status}
                  </span>
                </td>

                <td>
                  <button
                    onClick={() => navigate(`/admin/members/${m.id}`)}
                    className="bg-blue-600 text-white px-2 py-1"
                  >
                    View
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Members;
