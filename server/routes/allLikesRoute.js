'use strict';

const express = require('express');
const router = express.Router();
const {
  getAllLikesByImage,
  get_all_like,
} = require('../controllers/likeController');

router.route('/:id').get(getAllLikesByImage); //get all likes of the image
router.route('/').get(get_all_like); //get and arrange the top 3 most-liked image

module.exports = router;
