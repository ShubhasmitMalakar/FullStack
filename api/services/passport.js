const passport = require("passport"); // npm install --save passport passport-google-oauth20
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  // 'user' here is what we just got from db from the code below(in User.findOne)
  done(null, user.id); // 'null' means no error has occured. 'user.id' is the identifying piece of info that is going to identify users.
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});


passport.use('google',
  new GoogleStrategy(
    {
      clientID: keys.googleClientID, // ClientID is a Public Token, so we can share this with the world.
      clientSecret: keys.googleClientSecret, // ClientSecret is a Private Token, so we cannot show this to anyone.
      callbackURL: "/auth/google/callback", // Add this same route in Authorised Redirect URIs in Credentials(in GCP).
      proxy: true, // This is so that authentication works in Production with both http and https. Check Security Once.
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id }); // We will use Promises here, like .then
      if (existingUser) {
        console.log(profile);

        // We already have a record with given profile ID:
        done(null, existingUser); // We can also put a "return" just before "done", so that we do not need to put "else"
      } else {
        console.log(profile);
        // We don't have a user record with this ID, so make a new record:
        const user = await new User({ googleId: profile.id, email: profile.emails[0].value, name: profile.displayName }).save(); // profile.id came from the profile received from Google.
        done(null, user);
      }
    }
  )
);