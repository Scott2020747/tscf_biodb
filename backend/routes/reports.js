const express = require('express');
const router = express.Router();
const { generateMembershipReport } = require('../controllers/reportController');
const { verifyToken, isAdmin } = require('../controllers/authController');

// ================================
// REPORT ROUTES (Admin only)
// ================================

// PDF Report - accepts token in query string for window.open
router.get('/membership', async (req, res) => {
  // Check for token in query string (for window.open)
  if (req.query.token) {
    req.headers.authorization = `Bearer ${req.query.token}`;
  }
  verifyToken(req, res, () => {
    isAdmin(req, res, () => {
      generateMembershipReport(req, res);
    });
  });
});

module.exports = router;
