'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllLikes = async (imageId) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT COUNT FROM like_db WHERE image_id = ?',
      [imageId]
    );
    return rows;
  } catch (error) {
    console.log(error.message);
  }
};

const addLike = async (imageId) => {
  try {
    const [rows] = await promisePool.execute(
      'INSERT INTO like_db (like) VALUES(?) WHERE imaged_id = ?',
      [imageId]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllLikes,
  addLike,
};
