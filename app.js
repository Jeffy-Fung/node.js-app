require('dotenv').config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const connectDB = require("./config/dbConnect");
require("./config/passport-setup");

const cors = require("cors");
app.use(cors({ origin: process.env.FRONTEND_URL }));

// TODO: encapsulate passport session middleware
const passport = require('passport');
app.use(passport.initialize());

const RootRouter = require("./routes/index");

app.use("/", RootRouter);

// Start server only after connecting to the database
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
