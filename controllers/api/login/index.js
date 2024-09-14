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

// TODO: encapsulate googleAuth as a auth provider service?
// TODO: distinguish between request for token and request for exchanging user data with token
exports.googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
  session: false,
});

exports.googleAuthRedirect = (req, res) => {
  // TODO: encapsulate sign jwt token as a function / service
  console.log("redirect success: ", req.user);
  const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.setHeader("Authorization", `Bearer ${token}`);

  // TODO: Redirect to the frontend URL
  return res.redirect("http://localhost:3000");
};
