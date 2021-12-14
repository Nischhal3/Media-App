'use strict';
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/token', userController.checkToken);

router
  .route('/:id')
  .get(userController.user_get)
  .put(userController.user_update_put);

router.route('/').put(userController.user_update_password);

module.exports = router;
