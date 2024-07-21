const RootRouter = require("express").Router();

RootRouter.use("/api", require("./api/index"));

module.exports = RootRouter;
