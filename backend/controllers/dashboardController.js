const pool = require("../config/db");

// ================================
// DASHBOARD STATS
// ================================
const getDashboardStats = async (req, res) => {
  try {
    // Total members
    const totalMembers = await pool.query(
      `SELECT COUNT(*) FROM members`
    );

    // Approved
    const approved = await pool.query(
      `SELECT COUNT(*) FROM members WHERE application_status='Approved'`
    );

    // Pending
    const pending = await pool.query(
      `SELECT COUNT(*) FROM members WHERE application_status='Pending'`
    );

    // Rejected
    const rejected = await pool.query(
      `SELECT COUNT(*) FROM members WHERE application_status='Rejected'`
    );

    // Life members
    const lifeMembers = await pool.query(
      `SELECT COUNT(*) FROM members WHERE membership_type='Life Member'`
    );

    // Total donations
    const donations = await pool.query(
      `SELECT COALESCE(SUM(donation_amount),0) AS total FROM donations`
    );

    res.json({
      totalMembers: parseInt(totalMembers.rows[0].count),
      approved: parseInt(approved.rows[0].count),
      pending: parseInt(pending.rows[0].count),
      rejected: parseInt(rejected.rows[0].count),
      lifeMembers: parseInt(lifeMembers.rows[0].count),
      totalDonations: parseFloat(donations.rows[0].total)
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardStats
};
