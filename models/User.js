const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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

userSchema.pre("save", async function (next) {
  const user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  try {
    const hash = await bcrypt.hash(user.password, saltRounds);
    user.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", userSchema);
