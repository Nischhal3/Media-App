'use strict';
'use strict';
const express = require('express');
const { body } = require('express-validator');
const router = express.Router()
const userController = require('../controllers/userController');

router.route('/user')
	.get(userController.user_list_get)
	.put(
		body('name').isLength({ min: 3 }),
		body('email').isEmail(), 
		body('passwd').matches('(?=.*[A-Z]).{8,}'), 
		userController.user_update_put)
	;

router.get('/token', userController.checkToken);

router.route('/user/:id')
	.get(userController.user_get)
	.delete(userController.user_delete)

module.exports = router