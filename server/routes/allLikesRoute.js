'use strict';

const express = require('express');
const router = express.Router();
const { getAllLikes } = require('../controllers/likeController');

router.route('/:id').get(getAllLikes);

module.exports = router;
