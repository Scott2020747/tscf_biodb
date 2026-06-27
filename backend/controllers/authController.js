const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// ================================
// REGISTER ADMIN (OPTIONAL SETUP)
// ================================
const registerAdmin = async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;

    const existing = await pool.query(
      `SELECT * FROM admins WHERE email=$1`,
      [email]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `
      INSERT INTO admins (fullname, email, password_hash, role)
      VALUES ($1,$2,$3,$4)
      RETURNING id, fullname, email, role
      `,
      [fullname, email, hashedPassword, role || "Admin"]
    );

    res.status(201).json({
      message: "Admin created successfully",
      admin: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================================
// ADMIN LOGIN
// ================================
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      `SELECT * FROM admins WHERE email=$1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const admin = result.rows[0];

    const isMatch = await bcrypt.compare(password, admin.password_hash);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        role: admin.role
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      admin: {
        id: admin.id,
        fullname: admin.fullname,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin
};
