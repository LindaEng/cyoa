import pkg from 'passport-google-oauth20';
const { Strategy: GoogleStrategy } = pkg;
import LocalStrategy from 'passport-local';
import User from '../models/userSchema.js'
import bcrypt from 'bcrypt';

const passportConfig = (passport) => {
    passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      // Find or create a user in your database
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        done(null, existingUser);
      } else {
        console.log("ATTEMPTING TO CREATE NEW USER ", profile);
        const newUser = await new User({
          googleId: profile.id,
          username: profile.displayName,
          email: profile.emails[0].value,
        }).save();
        done(null, newUser);
      }
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
      done(null, user);
    });
  });
};

const localConfig = (passport) => {
  passport.use(new LocalStrategy(
    async (username, password, done) => {
      const user =  await User.findOne({ username: username });
      if( user && bcrypt.compareSync(password, user.password) ) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Invalid username or password' });
      }
    })
  )

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
      done(err, user)
    })
  })  
}

export { passportConfig, localConfig }