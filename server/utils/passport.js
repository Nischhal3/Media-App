'use strict';
const { getUserLogin } = require('../models/userModel');

const passport = require('passport');
const passportJWT = require("passport-jwt");

const Strategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// local strategy for username password login
passport.use(new Strategy({
  usernameField: 'username',
  passwordField: 'password'
},
  async (username, password, done) => {
    const params = [username];
    try {
      const [user] = await getUserLogin(params);
      console.log('Local strategy', user);
      if (!user) {
        return done(null, false, { message: 'Incorrect email or password.' });
      } else if (user.password !== password) {
        return done(null, false, { message: 'Incorrect email or password.' });
      } else {
        delete user.password;
        return done(null, {...user}, { message: 'Logged In Successfully' }); 
      }
    } catch (err) {
      console.log('err done', err.message);
      return done(err);
    }
  }));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
},
  async function (jwtPayload, done) {
    console.log('jwt', jwtPayload);
    return done(null, jwtPayload);
  }
));

module.exports = passport;

