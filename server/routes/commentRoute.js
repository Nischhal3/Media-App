'use strict';

const express = require('express');
const router = express.Router();
const {} = require('../controllers/likeController');

router.route('/').get().post();

router.route('/:id').delete();

module.exports = router;
