const {
  getLogins,
} = require("../../../controllers/api/login");

const LoginRouter = require("express").Router();

LoginRouter.get("/", getLogins);

module.exports = LoginRouter;
