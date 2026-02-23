const express = require("express");
const Payment = require("../models/Payment");
const { protect, authorize } = require("../middleware/authMiddleware");
const {
  assignPayment,
  togglePaymentStatus,
} = require("../controllers/paymentController");

const router = express.Router();

router.post("/payments", protect, authorize("admin"), assignPayment);

router.put("/payments/:id", protect, authorize("admin"), togglePaymentStatus);

module.exports = router;
