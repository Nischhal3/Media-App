'user strict';

const { httpError } = require('../utils/error');
const {
  getAllCollection,
  getCollection,
  getImageInCollection,
} = require('../models/collectionModel');

const get_collection_list = async (req, res) => {
  const images = await getAllCollection();
  res.json(images);
};

const get_collection = async (req, res, next) => {
  console.log('Collection title', req.params.title);
  //console.log('user id', req.user.user_id);
  const collection = await getCollection(req.params.title, next);
  //console.log('Collection bny id', collection);

  if (collection.length === 0) {
    const err = httpError('Collection not found', 400);
    next(err);
    return;
  } else if (collection) {
    res.json(collection);
    return;
  }

  const err = httpError('Collection not found', 400);
  next(err);
};

const get_imageIn_collection = async (req, res, next) => {
  console.log('Get image in collection', req.params.imageId);
  console.log('Collection title', req.params.title);

  const image = await getImageInCollection(
    req.params.title,
    req.params.imageId,
    next
  );

  if (image) {
    res.json(image);
    return;
  }

  const err = httpError('Image not found', 400);
  next(err);
};

module.exports = {
  get_collection_list,
  get_collection,
  get_imageIn_collection,
};
