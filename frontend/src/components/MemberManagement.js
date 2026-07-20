import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaSave, FaTimes, FaEye, FaUserPlus, FaSync, FaSearch, FaFilter, FaDownload, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

export default function MemberManagement() {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editData, setEditData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMembership, setFilterMembership] = useState('all');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortField, setSortField] = useState('surname');
  const [sortDirection, setSortDirection] = useState('asc');

  const [newMember, setNewMember] = useState({
    surname: '',
    given_name: '',
    email: '',
    mobile: '',
    membership_type: '',
    institution: '',
    field_of_study: ''
  });

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/members', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to fetch members');

      const data = await response.json();
      const membersData = data.members || data;
      setMembers(membersData);
      setFilteredMembers(membersData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [searchTerm, filterStatus, filterMembership, members, sortField, sortDirection]);

  const applyFiltersAndSort = () => {
    let filtered = [...members];

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(m => 
        m.surname?.toLowerCase().includes(term) ||
        m.given_name?.toLowerCase().includes(term) ||
        m.email?.toLowerCase().includes(term) ||
        m.institution?.toLowerCase().includes(term) ||
        m.membership_number?.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(m => 
        (m.application_status || 'Pending').toLowerCase() === filterStatus.toLowerCase()
      );
    }

    // Membership type filter
    if (filterMembership !== 'all') {
      filtered = filtered.filter(m => 
        (m.membership_type || '').toLowerCase().includes(filterMembership.toLowerCase())
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      let valA = a[sortField] || '';
      let valB = b[sortField] || '';
      
      // Handle numeric fields
      if (sortField === 'id' || sortField === 'graduation_year') {
        valA = parseInt(valA) || 0;
        valB = parseInt(valB) || 0;
      } else {
        valA = valA.toString().toLowerCase();
        valB = valB.toString().toLowerCase();
      }
      
      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredMembers(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="text-gray-400" />;
    return sortDirection === 'asc' ? <FaSortUp className="text-white" /> : <FaSortDown className="text-white" />;
  };

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMembers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const exportCSV = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      window.open('/api/export/csv', '_blank');
    } catch (err) {
      alert('Error exporting data: ' + err.message);
    }
  };

  const exportExcel = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      window.open('/api/export/excel', '_blank');
    } catch (err) {
      alert('Error exporting data: ' + err.message);
    }
  };

  const deleteMember = async (id) => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/members/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to delete member');

      await fetchMembers();
      alert('Member deleted successfully!');
    } catch (err) {
      alert('Error deleting member: ' + err.message);
    }
  };

  const startEdit = (member) => {
    setEditingId(member.id);
    setEditData({...member});
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const saveEdit = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/members/${editingId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editData)
      });

      if (!response.ok) throw new Error('Failed to update member');

      await fetchMembers();
      setEditingId(null);
      setEditData({});
      alert('Member updated successfully!');
    } catch (err) {
      alert('Error updating member: ' + err.message);
    }
  };

  const addMember = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/members', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMember)
      });

      if (!response.ok) throw new Error('Failed to add member');

      await fetchMembers();
      setShowAddForm(false);
      setNewMember({
        surname: '',
        given_name: '',
        email: '',
        mobile: '',
        membership_type: '',
        institution: '',
        field_of_study: ''
      });
      alert('Member added successfully!');
    } catch (err) {
      alert('Error adding member: ' + err.message);
    }
  };

  const handleEditChange = (field, value) => {
    setEditData({...editData, [field]: value});
  };

  if (loading) {
    return <div className="text-white text-center py-8">Loading members...</div>;
  }

  if (error) {
    return <div className="text-red-400 text-center py-8">Error: {error}</div>;
  }

  return (
    <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <FaUserPlus className="text-blue-400" /> Member Management
          <span className="text-sm font-normal text-white/60 ml-2">
            ({filteredMembers.length} members)
          </span>
        </h2>
        <div className="flex flex-wrap gap-3">
          <div className="relative group">
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition flex items-center gap-2">
              <FaDownload /> Export
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg hidden group-hover:block">
              <button onClick={exportCSV} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-t-lg">Export CSV</button>
              <button onClick={exportExcel} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-lg">Export Excel</button>
            </div>
          </div>
          <button
            onClick={fetchMembers}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
          >
            <FaSync /> Refresh
          </button>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
          >
            <FaUserPlus /> Add Member
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[200px] relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, institution..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/20 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white/20 text-white border border-white/20 focus:border-blue-500 focus:outline-none"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <select
          value={filterMembership}
          onChange={(e) => setFilterMembership(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white/20 text-white border border-white/20 focus:border-blue-500 focus:outline-none"
        >
          <option value="all">All Membership</option>
          <option value="student">Student Member</option>
          <option value="graduate">Graduate Member</option>
          <option value="life">Life Member</option>
          <option value="partner">Partner</option>
        </select>
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(parseInt(e.target.value));
            setCurrentPage(1);
          }}
          className="px-4 py-2 rounded-lg bg-white/20 text-white border border-white/20 focus:border-blue-500 focus:outline-none"
        >
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="25">25 per page</option>
          <option value="50">50 per page</option>
          <option value="100">100 per page</option>
        </select>
        {(searchTerm || filterStatus !== 'all' || filterMembership !== 'all') && (
          <button
            onClick={() => {
              setSearchTerm('');
              setFilterStatus('all');
              setFilterMembership('all');
            }}
            className="px-4 py-2 rounded-lg bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 transition"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Add Member Form */}
      {showAddForm && (
        <div className="bg-white/10 rounded-lg p-4 mb-6 border border-green-500/30">
          <h3 className="text-white font-semibold mb-3">Add New Member</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Surname *"
              value={newMember.surname}
              onChange={(e) => setNewMember({...newMember, surname: e.target.value})}
              className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/20 focus:border-blue-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Given Name *"
              value={newMember.given_name}
              onChange={(e) => setNewMember({...newMember, given_name: e.target.value})}
              className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/20 focus:border-blue-500 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email *"
              value={newMember.email}
              onChange={(e) => setNewMember({...newMember, email: e.target.value})}
              className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/20 focus:border-blue-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Mobile"
              value={newMember.mobile}
              onChange={(e) => setNewMember({...newMember, mobile: e.target.value})}
              className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/20 focus:border-blue-500 focus:outline-none"
            />
            <select
              value={newMember.membership_type}
              onChange={(e) => setNewMember({...newMember, membership_type: e.target.value})}
              className="px-4 py-2 rounded-lg bg-white/20 text-white border border-white/20 focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select Membership Type</option>
              <option value="Student Member">Student Member</option>
              <option value="Graduate Member">Graduate Member</option>
              <option value="Life Member">Life Member</option>
              <option value="Partner">Partner</option>
            </select>
            <input
              type="text"
              placeholder="Institution"
              value={newMember.institution}
              onChange={(e) => setNewMember({...newMember, institution: e.target.value})}
              className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/20 focus:border-blue-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Field of Study"
              value={newMember.field_of_study}
              onChange={(e) => setNewMember({...newMember, field_of_study: e.target.value})}
              className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/20 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={addMember}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition"
            >
              Save Member
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Members Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-white">
          <thead className="bg-white/10">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-white/5" onClick={() => handleSort('id')}>
                <div className="flex items-center gap-1">ID {getSortIcon('id')}</div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-white/5" onClick={() => handleSort('surname')}>
                <div className="flex items-center gap-1">Surname {getSortIcon('surname')}</div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-white/5" onClick={() => handleSort('given_name')}>
                <div className="flex items-center gap-1">Given Name {getSortIcon('given_name')}</div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-white/5" onClick={() => handleSort('email')}>
                <div className="flex items-center gap-1">Email {getSortIcon('email')}</div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-white/5" onClick={() => handleSort('membership_type')}>
                <div className="flex items-center gap-1">Membership {getSortIcon('membership_type')}</div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-white/5" onClick={() => handleSort('application_status')}>
                <div className="flex items-center gap-1">Status {getSortIcon('application_status')}</div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {currentItems.map((member) => (
              <tr key={member.id} className="hover:bg-white/5 transition">
                <td className="px-4 py-3 text-sm">{member.id}</td>
                <td className="px-4 py-3">
                  {editingId === member.id ? (
                    <input
                      type="text"
                      value={editData.surname || ''}
                      onChange={(e) => handleEditChange('surname', e.target.value)}
                      className="px-2 py-1 rounded bg-white/20 text-white w-24"
                    />
                  ) : (
                    member.surname
                  )}
                </td>
                <td className="px-4 py-3">
                  {editingId === member.id ? (
                    <input
                      type="text"
                      value={editData.given_name || ''}
                      onChange={(e) => handleEditChange('given_name', e.target.value)}
                      className="px-2 py-1 rounded bg-white/20 text-white w-24"
                    />
                  ) : (
                    member.given_name
                  )}
                </td>
                <td className="px-4 py-3 text-sm">
                  {editingId === member.id ? (
                    <input
                      type="email"
                      value={editData.email || ''}
                      onChange={(e) => handleEditChange('email', e.target.value)}
                      className="px-2 py-1 rounded bg-white/20 text-white w-full"
                    />
                  ) : (
                    member.email
                  )}
                </td>
                <td className="px-4 py-3 text-sm">
                  {editingId === member.id ? (
                    <select
                      value={editData.membership_type || ''}
                      onChange={(e) => handleEditChange('membership_type', e.target.value)}
                      className="px-2 py-1 rounded bg-white/20 text-white w-full"
                    >
                      <option value="Student Member">Student Member</option>
                      <option value="Graduate Member">Graduate Member</option>
                      <option value="Life Member">Life Member</option>
                      <option value="Partner">Partner</option>
                    </select>
                  ) : (
                    member.membership_type || 'N/A'
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    member.application_status === 'Approved' ? 'bg-green-500/30 text-green-300' :
                    member.application_status === 'Rejected' ? 'bg-red-500/30 text-red-300' :
                    'bg-yellow-500/30 text-yellow-300'
                  }`}>
                    {member.application_status || 'Pending'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {editingId === member.id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={saveEdit}
                        className="text-green-400 hover:text-green-300 transition"
                        title="Save"
                      >
                        <FaSave />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="text-gray-400 hover:text-gray-300 transition"
                        title="Cancel"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        onClick={() => startEdit(member)}
                        className="text-blue-400 hover:text-blue-300 transition"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => deleteMember(member.id)}
                        className="text-red-400 hover:text-red-300 transition"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                      <button
                        onClick={() => window.open(`/member/${member.id}`, '_blank')}
                        className="text-gray-400 hover:text-gray-300 transition"
                        title="View"
                      >
                        <FaEye />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredMembers.length === 0 && (
          <p className="text-white/50 text-center py-8">No members found matching your filters.</p>
        )}
      </div>

      {/* Pagination */}
      {filteredMembers.length > 0 && (
        <div className="flex flex-wrap justify-between items-center mt-4 gap-3">
          <div className="text-white/60 text-sm">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredMembers.length)} of {filteredMembers.length} members
          </div>
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => paginate(1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-lg text-sm transition ${
                currentPage === 1 
                  ? 'bg-white/10 text-white/40 cursor-not-allowed' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              First
            </button>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-lg text-sm transition ${
                currentPage === 1 
                  ? 'bg-white/10 text-white/40 cursor-not-allowed' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Previous
            </button>
            {[...Array(Math.min(totalPages, 5))].map((_, idx) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = idx + 1;
              } else if (currentPage <= 3) {
                pageNum = idx + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + idx;
              } else {
                pageNum = currentPage - 2 + idx;
              }
              return (
                <button
                  key={idx}
                  onClick={() => paginate(pageNum)}
                  className={`px-3 py-1 rounded-lg text-sm transition ${
                    currentPage === pageNum
                      ? 'bg-white text-blue-600 font-bold'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-lg text-sm transition ${
                currentPage === totalPages 
                  ? 'bg-white/10 text-white/40 cursor-not-allowed' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Next
            </button>
            <button
              onClick={() => paginate(totalPages)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-lg text-sm transition ${
                currentPage === totalPages 
                  ? 'bg-white/10 text-white/40 cursor-not-allowed' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Last
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
