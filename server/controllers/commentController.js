'use strict';

const {
  getComments,
  insertComment,
  deleteCommentFromDb,
} = require('../models/commentModel');
const { badRequestError, unauthenticatedError } = require('../utils/error');

const getAllComments = async (req, res) => {
  const rows = await getComments(req.params.id);
  res.json(rows);
};

const addComment = async (req, res, next) => {
  req.body.id = req.params.id;
  console.log("comment",req.body, req.user.user_id)
  const user_id = req.user.user_id;
  const result = await insertComment(req.body,user_id,next);

  if (result) {
    res.json(result);
    return;
  } 

  next(badRequestError('Error adding like'));
};

const deleteComment = async (req, res, next) => {
  const id = req.params.id;
  const result = await deleteCommentFromDb(id, req.user);
  
  if (!result) next(unauthenticatedError());

  if (result) {
    res.json({ message: 'Comment has been deleted' });
    return;
  }

  next(badRequestError('Error deleting comment'));
};

module.exports = {
  getAllComments,
  addComment,
  deleteComment,
};
