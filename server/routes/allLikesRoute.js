'use strict';

const express = require('express');
const router = express.Router();
const { getAllLikesByImage, get_all_like } = require('../controllers/likeController');


router.route('/:id').get(getAllLikesByImage);
router.route('/').get(get_all_like);

module.exports = router;
