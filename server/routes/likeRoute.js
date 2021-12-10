'use strict';

const express = require('express');
const router = express.Router();
const { getAllLikes, addLike } = require('../controllers/likeController');

router.route('/').get(getAllLikes).post(addLike);

module.exports = router;
