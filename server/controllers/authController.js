'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { httpError } = require('../utils/error');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { addUser, getUserByEmail } = require('../models/userModel');

const login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      next(httpError('Username or password incorrect', 400));
      return;
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        next(httpError('Login error', 400));
        return;
      };
      const token = jwt.sign(user, process.env.JWT_SECRET);
      return res.json({ user, token });
    });
  })(req, res, next);
};

const user_create_post = async (req, res, next) => {
  // Extract the validation errors from a request.
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log('user create error', errors);
    res.send(errors.array());
  } else {
    const email = await getUserByEmail(req.body.email);
    const arr = Array.from(email);
    
    if (!(arr.length === 0)){
      next(httpError('Email already taken', 400));
      return;
    } else {
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
        res.json({ message: `User added`, token });
      } else {
        res.status(400).json({ error: 'register error' });
      }
    }
  }
};

const logout = (req, res) => {
  req.logout();
  res.json({ message: 'logout' });
};



module.exports = {
  login, user_create_post, logout
};
