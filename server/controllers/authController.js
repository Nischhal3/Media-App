'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { httpError } = require('../utils/error');

const login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    console.log('user passed from cb', user);
    if (err || !user) {
      return res.status(400).json({
        message: 'Incorrect email of password. Enter again.',
        user: user
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        next(httpError('login error', 400));
        return;
      };
      const token = jwt.sign(user, process.env.JWT_SECRET);
      return res.json({ user, token });
    });
  })(req, res, next);
};

const register = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      next(httpError('Check if all fields are correct', 400));
      return;
    }
    const token = jwt.sign(user, process.env.JWT_SECRET);
    return res.json({ user, token });
  })(req, res, next);
};

module.exports = {
  login, register
};

