'user strict';

const { httpError } = require('../utils/error');
const {
  getAllCollection,
  getCollection,
  getImageInCollection,
  updateCollection,
} = require('../models/collectionModel');
const makeThumbnail = require('../utils/resize');

const get_collection_list = async (req, res) => {
  const collection = await getAllCollection();
  res.json(collection);
};

const get_collection = async (req, res, next) => {
  console.log('Collection title', req.params.title);
  //console.log('user id', req.user.user_id);
  const collection = await getCollection(req.params.title, next);
  //console.log('Collection bny id', collection);

  console.log('collection length', collection.length);
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

const update_collection = async (req, res, next) => {
  if (!req.file) {
    const err = httpError('Invalid file', 400);
    next(err);
    return;
  }

  try {
    console.log('Params', req.params.title);
    console.log('Posting images', req.file.filename);
    const thumb = await makeThumbnail(req.file.path, req.file.filename);

    const image = req.file.filename;
    const title = req.params.title;
    const update = await updateCollection(image, title, next);
    if (thumb) {
    res.json({ message: `Image update: ${update}` });
    }
  } catch (error) {
    console.log('Collection update with thumbnail', e.message);
    const err = httpError('Error uploading cat', 400);
    next(err);
    return;
  }
};
module.exports = {
  get_collection_list,
  get_collection,
  get_imageIn_collection,
  update_collection,
};
