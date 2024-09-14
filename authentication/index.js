const passport = require("passport");

exports.authentication = passport.authenticate("jwt", { session: false });

// TODO?: distinguish between request for token and request for exchanging user data with token
exports.googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
  session: false,
});
