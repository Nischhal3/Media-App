'use strict';

const express = require('express');
const router = express.Router();
const {
  get_collection_list,
  get_collection,
  get_imageIn_collection,
} = require('../controllers/collectionController');

router.route('/collection').get(get_collection_list);

router.route('/collection/:title').get(get_collection);

router.get('/collection/:title/:imageId', get_imageIn_collection);

module.exports = router;
