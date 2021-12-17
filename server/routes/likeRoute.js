'use strict';

const express = require('express');
const router = express.Router();
const {
  getLike,
  addLike,
  deleteLike,
} = require('../controllers/likeController');

router.route('/:id').get(getLike).post(addLike).delete(deleteLike); //get, like and unlike

module.exports = router;
