const { default: mongoose } = require("mongoose");

const schoolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: String,
  },
  { timestamps: true },
);

const School = mongoose.model("School", schoolSchema);

module.exports = School;
