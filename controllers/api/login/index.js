const passport = require("passport");
const jwt = require("jsonwebtoken");

exports.getLogins = (req, res) => {
  try {
    res.status(200).json({
      data: ["google"],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

exports.googleAuthRedirect = (req, res) => {
  const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.setHeader("Authorization", `Bearer ${token}`);

  // TODO: Redirect to the frontend URL
  return res.redirect("");
};
