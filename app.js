require('dotenv').config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

require("./config/dbConnect");

const RootRouter = require("./routes/index");

app.use("/", RootRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
