'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getComments = async (imageId) => {
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

const insertComment = async (comment, imageId, userId) => {
  try {
    const [rows] = await promisePool.execute(
      'INSERT INTO comment_db (comments) VALUES(?) WHERE imaged_id = ? AND user_id = ?',
      [comment, imageId, userId]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const deleteCommentFromDb = async (commentId, user) => {
  try {
    if (user.role === 0) {
      const [rows] = await promisePool.execute(
        'DELETE * FROM comment_db WHERE comment_id = ?',
        [commentId]
      );
      return rows;
    }

    if (user.rose !== 0) {
      const [rows] = await promisePool.execute(
        'DELETE * FROM comment_db WHERE comment_id = ? AND user_id = ?',
        [commentId, user.user_id]
      );
      return rows;
    }

    return 'unauthenticated';
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getComments,
  insertComment,
  deleteCommentFromDb,
};
