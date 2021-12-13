'use strict';

const express = require('express');
const { addComment, deleteComment } = require('../controllers/commentController');
const router = express.Router();

router.route('/:id').post(addComment).delete(deleteComment);

module.exports = router;
