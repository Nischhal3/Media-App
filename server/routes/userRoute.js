'use strict';
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/token', userController.checkToken);

router
  .route('/:id')
  .get(userController.user_get)
  .delete(userController.user_delete)
  .put(userController.user_update_put);

module.exports = router;
