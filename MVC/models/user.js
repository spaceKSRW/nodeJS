const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
      first_name: {
        required: true,
        type: String,
      },
      last_name: {
        required: true,
        type: String,
      },
      email: {
        reuqired: true,
        unique: true,
        type: String,
      },
      job_title: {
        type: String,
      },
      gender: {
        type: String,
      },
    },
    { timestamps: true }
  );

  const User = mongoose.model("user", userSchema);

  module.exports = User;