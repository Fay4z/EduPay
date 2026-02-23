const Payment = require("../models/Payment");
const Student = require("../models/Student");

const assignPayment = async (req, res) => {
  console.log("Request body:", req.body);
  try {
    const { studentId, amount, dueDate, reason } = req.body;

    const student = await Student.findOne({
      _id: studentId,
      school: req.user.school,
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const payment = await Payment.create({
      student: studentId,
      school: req.user.school,
      reason,
      amount,
      dueDate,
    });

    res.status(201).json(payment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getPaymentForSingleStudent = async (req, res) => {
  try {
    const payments = await Payment.find({
      student: req.params.id,
      school: req.user.school,
    }).sort({ createdAt: -1 });

    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const togglePaymentStatus = async (req, res) => {
  try {
    const payment = await Payment.findOne({
      _id: req.params.id,
      school: req.user.school,
    });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    payment.status = payment.status === "pending" ? "paid" : "pending";

    await payment.save();

    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  assignPayment,
  getPaymentForSingleStudent,
  togglePaymentStatus,
};
