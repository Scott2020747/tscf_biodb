const express = require('express');
const router = express.Router();
const { exportCSV, exportExcel } = require('../controllers/exportController');
const { verifyToken, isAdmin } = require('../controllers/authController');

// ================================
// EXPORT ROUTES (Admin only)
// ================================

// CSV Export - accepts token in query string for window.open
router.get('/csv', async (req, res) => {
  // Check for token in query string (for window.open)
  if (req.query.token) {
    req.headers.authorization = `Bearer ${req.query.token}`;
  }
  verifyToken(req, res, () => {
    isAdmin(req, res, () => {
      exportCSV(req, res);
    });
  });
});

// Excel Export - accepts token in query string for window.open
router.get('/excel', async (req, res) => {
  if (req.query.token) {
    req.headers.authorization = `Bearer ${req.query.token}`;
  }
  verifyToken(req, res, () => {
    isAdmin(req, res, () => {
      exportExcel(req, res);
    });
  });
});

module.exports = router;
