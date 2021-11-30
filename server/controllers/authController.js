'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { httpError } = require('../utils/error');

const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { addUser } = require('../models/userModel');

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
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const params = [
      req.body.firstname,
      req.body.lastname,
      req.body.email,
      hashedPassword,
    ];

    const result = await addUser(params);
    if (result.insertId) {
      res.json({ message: `User added`, user_id: result.insertId });
    } else {
      res.status(400).json({ error: 'register error' });
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
