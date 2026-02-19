const School = require("../models/School");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const registerSchool = async (req, res) => {
  try {
    const { schoolName, address, adminName, email, password } = req.body;

    // Check if school already exists
    const existingSchool = await School.findOne({ name: schoolName });
    if (existingSchool) {
      return res.status(400).json({
        message: "School already exists",
      });
    }

    // Create School
    const school = await School.create({
      name: schoolName,
      address,
    });

    // Create Admin linked to school
    const admin = await User.create({
      name: adminName,
      email,
      password,
      role: "admin",
      school: school._id,
    });

    // Generate JWT
    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.role,
        school: admin.school,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(201).json({
      message: "School registered successfully",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        school: school.name,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { registerSchool };
