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

const addComment = async (req, res) => {
  const result = await insertComment(req.body.id);

  if (result) {
    res.json(result);
    return;
  }

  next(badRequestError('Error adding like'));
};

const deleteComment = async (req, res) => {
  const result = await deleteCommentFromDb(req.body.id);

  if (result === 'unauthenticated') next(unauthenticatedError());

  if (result) {
    res.json({ message: 'Comment has been deleted' });
    return;
  }

  next(badRequestError('Error adding comment'));
};

module.exports = {
  getAllComments,
  addComment,
  deleteComment,
};
