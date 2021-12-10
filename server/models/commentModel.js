'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllComments = async (imageId) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT * FROM comment_db WHERE image_id = ?',
      [imageId]
    );
    return rows;
  } catch (error) {
    console.log(error.message);
  }
};

const addComment = async (comment, imageId) => {
  try {
    const [rows] = await promisePool.execute(
      'INSERT INTO comment_db (comment) VALUES(?) WHERE imaged_id = ?',
      [comment, imageId]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const deleteComment = async (commentId, user) => {
  try {
    if (user.role === 0 || user.user_id === userId) {
      const [rows] = await promisePool.execute(
        'DELETE * FROM comment_db WHERE comment_id = ?',
        [commentId]
      );
      return rows;
    } else return 'unauthenticated';
  } catch (error) {
    console.log(erro);
  }
};

module.exports = {
  getAllComments,
  addComment,
  deleteComment,
};
