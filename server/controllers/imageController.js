'user strict';

const {
  getAllImages,
  getImage,
  insertImage,
  deleteImage,
  updateImage,
  getImageByCollectionId,
} = require('../models/imageModel');

const { httpError } = require('../utils/error');
const { validationResult } = require('express-validator');
const makeThumbnail = require('../utils/resize');


const get_image_list = async (req, res) => {
  const images = await getAllImages();
  res.json(images);
};

const get_image = async (req, res, next) => {
  const image = await getImage(req.params.id, next);
  console.log('Image by id', image);
  if (image) {
    res.json(image);
    return;
  }

  const err = httpError('Image not found', 400);
  next(err);
};

const get_image_collection = async (req, res, next) => {
  const image = await getImageByCollectionId(req.params.id, next);
  console.log('Image by collection_id', image);
  if (image) {
    res.json(image);
    return;
  }

  const err = httpError('Image not found', 400);
  next(err);
};



const post_image = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Post image validation: ', errors.array());
    const err = httpError('image post data not valid', errors.array());
    next(err);
    return;
  }

  console.log('Posting images', req.file);
  if (!req.file) {
    const err = httpError('Invalid file', 400);
    next(err);
    return;
  }
  try {
    const thumb = await makeThumbnail(req.file.path, req.file.filename);
    const user_id = req.user.user_id;
    console.log('Post done by userID', user_id);
    const image = req.body;
    image.file = req.file.filename;
    const id = await insertImage(user_id, image);
    console.log('Image post', image);
    if (thumb) {
      res.json({ message: `Image added with id: ${id}` });
    }

  } catch (error) {
    console.log('Add image with thumbnail error', e.message);
    const err = httpError('Error posting image', 400);
    next(err);
    return;
  }
};

const delete_image = async (req, res, next) => {
  const image_id = req.params.imageId;
  const user_id = req.user.user_id;
  const role = req.user.role;
  console.log('Image id', image_id);
  console.log('Id ', role);
  const deleted = await deleteImage(image_id, user_id, role, next);
  res.json({ message: `Image deleted ${deleted}` });
};

const update_image = async (req, res, next) => {
  req.body.id = req.params.imageId;
  const user_id = req.user.user_id;
  console.log('Image ID:', req.params.imageId);
  console.log('User ID:', user_id);
  console.log('Update post: ', req.body);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Image update validation:', errors.array());
    const err = httpError('Updating data not valid', 400);
    next(err);
    return;
  }

  const update = await updateImage(user_id, req.body, next);
  res.json({ message: `Image update: ${update}` });
};

module.exports = {
  get_image_list,
  get_image,
  post_image,
  delete_image,
  update_image,
  get_image_collection
};
