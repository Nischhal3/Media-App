'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

//get all the comments for an image
const getComments = async (imageId) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT user_db.user_id, user_db.first_name, user_db.last_name, user_db.role, comments, id from user_db INNER JOIN comment_db ON user_db.user_id = comment_db.user_id where comment_db.image_id = ?',
      [imageId]
    );
    return rows;
  } catch (error) {
    console.log(error.message);
  }
};

//add a comment for an image
const insertComment = async (body, userId) => {
  const today = new Date();
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  try {
    const [rows] = await promisePool.execute(
      'INSERT INTO comment_db (comments, comment_date,user_id, image_id) VALUES (?,?,?,?)',
      [body.comment, date, userId, body.id]
    );

    if (rows.affectedRows === 1) {
      const allComments = getComments(body.id);
      return allComments;
    }
  } catch (error) {
    console.log(error);
  }
};

//delete a comment. There are 2 cases: when the user is the owner of a comment and when the user is an admin
const deleteCommentFromDb = async (commentId, user) => {
  try {
    //for an admin
    if (user.role === 0) {
      const [rows] = await promisePool.execute(
        'DELETE FROM comment_db WHERE id = ?',
        [commentId]
      );
      return rows.affectedRows === 1;
    }

    //for the owner of the users
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
