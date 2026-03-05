const Student = require("../models/Student");
const Payment = require("../models/Payment");

const createStudent = async (req, res) => {
  console.log("User from token:", req.user);
  try {
    const { name, email, rollNumber, className, password } = req.body;

    const student = await Student.create({
      name,
      email,
      rollNumber,
      className,
      password,
      school: req.user.school,
    });

    res.status(201).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create student" });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await Student.find({
      school: req.user.school,
    }).sort({ createdAt: -1 });

    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch students" });
  }
};

const getSingleStudent = async (req, res) => {
  console.log(req.user);
  try {
    const student = await Student.findById({
      _id: req.params.id,
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update student" });
  }
};

const updateStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      {
        _id: req.params.id,
        school: req.user.school,
      },
      req.body,
      { new: true },
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update student" });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({
      _id: req.params.id,
      school: req.user.school,
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete student" });
  }
};

const getStudentProfile = async (req, res) => {
  console.log("student profile:", req.user);
  try {
    const student = await Student.findById(req.user._id).select("-password");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

const getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({
      student: req.user._id,
    })
      .sort({ createdAt: -1 })
      .populate("school", "name upiId");

    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch payments" });
  }
};

const getStudentDashboardStats = async (req, res) => {
  try {
    const payments = await Payment.find({
      student: req.user._id,
    });

    const totalAmount = payments.reduce((acc, p) => acc + p.amount, 0);

    const paidAmount = payments
      .filter((p) => p.status === "paid")
      .reduce((acc, p) => acc + p.amount, 0);

    const unpaidAmount = payments
      .filter((p) => p.status === "unpaid")
      .reduce((acc, p) => acc + p.amount, 0);

    res.json({
      totalPayments: payments.length,
      totalAmount,
      paidAmount,
      unpaidAmount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};

module.exports = {
  createStudent,
  getStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
  getStudentProfile,
  getMyPayments,
  getStudentDashboardStats,
};
