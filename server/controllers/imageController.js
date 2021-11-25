"user strict";

const {
  getAllImages,
  getImage,
  insertImage,
  deleteImage,
  updateImage,
} = require("../models/imageModel");

const { httpError } = require("../utils/error");
const { validationResult } = require("express-validator");

const get_image_list = async (req, res) => {
  const images = await getAllImages();
  res.json(images);
};

const get_image = async (req, res, next) => {
  const image = await getImage(req.params.imageId, next, next);
  console.log("Image by id", image);
  if (image) {
    res.json(image);
    return;
  }

  const err = httpError("Image not found", 400);
  next(err);
};

const post_image = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Post image validation: ", errors.array());
    const err = httpError("image post data not valid", errors.array());
    next(err);
    return;
  }

  const image = req.body;
  console.log("Post request", image);
  //image.file = req.file.image_file;
  //console.log("Filename", image.file);
  const id = await insertImage(image);
  res.json({ message: `Image added with id: ${id}` });
};

const delete_image = async (req, res, next) => {
  const image_id = req.params.imageId;
  const user_id = req.user.user_id;
  const role = req.user.role;
  console.log("Image id", image_id);
  console.log("Id ", role);
  const deleted = await deleteImage(image_id, user_id, role, next);
  res.json({ message: `Image deleted ${deleted}` });
};

//TODO : Not workng Ask teacher
const update_image = async (req, res,next) => {
  req.body.id = req.params.imageId;
  const user_id = req.user.user_id;
  console.log("Image ID:",req.params.imageId);
  console.log("User ID:", user_id);
  console.log("Update post: ", req.body);

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    console.log("Image update validation:",errors.array());
    const err = httpError("Updating data not valid", 400);
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
};
