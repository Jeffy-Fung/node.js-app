const mongoose = require("mongoose");

const chatHistorySchema = new mongoose.Schema(
  {
    session: { type: mongoose.Schema.Types.ObjectId, ref: "ChatSession" },
    role: { type: String, enum: ["human", "system", "ai"] },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

chatHistorySchema.statics.convertRole = (role) => {
  switch (role) {
    case "human":
      return "user";
    case "system":
      return "ai";
    case "ai":
      return "ai";
    default:
      return role;
  }
};

module.exports = mongoose.model("ChatHistory", chatHistorySchema);
