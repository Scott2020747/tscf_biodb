const pool = require("../config/db");
const jwt = require('jsonwebtoken');

// ================================
// ADMIN LOGIN (Super Admin Only)
// ================================
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find admin user
    const result = await pool.query(
      'SELECT * FROM admins WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const admin = result.rows[0];

    // Check if user is Super Admin
    if (admin.role !== 'Super Admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Super Admin privileges required.'
      });
    }

    // Compare password (plain text for now - use bcrypt in production)
    if (password !== admin.password_hash) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET || 'tscf_secret_key_2026',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: admin.id,
        fullname: admin.fullname,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.'
    });
  }
};

// ================================
// VERIFY TOKEN
// ================================
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tscf_secret_key_2026');
    
    // Check if user is Super Admin
    if (decoded.role !== 'Super Admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Super Admin privileges required.'
      });
    }
    
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

// ================================
// IS ADMIN MIDDLEWARE (Checks Super Admin)
// ================================
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'Super Admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied. Super Admin privileges required.'
    });
  }
};

module.exports = {
  loginAdmin,
  verifyToken,
  isAdmin
};
