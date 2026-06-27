const express = require("express");
const router = express.Router();

const {
  getDashboardStats
} = require("../controllers/dashboardController");

const { verifyToken, isAdmin } = require("../middleware/auth");

// ================================
// DASHBOARD STATS (ADMIN ONLY)
// ================================
router.get("/stats", verifyToken, isAdmin, getDashboardStats);

module.exports = router;
