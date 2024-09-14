require('dotenv').config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

require("./config/dbConnect");
require("./config/passport-setup");

// TODO: encapsulate passport session middleware
const passport = require('passport');
app.use(passport.initialize());

const RootRouter = require("./routes/index");

app.use("/", RootRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
