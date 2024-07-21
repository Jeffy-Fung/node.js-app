const APIRouter = require("express").Router();

APIRouter.get("/", (req, res, next) => {
  res.send("API is working properly");
});

module.exports = APIRouter;
