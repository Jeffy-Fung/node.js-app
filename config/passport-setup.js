const User = require("../../models/User");
const passport = require("passport");

// For Google Strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// For JWT Strategy
const passportJWT = require("passport-jwt");
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

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findOneById(jwtPayload.id);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

function generatePassword(username) {
  const randomNumbers = Math.floor(10000000 + Math.random() * 90000000);
  return `${username}_${randomNumbers}`;
}
