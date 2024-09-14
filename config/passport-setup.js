// TODO?: Split this file into multiple files for each strategy

const User = require("@models/User");
const passport = require("passport");

// For Google Strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// For JWT Strategy
const passportJWT = require("passport-jwt");
const { createAccountFromGoogle } = require("@modules/createUser");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

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

      const user = await User.findOne({ googleId: profile.id });

      if (!user) {
        try {
          const newUser = await createAccountFromGoogle({
            username: getUsernameFromGoogleDisplayname(profile.displayName),
            email: profile.emails[0].value,
            googleId: profile.id,
          });

          return done(null, newUser);
        } catch (error) {
          return done(error, null);
        }
      } else {
        return done(null, user);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.id);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

function getUsernameFromGoogleDisplayname(displayname) {
  const username = displayname.trim().split(" ").join("_").toLowerCase();
  return username;
}
