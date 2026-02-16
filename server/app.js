const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db.js");
const passport = require("./config/passport.js");

const appRoutes = require("./routes/authRoutes.js");
require("dotenv").config();

connectDB();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(passport.initialize());
app.use(express.json());

app.use("/api/auth", appRoutes);

app.get("/", (req, res) => {
  res.send("hello world");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
