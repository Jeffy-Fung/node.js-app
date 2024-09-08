const passport = require('passport');

exports.getLogins = async (req, res) => {
  try {
    res.status(200).json({
      data: [
        'google'
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
})

exports.googleAuthRedirect = async (req, res) => {
  // TODO: sign a jwt token
};