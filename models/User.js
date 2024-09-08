const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 8 },
    email: { type: String, required: false, unique: true },
    phone: { type: Number, required: false },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    googleId: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
