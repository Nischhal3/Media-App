'use strict';

const express = require('express');
const router = express.Router();
const {
  addComment,
  deleteComment,
} = require('../controllers/commentController');

router.route('/:id').post(addComment).delete(deleteComment);

module.exports = router;
