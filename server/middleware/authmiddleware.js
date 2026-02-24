const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Student = require("../models/Student");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      let user;

      if (decoded.role === "admin") {
        user = await User.findById(decoded.id).select("-password");
      } else if (decoded.role === "student") {
        user = await Student.findById(decoded.id).select("-password");
      }

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      user.role = decoded.role;

      req.user = user;

      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized" });
    }
  } else {
    return res.status(401).json({ message: "No token" });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

module.exports = { protect, authorize };
