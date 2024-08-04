const express = require("express");

const RootRouter = express.Router();

RootRouter.use(express.json());

RootRouter.use("/api", require("./api/index"));

module.exports = RootRouter;
