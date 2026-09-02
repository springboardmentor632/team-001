const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/User");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        "http://localhost:5000/api/auth/google/callback",
    },

    async (
      accessToken,
      refreshToken,
      profile,
      done
    ) => {
      try {
        console.log("Google Profile:", profile);

        const email =
          profile.emails?.[0]?.value;

        let user = await User.findOne({
          email,
        });

        // New User
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: email,
            avatar:
              profile.photos?.[0]?.value || "",
            isVerified: true,
          });

          console.log(
            "New Google User Created:",
            user.email
          );
        }

        // Existing User
        else {
          user.googleId = profile.id;
          user.avatar =
            profile.photos?.[0]?.value || "";
          user.isVerified = true;

          await user.save();

          console.log(
            "Existing User Updated:",
            user.email
          );
        }

        return done(null, user);
      } catch (error) {
        console.error(
          "Google Strategy Error:",
          error
        );

        return done(error, null);
      }
    }
  )
);

// Serialize User
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize User
passport.deserializeUser(
  async (id, done) => {
    try {
      const user =
        await User.findById(id);

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
);

module.exports = passport;