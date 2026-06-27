const pool = require("../config/db");

// ================================
// HELPER: Generate Membership Number
// ================================
const generateMembershipNumber = (id, type) => {
  const prefix =
    type === "Student Member"
      ? "STU"
      : type === "Graduate Member"
      ? "GRD"
      : type === "Life Member"
      ? "LIF"
      : "PRT";

  return `${prefix}-${new Date().getFullYear()}-${id}`;
};

// ================================
// CREATE MEMBER (REGISTER FORM)
// ================================
const createMember = async (req, res) => {
  try {
    const {
      surname,
      given_name,
      institution,
      dob,
      sex,
      marital_status,
      home_province,
      country,
      denomination,
      address,
      phone,
      mobile,
      email,
      university_attended,
      membership_role,
      leadership_role,
      graduation_year,
      field_of_study,
      membership_type
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO members (
        surname, given_name, institution, dob, sex,
        marital_status, home_province, country, denomination,
        address, phone, mobile, email,
        university_attended, membership_role, leadership_role,
        graduation_year, field_of_study, membership_type
      )
      VALUES (
        $1,$2,$3,$4,$5,
        $6,$7,$8,$9,
        $10,$11,$12,$13,
        $14,$15,$16,
        $17,$18,$19
      )
      RETURNING *
      `,
      [
        surname,
        given_name,
        institution,
        dob,
        sex,
        marital_status,
        home_province,
        country,
        denomination,
        address,
        phone,
        mobile,
        email,
        university_attended,
        membership_role,
        leadership_role,
        graduation_year,
        field_of_study,
        membership_type
      ]
    );

    const member = result.rows[0];

    // generate membership number after insert
    const membership_number = generateMembershipNumber(
      member.id,
      member.membership_type
    );

    await pool.query(
      `UPDATE members SET membership_number=$1 WHERE id=$2`,
      [membership_number, member.id]
    );

    res.status(201).json({
      message: "Member registered successfully",
      member: { ...member, membership_number }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ================================
// GET ALL MEMBERS (ADMIN)
// ================================
const getAllMembers = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM members ORDER BY created_at DESC`
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================================
// GET SINGLE MEMBER
// ================================
const getMemberById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT * FROM members WHERE id=$1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================================
// UPDATE MEMBER
// ================================
const updateMember = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      phone,
      mobile,
      address,
      denomination,
      field_of_study
    } = req.body;

    const result = await pool.query(
      `
      UPDATE members
      SET phone=$1,
          mobile=$2,
          address=$3,
          denomination=$4,
          field_of_study=$5
      WHERE id=$6
      RETURNING *
      `,
      [phone, mobile, address, denomination, field_of_study, id]
    );

    res.json({
      message: "Member updated successfully",
      member: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================================
// DELETE MEMBER
// ================================
const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(`DELETE FROM members WHERE id=$1`, [id]);

    res.json({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================================
// UPDATE APPLICATION STATUS
// ================================
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["Pending", "Approved", "Rejected"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const result = await pool.query(
      `UPDATE members SET application_status=$1 WHERE id=$2 RETURNING *`,
      [status, id]
    );

    res.json({
      message: `Application ${status}`,
      member: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
  updateStatus
};
