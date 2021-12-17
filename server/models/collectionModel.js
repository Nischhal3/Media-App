const pool = require('../database/db');
const promisePool = pool.promise();
const { internalServerError } = require('../utils/error');

//get all collections
const getAllCollection = async (next) => {
  try {
    const [rows] = await promisePool.query('SELECT * from collection_db');
    return rows;
  } catch (e) {
    console.error('Get all collections', e.message);
    const err = internalServerError();
    next(err);
  }
};

//get a single collection
const getCollection = async (id, next) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM collection_db WHERE collection_id = ?',
      [id]
    );
    return rows[0];
  } catch (e) {
    console.error('Get collection by id', e.message);
    const err = internalServerError();
    next(err);
  }
};

//update a collection
const updateCollection = async (image, id, next) => {
  try {
    const [rows] = await promisePool.query(
      'UPDATE collection_db SET image = ? WHERE collection_id = ?',
      [image.filename, id]
    );
    return rows.affectedRows === 1;
  } catch (error) {
    console.error('Update image ', e.message);
    const err = internalServerError();
    next(err);
  }
};

module.exports = {
  getAllCollection,
  getCollection,
  updateCollection,
};
