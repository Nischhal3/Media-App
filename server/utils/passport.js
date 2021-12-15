'use strict';

const { getUserLogIn } = require('../models/userModel');

const passport = require('passport');
const passportJWT = require('passport-jwt');

const Strategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const bcrypt = require('bcryptjs');

passport.use(
  new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      const params = [email];
      try {
        const [user] = await getUserLogIn(params);
        if (!user) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }
        if (!(await bcrypt.compare(password, user.password))) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }
        delete user.password;
        return done(null, { ...user }, { message: 'Logged In Successfully' });
      } catch (err) {
        console.log('err done', err.message);
        return done(err);
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
    async function (jwtPayload, done) {
      return done(null, jwtPayload);
    }
  )
);

module.exports = passport;
