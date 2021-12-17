'use strict';

const express = require('express');
const router = express.Router();
const multer = require('multer');

const {
  get_collection_list,
  get_collection,
} = require('../controllers/collectionController');

const upload = multer({ dest: './uploads/' });

router.route('/').get(get_collection_list); //get all collection

router.route('/:id').get(get_collection); //get a single collection

module.exports = router;
