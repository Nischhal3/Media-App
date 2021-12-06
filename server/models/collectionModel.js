const pool = require('../database/db');
const promisePool = pool.promise();
const httpError = require('../utils/error');

const getAllCollection = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * from collection_db');
    return rows;
  } catch (e) {
    console.error('Get all collections', e.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

const getCollection = async (title, next) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT image_db.user_id,image_db.image_id,image_db.image_title, image_db.image_description, image_db.image_file,image_db.image_price, collection_title  FROM collection_db INNER JOIN image_db on image_db.collection_id = collection_db.collection_id WHERE collection_db.collection_title = ?',
      [title]
    );
    return rows;
  } catch (e) {
    console.error('Get collection by title', e.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

const getImageInCollection = async (collection_title, id, next) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT image_db.user_id, image_db.image_id,image_db.image_title, image_db.image_description, image_db.image_file, image_db.image_price, collection_title  FROM collection_db INNER JOIN image_db on image_db.collection_id = collection_db.collection_id WHERE collection_db.collection_title = ? AND image_db.image_id = ?',
      [collection_title, id]
    );
    return rows[0];
  } catch (e) {
    console.error('Get collection  title', e.message);
    console.error('Get collection image id', e.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

const updateCollection = async (image, id, next) => {
  try {
    const [rows] = await promisePool.query(
      'UPDATE collection_db SET image = ? WHERE collection_id = ?',
      [image.filename, id]
    );
    return rows.affectedRows === 1;
  } catch (error) {
    console.error('Update image ', e.message);
    const err = httpError('Sql error:', 500);
    next(err);
  }
};
module.exports = {
  getAllCollection,
  getCollection,
  getImageInCollection,
  updateCollection,
};
