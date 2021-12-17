'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { internalServerError, badRequestError } = require('../utils/error');

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

  if (!errors.isEmpty()) {
    res.json(errors.array());
    return;
  }

  //get existing emails to check if email taken
  const email = await getUserByEmail(req.body.email);
  const arr = Array.from(email);

  if (!(arr.length === 0)) {
    next(badRequestError('Email already taken'));
    return;
  }

  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = {
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    email: req.body.email,
    hashedPassword,
  };

  /* add user to database and generate token
  for new user so that they don't have to log in again */
  const result = await addUser(user);
  await delete user.hashedPassword;
  if (result.insertId) {
    user.user_id = result.insertId;
    const token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET);
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
