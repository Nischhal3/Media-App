'use strict';
const { getUserLogin, getUserByEmail, addUser } = require('../models/userModel');
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
    console.log("params", params);
    try {
      const [user] = await getUserLogin(params);
      console.log('Local strategy', user);
      if (!user) {
        return done(null, false, { message: 'Incorrect email or password.' });
      } else if (user.password !== password) {
        return done(null, false, { message: 'Incorrect email or password.' });
      } else {
        delete user.password;
        return done(null, { ...user }, { message: 'Logged In Successfully' });
      }
    } catch (err) {
      console.log('err sign in', err.message);
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

passport.use(new Strategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true // allows us to pass back the entire request to the callback
},
  async (req, email, password, done) => {

    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    try {
      const existUser = await getUserByEmail(email);
      const firstName = req.body.firstname;
      const lastName = req.body.lastname;
      console.log("name in sign up", firstName, lastName);
      // check to see if theres already a user with that email
      if (existUser) {
        return done(null, false, { message: 'Email already exists.' });
      } else {
        if ((firstName && lastName && email && password) && (password.match('(?=.*[A-Z]).{8,}'))) {
          const user = {
            firstName,
            lastName,
            email,
            password
          }
          addUser(user);
          return done(null, { user }, { message: 'Sign up Successfully' });
        } else {
          console.log("Error sign up");
          return done(null, false,  { message: 'Enter again.' })
        }
      }
    } catch (e) {
      console.log('err signup', e.message);
      return done(e);
    }
  }));

module.exports = passport;

