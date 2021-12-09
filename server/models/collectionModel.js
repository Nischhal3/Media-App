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

const getCollection = async (id, next) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM collection_db WHERE collection_id = ?',
      [id]
    );
    return rows[0];
  } catch (e) {
    console.error('Get collection by id', e.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

module.exports = {
  getAllCollection,
  getCollection,
};
