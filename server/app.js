const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db.js");
const passport = require("./config/passport.js");
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const appRoutes = require("./routes/authRoutes.js");
const paymentRoutes = require("./routes/paymentRoutes.js");
const schoolRoutes = require("./routes/schoolRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");

require("dotenv").config();

connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(morgan("dev"));
app.use(passport.initialize());
app.use(express.json());

app.use("/api/auth", appRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/school", schoolRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("hello world");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
