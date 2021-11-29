"user strict";

const pool = require("../database/db");
const promisePool = pool.promise();
const httpError = require("../utils/error");

const getAllImages = async () => {
  try {
    const [rows] = await promisePool.query(
      "SELECT user_db.first_name, user_db.last_name,image_id, image_title, image_description, image_file, image_price FROM image_db INNER JOIN user_db on user_db.user_id = image_db.user_id"
    );
    console.log("Get all images", rows);
    return rows;
  } catch (e) {
    console.error("Get all images", e.message);
    const err = httpError("Sql error", 500);
    next(err);
  }
};

const getImage = async (imageId, next) => {
  try {
    const [rows] = await promisePool.query(
      "SELECT user_db.first_name, user_db.last_name, image_title, image_description, image_file FROM image_db INNER JOIN user_db on user_db.user_id = image_db.user_id WHERE image_id = ?",
      [imageId]
    );
    console.log("Get image by id", rows[0]);
    return rows[0];
  } catch (e) {
    console.error("Get image by id", e.message);
    const err = httpError("Sql error", 500);
    next(err);
  }
};

const insertImage = async (user_id, image, next) => {
  try {
    const [rows] = await promisePool.query(
      "INSERT INTO image_db ( user_id, collection_id, image_title, image_description, image_file, image_price) VALUES (?,?,?,?,?,?)",
      [
        user_id,
        1,
        image.image_title,
        image.image_description,
        image.file,
        image.image_price,
      ]
    );
    console.log("Insert image", rows);
    return rows.affectedRows;
  } catch (e) {
    console.error("Insert image", e.message);
    const err = httpError("Sql error", 500);
    next(err);
  }
};

const deleteImage = async (imageId, user_id, role, next) => {
  let sql = "DELETE FROM image_db WHERE image_id = ? AND user_id = ?";
  let params = [imageId, user_id];

  if (role === 0) {
    (sql = "DELETE FROM image_db WHERE image_id = ?"), (params = [imageId]);
  }

  try {
    const [rows] = await promisePool.execute(sql, params);
    console.log("Delete image ", rows);
    return rows.affectedRows === 1;
  } catch (e) {
    console.error("Delete image", e.message);
    const err = httpError("Sql error", 500);
    next(err);
  }
};

const updateImage = async (user_id, image, next) => {
  let sql =
    "UPDATE image_db SET image_title = ?, image_description = ? WHERE image_id = ? AND user_id = ? ";
  let params = [image.image_title, image.image_description, image.id, user_id];
  try {
    const [rows] = await promisePool.execute(sql, params);
    console.log("Update image ", rows);
    return rows.affectedRows === 1;
  } catch (e) {
    console.error("Update image ", e.message);
    const err = httpError("Sql error:", 500);
    next(err);
  }
};

module.exports = {
  getAllImages,
  getImage,
  insertImage,
  deleteImage,
  updateImage,
};
