'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getComments = async (imageId) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT user_db.first_name, user_db.last_name, comments, id from user_db INNER JOIN comment_db ON user_db.user_id = comment_db.user_id where comment_db.image_id = ?',
      [imageId]
    );
    return rows;
    
  } catch (error) {
    console.log(error.message);
  }
};

const insertComment = async (body, userId, next) => {
  const today = new Date();
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  console.log(date);
  try {
    const [rows] = await promisePool.execute(
      'INSERT INTO comment_db (comments, comment_date,user_id, image_id) VALUES (?,?,?,?)',
      [body.comment, date, userId, body.id]
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
        'DELETE FROM comment_db WHERE id = ?',
        [commentId]
      );
      return rows.affectedRows === 1;
    }

      const [rows] = await promisePool.execute(
        'DELETE FROM comment_db WHERE id = ? AND user_id = ?',
        [commentId, user.user_id]
      );
      return rows.affectedRows === 1;

  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getComments,
  insertComment,
  deleteCommentFromDb,
};
