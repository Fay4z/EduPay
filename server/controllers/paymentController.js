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

const getVerificationPendingPayments = async (req, res) => {
  try {
    const payments = await Payment.find({
      status: "verification_pending",
      school: req.user.school,
    }).populate("student", "name email");

    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const approvePaymentStatus = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) return res.status(404).json({ message: "Not found" });

    payment.status = "paid";
    await payment.save();

    res.json({ message: "Payment approved" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const rejectPaymentStatus = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) return res.status(404).json({ message: "Not found" });

    payment.status = "rejected";
    await payment.save();

    res.json({ message: "Payment rejected" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const confirmPaymentRequest = async (req, res) => {
  const payment = await Payment.findById(req.params.id);

  if (!payment) {
    return res.status(404).json({ message: "Not found" });
  }

  payment.status = "verification_pending";
  await payment.save();

  res.json(payment);
};

module.exports = {
  assignPayment,
  getPaymentForSingleStudent,
  getVerificationPendingPayments,
  approvePaymentStatus,
  rejectPaymentStatus,
  confirmPaymentRequest,
};
