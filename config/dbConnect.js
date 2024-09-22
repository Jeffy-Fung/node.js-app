// config/dbConnect.js
const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, {
    user: process.env.MONGO_INITDB_ROOT_USERNAME,
    pass: process.env.MONGO_INITDB_ROOT_PASSWORD,
    dbName: "node-js-app",
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
