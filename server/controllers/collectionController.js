'user strict';

const { badRequestError } = require('../utils/error');

const {
  getAllCollection,
  getCollection,
  updateCollection,
} = require('../models/collectionModel');

// get all collections
const get_collection_list = async (req, res, next) => {
  const collection = await getAllCollection(next);
  res.json(collection);
};

//get one collection by its id
const get_collection = async (req, res, next) => {
  const collection = await getCollection(req.params.id, next);
  if (collection.length === 0) {
    const err = badRequestError('Collection not found');
    next(err);
    return;
  } else if (collection) {
    res.json(collection);
    return;
  }
  const err = badRequestError('Collection not found');
  next(err);
};

//this is to add picture of collection to server using postman after deploy
const update_collection = async (req, res, next) => {
  if (!req.file) {
    const err = badRequestError('Invalid file');
    next(err);
    return;
  }
  try {
    const update = await updateCollection(req.file, req.params.id, next);
    res.json({ message: `Image update: ${update}` });
  } catch (error) {
    const err = badRequestError('Error uploading image');
    next(err);
    return;
  }
};

module.exports = {
  get_collection_list,
  get_collection,
  update_collection,
};
