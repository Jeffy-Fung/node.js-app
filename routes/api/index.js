const APIRouter = require("express").Router();

APIRouter.get("/", (req, res, next) => {
  res.send("API is working properly");
});

APIRouter.use("/users", require("./users/index"));
APIRouter.use("/login", require("./login/index"));

module.exports = APIRouter;
