'use strict';

const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const multer = require('multer');

const {
  get_collection_list,
  get_collection,
  get_imageIn_collection,
  update_collection,
} = require('../controllers/collectionController');


const upload = multer({ dest: './uploads/' });

router.route('/').get(get_collection_list);

router
  .route('/:id')
  .get(get_collection);

router.route('/:id')
  .put(upload.single('image'), update_collection);

router.get('/:title/:imageId', get_imageIn_collection);

module.exports = router;
