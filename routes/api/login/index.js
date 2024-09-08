const {
  getLogins,
  googleAuth,
  googleAuthRedirect,
} = require("../../../controllers/api/login");

const LoginRouter = require("express").Router();

LoginRouter.get("/", getLogins);
LoginRouter.get("/auth/google", googleAuth);
LoginRouter.get("/auth/google/redirect", googleAuthRedirect);

module.exports = LoginRouter;
