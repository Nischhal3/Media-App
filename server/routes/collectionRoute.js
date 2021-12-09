'use strict';

const express = require('express');
const router = express.Router();
const multer = require('multer');

const {
  get_collection_list,
  get_collection,
  update_collection,
} = require('../controllers/collectionController');


const upload = multer({ dest: './uploads/' });

router.route('/').get(get_collection_list);

router.route('/:id')
  .get(get_collection)
  .put(upload.single('image'), update_collection);


module.exports = router;
