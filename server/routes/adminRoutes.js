const {
  createStudent,
  getStudents,
  updateStudent,
  deleteStudent,
  getSingleStudent,
} = require("../controllers/studentController");
const express = require("express");
const router = express.Router();
const {
  getDashboardStats,
  addStudent,
} = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/dashboard-stats", protect, authorize("admin"), getDashboardStats);
router.get("/addStudent", protect, authorize("admin"), addStudent);
router.post("/students", protect, authorize("admin"), createStudent);
router.get("/students", protect, authorize("admin"), getStudents);
router.get("/students/:id", protect, authorize("admin"), getSingleStudent);
router.put("/students/:id", protect, authorize("admin"), updateStudent);
router.delete("/students/:id", protect, authorize("admin"), deleteStudent);
module.exports = router;
