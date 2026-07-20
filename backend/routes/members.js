const express = require("express");
const router = express.Router();

const {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
  updateStatus
} = require("../controllers/memberController");

const { verifyToken, isAdmin } = require("../controllers/authController");
const { validateMember } = require("../middleware/validate");

// ================================
// PUBLIC ROUTE (REGISTRATION) - No auth required
// ================================
router.post("/", validateMember, createMember);

// ================================
// ADMIN ROUTES - Auth required
// ================================
router.get("/", verifyToken, isAdmin, getAllMembers);
router.get("/:id", verifyToken, isAdmin, getMemberById);
router.put("/:id", verifyToken, isAdmin, updateMember);
router.delete("/:id", verifyToken, isAdmin, deleteMember);
router.put("/:id/status", verifyToken, isAdmin, updateStatus);

module.exports = router;
