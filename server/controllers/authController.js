'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');
const {
  httpError,
  internalServerError,
  badRequestError,
} = require('../utils/error');

const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { addUser, getUserByEmail } = require('../models/userModel');

const login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      next(badRequestError('Username or password incorrect'));
      return;
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        next(badRequestError('Login error'));
        return;
      }
      const token = jwt.sign(user, process.env.JWT_SECRET);
      return res.json({ user, token });
    });
  })(req, res, next);
};

const signup = async (req, res, next) => {
  // Extract the validation errors from a request.
  const errors = validationResult(req);

  //tested
  if (!errors.isEmpty()) {
    res.json(errors.array());
    return;
  }

  const email = await getUserByEmail(req.body.email);
  const arr = Array.from(email);

  //tested
  if (!(arr.length === 0)) {
    next(badRequestError('Email already taken'));
    return;
  }

  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = [
    req.body.firstname,
    req.body.lastname,
    req.body.email,
    hashedPassword,
  ];

  const token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET);
  const result = await addUser(user);
  if (result.insertId) {
    res.json({ token, user });
    return;
  }
  next(internalServerError());
};

const logout = async (req, res) => {
  await req.logout();
  res.json({ message: 'logout' });
};

module.exports = {
  login,
  signup,
  logout,
};
