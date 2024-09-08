const {
  getLogins,
  googleAuth,
  googleAuthRedirect,
} = require("../../../controllers/api/login");

const LoginRouter = require("express").Router();

LoginRouter.get("/", getLogins);
LoginRouter.get("/auth/google", googleAuth);
LoginRouter.get("/auth/google/redirect", googleAuth, googleAuthRedirect);

// TODO: logout endpoint

module.exports = LoginRouter;
