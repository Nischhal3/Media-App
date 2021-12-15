'use strict';

const express = require('express');
const multer = require('multer');
const {
  get_image_collection,
  get_image,
} = require('../controllers/imageController');
const router = express.Router();

//checking for image file
const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes('image')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ dest: './uploads/', fileFilter });

router.route('/:id').get(get_image_collection);

router.route('/image/:id').get(get_image);

module.exports = router;
