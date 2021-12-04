'use strict';
const express = require('express');
const router = express.Router();

const { body, sanitizeBody } = require('express-validator');
const { login, signup, logout } = require('../controllers/authController');

router.post('/login', login);
router.get('/logout', logout);
router.post(
  '/register',
  [
    body('firstname', 'First name is required').isLength({ min: 1 }),
    body('lastname', 'Last name is required').isLength({ min: 1 }),
    body('email', 'Email is not valid').isEmail(),
    body(
      'password',
      'Password should contain numbers and at least one upper case letter'
    ).matches('(?=.*[A-Z]).{8,}'),
    sanitizeBody('fistname').escape(),
    sanitizeBody('lastname').escape(),
  ],
  signup
);

module.exports = router;
