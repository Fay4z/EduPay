const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");

const {
  getStudentProfile,
  getMyPayments,
  getStudentDashboardStats,
} = require("../controllers/studentController");

router.get("/me", protect, authorize("student"), getStudentProfile);

router.get(
  "/dashboard-stats",
  protect,
  authorize("student"),
  getStudentDashboardStats,
);

router.get("/payments", protect, authorize("student"), getMyPayments);

module.exports = router;
