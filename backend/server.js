const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();

// ================================
// TRUST PROXY
// ================================
app.set("trust proxy", 1);

// ================================
// MIDDLEWARE
// ================================
app.use(helmet());

app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(express.json());

// ================================
// RATE LIMITER
// ================================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200
});

app.use(limiter);

// ================================
// ROUTES
// ================================
app.get("/", (req, res) => {
  res.json({ message: "TSCF API Running 🚀" });
});

const memberRoutes = require("./routes/members");
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const exportRoutes = require("./routes/export");
const reportRoutes = require("./routes/reports");

app.use("/api/members", memberRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/export", exportRoutes);
app.use("/api/reports", reportRoutes);

// ================================
// START SERVER
// ================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
