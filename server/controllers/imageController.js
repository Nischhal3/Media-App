'user strict';

const {
  getAllImagesByUser,
  getImage,
  insertImage,
  deleteImage,
  updateImage,
  getImageByCollectionId,
} = require('../models/imageModel');

const { badRequestError, httpError } = require('../utils/error');
const { validationResult } = require('express-validator');
const makeThumbnail = require('../utils/resize');

// get all images by one user
const get_image_user = async (req, res, next) => {
  const images = await getAllImagesByUser(req.params.id, next);
  if (images) {
    res.json(images);
    return;
  }
  const err = badRequestError('Image not found');
  next(err);
};

//get all images by a collection
const get_image_collection = async (req, res, next) => {
  const image = await getImageByCollectionId(req.params.id, next);
  if (image) {
    res.json(image);
    return;
  }
  const err = badRequestError('Image not found');
  next(err);
};

//get a single image
const get_image = async (req, res, next) => {
  const image = await getImage(req.params.id, next);
  if (image) {
    res.json(image);
    return;
  }
  const err = badRequestError('Image not found');
  next(err);
};

//add an image
const post_image = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = httpError('image post data not valid', errors.array());
    next(err);
    return;
  }

  if (!req.file) {
    const err = badRequestError('Invalid file');
    next(err);
    return;
  }
  try {
    // resize image with thumbnails
    const thumb = await makeThumbnail(req.file.path, req.file.filename);
    const user_id = req.user.user_id;
    const image = req.body;
    image.file = req.file.filename;
    const id = await insertImage(user_id, image);
    if (thumb) {
      res.json({ message: `Image added with id: ${id}` });
    }
  } catch (error) {
    const err = badRequestError('Error posting image');
    next(err);
    return;
  }
};

//delete image
const delete_image = async (req, res, next) => {
  const image_id = req.params.id;
  const user_id = req.user.user_id;
  const role = req.user.role;
  const deleted = await deleteImage(image_id, user_id, role, next);
  if (!deleted) {
    res.json({ message: `Cannot delete others' image.` });
    return;
  }
  res.json({ message: 'Image deleted successfully!' });
};

//update image
const update_image = async (req, res, next) => {
  req.body.id = req.params.id;
  const user_id = req.user.user_id;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = badRequestError('Updating data not valid');
    next(err);
    return;
  }

  const update = await updateImage(user_id, req.body, next);
  if (!update) {
    res.json({
      message: `Cannot update others' image.`,
    });
    return;
  }
  res.json({ message: 'Image updated successfully!' });
};

module.exports = {
  get_image_user,
  post_image,
  delete_image,
  update_image,
  get_image_collection,
  get_image,
};
