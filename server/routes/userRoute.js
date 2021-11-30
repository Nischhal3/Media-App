'use strict';
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/userController');

router
  .route('/user')
  .get(userController.user_list_get)
  .post(
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('passwd').matches('(?=.*[A-Z]).{8,}'),
    userController.user_create_post
  )
  .put(
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('passwd').matches('(?=.*[A-Z]).{8,}'),
    userController.user_update_put
  )
  .delete((req, res) => {
    res.send('With this endpoint you can delete users.');
  });

router.get('/token', userController.checkToken);

router.route('/user/:id').get(userController.user_get);

module.exports = router;
