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
