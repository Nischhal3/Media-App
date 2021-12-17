'use strict';
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/token', userController.checkToken);

router
  .route('/:id')
  .get(userController.user_get) //get the user info
  .put(userController.user_update_put); //edit user info

router.route('/').put(userController.user_update_password); //change the password

module.exports = router;
