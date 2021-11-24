"user strict";

const pool = require("../database/db");
const promisePool = pool.promise();
const httpError = require("../utils/error");

const getAllImages = async () => {
  try {
    const [rows] = await promisePool.query("SELECT * FROM image_db");
    return rows;
  } catch (e) {
    console.error("Get all cat", e.message);
    const err = httpError("Sql error", 500);
    next(err);
  }
};

const getImage = async (imageId, next) => {
  const [rows] = await promisePool.query(
    "SELECT image_title, image_description, image_file FROM image_db INNER JOIN user_db on user_db.user_id = image_db.user_id WHERE image_id = ?",
    [imageId]
  );
};
