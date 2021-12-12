'use strict';

const express = require('express');
const router = express.Router();
const {
  getAllLikes,
  getLike,
  addLike,
  deleteLike,
} = require('../controllers/likeController');

router.route('/image/:id').get(getAllLikes);
router.route('/user/:id').get(getLike).post(addLike).delete(deleteLike);

module.exports = router;
