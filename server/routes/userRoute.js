'use strict';
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/token', userController.checkToken);

router
  .route('/user/:id')
  .get(userController.user_get)
  .delete(userController.user_delete)
  .put(
    body('first_name').isLength({ min: 3 }),
    body('last_name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').matches('(?=.*[A-Z]).{8,}'),
    userController.user_update_put
  );

module.exports = router;
