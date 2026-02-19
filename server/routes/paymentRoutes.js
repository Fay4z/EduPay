const express = require("express");
const Payment = require("../models/Payment");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

//admin creates payment for students
router.post("/", protect, authorize("admin"), async (req, res) => {
  try {
    const { studentId, amount, dueDate } = req.body;

    const payment = await Payment.create({
      student: studentId,
      amount,
      dueDate,
    });

    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//student views all their payments
router.get("/mypayments", protect, authorize("student"), async (req, res) => {
  try {
    const payments = await Payment.find({
      student: req.user._id,
    });

    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//admin views all payments
router.get("/", protect, authorize("admin"), async (req, res) => {
  try {
    const payments = await Payment.find().populate("student", "name email");

    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
