"use strict";

const express = require("express");
const { body } = require("express-validator");
const multer = require("multer");
const {
  get_image_list,
  get_image,
  post_image,
  delete_image,
  update_image,
} = require("../controllers/imageController");
const router = express.Router();
//TODO
//const upload = multer({dest: "./uploads/"});
//checking for image file
/**
const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes("image")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ dest: "./uploads/", fileFilter });

 */
router
  .route("/images")
  .get(get_image_list)
  .post(
    body("image_title").notEmpty(),
    body("image_description").notEmpty(),
    body("user_id").isNumeric(),
    body("collection_id").isNumeric(),
    body("image_file").notEmpty(),
    post_image
  );

router
  .route("/images/:imageId")
  .get(get_image)
  .delete(delete_image)
  .put(
    body("image_title").notEmpty(),
    body("image_description").notEmpty(),
    update_image
  );

module.exports = router;
