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

exports.createIfNotExists = async (data) => {
  try {
    const existingDocument = await News.findOne({ url: data.url });

    if (!existingDocument) {
      const newDocument = new News(data);
      const savedDocument = await newDocument.save();
      return savedDocument;
    } else {
      console.log(`Document with URL ${data.url} already exists.`);
      return existingDocument;
    }
  } catch (error) {
    console.error('Error inserting document:', error);
    throw error;
  }
};

module.exports = mongoose.model("News", newsSchema);
