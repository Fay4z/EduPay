const express = require("express");
const { registerSchool } = require("../controllers/schoolController");

const router = express.Router();

router.post("/register", registerSchool);

module.exports = router;
