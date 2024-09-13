require('dotenv').config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

require("./config/dbConnect");
require("./config/passport-setup");

const session = require('express-session');
const passport = require('passport');

app.use(session({
  secret: process.env.SESSION_SECRET || "keyboard cat",
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

const RootRouter = require("./routes/index");

app.use("/", RootRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
