'use strict';

const express = require('express');
const { body } = require('express-validator');
const multer = require('multer');
const {
  get_image,
  post_image,
  delete_image,
  update_image,
  get_image_user,
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

router
  .route('/:id')
  .get(get_image_user) //get all the images to display in the profile page
  .put(
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('date').notEmpty(),
    body('collection').notEmpty(),
    update_image
  ) //edit the image with the corret owner
  .delete(delete_image); //delete the image with the correct owner

router
  .route('/')
  .post(
    upload.single('image'),
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('date').isDate(),
    post_image
  ); //add an image

module.exports = router;
