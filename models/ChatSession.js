const mongoose = require("mongoose");

const chatSessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    chatHistories: [{ type: mongoose.Schema.Types.ObjectId, ref: "ChatHistory" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChatSession", chatSessionSchema);
