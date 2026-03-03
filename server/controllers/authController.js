const passport = require("passport");
const generateToken = require("../utils/generateToken");

const studentLogin = async (req, res, next) => {
  passport.authenticate(
    "student-local",
    { session: false },
    (err, student, info) => {
      if (err) return next(err);

      if (!student) {
        return res.status(401).json({ message: info.message });
      }

      return res.json({
        token: generateToken(student._id, "student"),
        user: {
          _id: student._id,
          name: student.name,
          email: student.email,
          role: "student",
          rollNumber: student.rollNumber,
          className: student.className,
          school: student.school,
          totalFees: student.totalFees,
          feesPaid: student.feesPaid,
        },
      });
    },
  )(req, res, next);
};

const adminLogin = (req, res, next) => {
  passport.authenticate(
    "admin-local",
    { session: false },
    (err, user, info) => {
      if (err) return next(err);

      if (!user) {
        return res.status(401).json({ message: info.message });
      }

      return res.json({
        token: generateToken(user._id, "admin"),
        user: {
          _id: user._id,
          email: user.email,
          role: user.role,
          school: user.school,
        },
      });
    },
  )(req, res, next);
};

module.exports = {
  adminLogin,
  studentLogin,
};
