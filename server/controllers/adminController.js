const Student = require("../models/Student");
const Payment = require("../models/Payment");

const getDashboardStats = async (req, res) => {
  try {
    const schoolId = req.user.schoolId;

    const totalStudents = await Student.countDocuments({ school: schoolId });

    const totalFeesResult = await Payment.aggregate([
      { $match: { school: schoolId, status: "paid" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalFees = totalFeesResult[0]?.total || 0;

    const pendingResult = await Payment.aggregate([
      { $match: { school: schoolId, status: "pending" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const pendingPayments = pendingResult[0]?.total || 0;

    const currentMonth = new Date();
    const startOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1,
    );

    const monthlyResult = await Payment.aggregate([
      {
        $match: {
          school: schoolId,
          status: "paid",
          createdAt: { $gte: startOfMonth },
        },
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const monthlyRevenue = monthlyResult[0]?.total || 0;

    res.json({
      totalStudents,
      totalFees,
      pendingPayments,
      monthlyRevenue,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const addStudent = async (req, res) => {
  res.send("good");
};

module.exports = {
  getDashboardStats,
  addStudent,
};
