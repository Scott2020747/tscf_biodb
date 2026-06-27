const jwt = require("jsonwebtoken");
require("dotenv").config();

// ================================
// VERIFY TOKEN MIDDLEWARE
// ================================
const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided"
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Invalid token format"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // attach user payload

    next();

  } catch (error) {
    return res.status(403).json({
      message: "Invalid or expired token"
    });
  }
};

// ================================
// ADMIN ONLY MIDDLEWARE
// ================================
const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.user.role !== "Admin" && req.user.role !== "SuperAdmin") {
    return res.status(403).json({ message: "Admin access required" });
  }

  next();
};

module.exports = {
  verifyToken,
  isAdmin
};
