const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: Number, required: true },
    email: { type: String, required: false, unique: true },
    phone: { type: Number, required: false },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
