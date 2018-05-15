const 
  passport = require('passport'),
  JwtStrategy = require('passport-jwt').Strategy,
  LocalStrategy = require('passport-local').Strategy,
  { ExtractJwt } = require('passport-jwt'),
  config = require('./config'),
  User = require('../models/user');

  let opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey : config.dev.JWT_SECRET 
  };

  passport.use(new JwtStrategy(
  opts, async (payload, done) => {
    try{
      console.log(opts.secretOrKey);  
      // Find the user specified in token 
      const user = await User.findById(payload.sub);

      // If user doesn't exist, handle it
      if(!user) {
        return done(null, false);
      }

     // Otherwise return the user
      done(null, user);
    } catch(error) {
      done(error, false);
    }
  }
));

passport.use(new LocalStrategy({
    usernameField: 'email'
  }, async (email, password, done) => {
    try{
      // Find the user given the email
      const user = await User.findOne({ email });
      // If not found, handle it
      if(!user){
        return done(null, false);
      }
      // Check if the password is correct
      const isMatch = await user.isValidPassword(password);
      // If not correct, handle it
      if(!isMatch){
        return done(null, false);
      }
      // Otherwise return the user
      done(null, user);
    } catch (error) {
      done(error, false); 
    }
}));

function newFunction() {
  return 'Authorization';
}
