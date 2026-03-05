const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const Student = require("../models/Student");

passport.use(
  "admin-local",
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email }).populate("school", "name");

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
          return done(null, false, { message: "Invalid credentials" });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.use(
  "student-local",
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const student = await Student.findOne({ email }).populate(
          "school",
          "name",
        );

        if (!student) {
          return done(null, false, { message: "student not found" });
        }

        const isMatch = await student.matchPassword(password);

        if (!isMatch) {
          return done(null, false, { message: "Invalid credentials" });
        }

        return done(null, student);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

module.exports = passport;
