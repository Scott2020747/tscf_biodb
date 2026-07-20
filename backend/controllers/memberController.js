const pool = require("../config/db");
const { sendConfirmationEmail, sendAdminNotification, sendStatusUpdateEmail } = require('../services/emailService');

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

  return `${prefix}-${new Date().getFullYear()}-${String(id).padStart(4, '0')}`;
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
      campus_location,
      student_id,
      membership_role,
      leadership_role,
      graduation_year,
      field_of_study,
      years_in_tscf,
      graduate_programs,
      membership_type,
      fortnightly_amount,
      monthly_amount,
      yearly_amount,
      donation_amount
    } = req.body;

    if (!surname || !given_name || !email) {
      return res.status(400).json({
        message: 'Surname, Given Name, and Email are required'
      });
    }

    const existing = await pool.query(
      'SELECT id FROM members WHERE email = $1',
      [email]
    );

    if (existing.rows.length > 0) {
      return res.status(409).json({
        message: 'Email already registered. Please use a different email.'
      });
    }

    const result = await pool.query(
      `
      INSERT INTO members (
        surname, given_name, institution, dob, sex,
        marital_status, home_province, country, denomination,
        address, phone, mobile, email,
        university_attended, campus_location, student_id,
        membership_role, leadership_role, graduation_year,
        field_of_study, years_in_tscf, graduate_programs,
        membership_type, fortnightly_amount, monthly_amount,
        yearly_amount, donation_amount,
        application_status, created_at
      )
      VALUES (
        $1,$2,$3,$4,$5,
        $6,$7,$8,$9,
        $10,$11,$12,$13,
        $14,$15,$16,
        $17,$18,$19,
        $20,$21,$22,
        $23,$24,$25,
        $26,$27,
        'Pending', NOW()
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
        campus_location,
        student_id,
        membership_role,
        leadership_role,
        graduation_year,
        field_of_study,
        years_in_tscf,
        graduate_programs || [],
        membership_type,
        fortnightly_amount || 0,
        monthly_amount || 0,
        yearly_amount || 0,
        donation_amount || 0
      ]
    );

    const member = result.rows[0];
    const membership_number = generateMembershipNumber(
      member.id,
      member.membership_type
    );

    await pool.query(
      `UPDATE members SET membership_number=$1 WHERE id=$2`,
      [membership_number, member.id]
    );

    const updatedMember = await pool.query(
      `SELECT * FROM members WHERE id=$1`,
      [member.id]
    );

    const memberData = updatedMember.rows[0];

    sendConfirmationEmail({
      surname: memberData.surname,
      given_name: memberData.given_name,
      email: memberData.email,
      membership_type: memberData.membership_type,
      membership_number: memberData.membership_number
    }).catch(err => {
      console.error('❌ Background email error:', err.message);
    });

    sendAdminNotification({
      surname: memberData.surname,
      given_name: memberData.given_name,
      email: memberData.email,
      membership_type: memberData.membership_type,
      membership_number: memberData.membership_number
    }).catch(err => {
      console.error('❌ Background admin email error:', err.message);
    });

    res.status(201).json({
      success: true,
      message: "Member registered successfully! A confirmation email has been sent.",
      member: memberData
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: "Registration failed. Please try again.",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
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

    res.json({
      success: true,
      count: result.rows.length,
      members: result.rows
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
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
      return res.status(404).json({
        success: false,
        message: "Member not found"
      });
    }

    res.json({
      success: true,
      member: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ================================
// UPDATE MEMBER
// ================================
const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('📝 Updating member ID:', id);
    console.log('📝 Update data:', req.body);

    const {
      surname,
      given_name,
      email,
      mobile,
      phone,
      address,
      institution,
      field_of_study,
      membership_type,
      application_status
    } = req.body;

    const updates = [];
    const values = [];
    let paramCount = 1;

    if (surname !== undefined) {
      updates.push(`surname = $${paramCount}`);
      values.push(surname);
      paramCount++;
    }
    if (given_name !== undefined) {
      updates.push(`given_name = $${paramCount}`);
      values.push(given_name);
      paramCount++;
    }
    if (email !== undefined) {
      updates.push(`email = $${paramCount}`);
      values.push(email);
      paramCount++;
    }
    if (mobile !== undefined) {
      updates.push(`mobile = $${paramCount}`);
      values.push(mobile);
      paramCount++;
    }
    if (phone !== undefined) {
      updates.push(`phone = $${paramCount}`);
      values.push(phone);
      paramCount++;
    }
    if (address !== undefined) {
      updates.push(`address = $${paramCount}`);
      values.push(address);
      paramCount++;
    }
    if (institution !== undefined) {
      updates.push(`institution = $${paramCount}`);
      values.push(institution);
      paramCount++;
    }
    if (field_of_study !== undefined) {
      updates.push(`field_of_study = $${paramCount}`);
      values.push(field_of_study);
      paramCount++;
    }
    if (membership_type !== undefined) {
      updates.push(`membership_type = $${paramCount}`);
      values.push(membership_type);
      paramCount++;
    }
    if (application_status !== undefined) {
      updates.push(`application_status = $${paramCount}`);
      values.push(application_status);
      paramCount++;
    }

    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields to update"
      });
    }

    values.push(id);
    const query = `
      UPDATE members
      SET ${updates.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `;

    console.log('📝 Query:', query);
    console.log('📝 Values:', values);

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Member not found"
      });
    }

    console.log('✅ Member updated successfully:', result.rows[0].id);
    res.json({
      success: true,
      message: "Member updated successfully",
      member: result.rows[0]
    });
  } catch (error) {
    console.error('❌ Update error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to update member",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// ================================
// DELETE MEMBER
// ================================
const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM members WHERE id=$1 RETURNING id`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Member not found"
      });
    }

    res.json({
      success: true,
      message: "Member deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
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
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be Pending, Approved, or Rejected"
      });
    }

    const currentMember = await pool.query(
      'SELECT * FROM members WHERE id=$1',
      [id]
    );

    if (currentMember.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Member not found"
      });
    }

    const oldStatus = currentMember.rows[0].application_status || 'Pending';

    const result = await pool.query(
      `UPDATE members SET application_status=$1 WHERE id=$2 RETURNING *`,
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Member not found"
      });
    }

    const member = result.rows[0];

    if (oldStatus !== status) {
      try {
        await sendStatusUpdateEmail({
          surname: member.surname,
          given_name: member.given_name,
          email: member.email,
          membership_number: member.membership_number
        }, oldStatus, status);
      } catch (emailError) {
        console.error('❌ Status update email failed:', emailError.message);
      }
    }

    res.json({
      success: true,
      message: `Application ${status}`,
      member: result.rows[0]
    });
  } catch (error) {
    console.error('Status update error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
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
