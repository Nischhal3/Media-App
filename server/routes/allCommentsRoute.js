'use strict';

const express = require('express');
const router = express.Router();
const { getAllComments } = require('../controllers/commentController');

router.route('/:id').get(getAllComments);

module.exports = router;
