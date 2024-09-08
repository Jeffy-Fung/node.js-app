const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      callbackURL: "/api/login/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("accessToken:", accessToken);
      console.log("refreshToken:", refreshToken);

      if (!User.findOne({ googleId: profile.id })) {
        try {
          await User.create({
            username: profile.displayName,
            password: generatePassword(profile.displayName),
            email: profile.emails[0].value,
            googleId: profile.id,
          });
          return done(null, profile);
        } catch (error) {
          return done(error, null);
        }
      }
    }
  )
);

function generatePassword(username) {
  const randomNumbers = Math.floor(10000000 + Math.random() * 90000000);
  return `${username}_${randomNumbers}`;
}
