const mongoose = require("mongoose");

const noSpaces = (value) => {
  if (/\s/.test(value)) {
    throw new Error("No spaces are allowed.");
  }
};

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      validate: [noSpaces, "No spaces are allowed in the username."],
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      validate: [noSpaces, "No spaces are allowed in the password."],
    },
    email: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
      unique: true,
      validate: [noSpaces, "No spaces are allowed in the email."],
    },
    phone: { type: Number, required: false },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    googleId: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
