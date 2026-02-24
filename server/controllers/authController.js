const passport = require("passport");
const generateToken = require("../utils/generateToken");

const studentLogin = async (req, res, next) => {
  passport.authenticate(
    "student-local",
    { session: false },
    (err, student, info) => {
      if (err) return next(err);
      console.log("student login:", student);
      if (!student) {
        return res.status(401).json({ message: info.message });
      }

      return res.json({
        id: student._id,
        email: student.email,
        name: student.name,
        role: "student",
        token: generateToken(student._id, "student"),
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
        id: user._id,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, "admin"),
      });
    },
  )(req, res, next);
};

module.exports = {
  adminLogin,
  studentLogin,
};
