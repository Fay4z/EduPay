const express = require("express");
const Payment = require("../models/Payment");
const { protect, authorize } = require("../middleware/authMiddleware");
const {
  assignPayment,
  togglePaymentStatus,
  getVerificationPendingPayments,
  approvePaymentStatus,
  rejectPaymentStatus,
  confirmPaymentRequest,
} = require("../controllers/paymentController");

const router = express.Router();

router.post("/payments", protect, authorize("admin"), assignPayment);

router.get(
  "/payments/pending",
  protect,
  authorize("admin"),
  getVerificationPendingPayments,
);

router.put(
  "/payments/approve/:id",
  protect,
  authorize("admin"),
  approvePaymentStatus,
);

router.put(
  "/payments/reject/:id",
  protect,
  authorize("admin"),
  rejectPaymentStatus,
);

router.put(
  "/payment/confirm/:id",
  protect,
  authorize("student"),
  confirmPaymentRequest,
);

module.exports = router;
