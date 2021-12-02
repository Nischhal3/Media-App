'use strict';
const express = require('express');
const router = express.Router();

const { body, sanitizeBody } = require('express-validator');
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/register',
	[
		body('firstname', 'required').isLength({ min: 1 }),
		body('lastname', 'required').isLength({ min: 1 }),
		body('email', 'email is not valid').isEmail(),
		body('password', 'at least one upper case letter').matches('(?=.*[A-Z]).{8,}'),
		sanitizeBody('fistname').escape(),
		sanitizeBody('lastname').escape(),
	],
	authController.user_create_post
);

module.exports = router;