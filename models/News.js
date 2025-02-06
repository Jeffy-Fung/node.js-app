const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    url: { type: String, required: true },
    content: { type: String, required: false },
    source: { type: String, required: false },
    publishedAt: { type: Date, required: false },
  },

  { timestamps: true }
);

module.exports = mongoose.model("News", newsSchema);
