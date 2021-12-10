'use strict';

const {
  getAllComments,
  addComment,
  deleteComment,
} = require('../models/commentModel');
const { badRequestError, unauthorizedError } = require('../utils/error');

const getAllComments = async (req, res) => {
  const allLikes = await getAllLikes(req.body.id);
  if (allLikes) {
    res.json(allLikes);
    return;
  }

  next(badRequestError('Error get all the comments'));
};

const addComment = async (req, res) => {
  const result = await addComment(req.body.id);

  if (result) {
    res.json(result);
    return;
  }

  next(badRequestError('Error adding like'));
};

const deleteComment = async (req, res) => {
  const result = await deleteComment(req.body.id);

  if (result === 'unauthenticated') next(unauthorizedError());

  if (result) {
    res.json(result);
    return;
  }

  next(badRequestError('Error adding like'));
};

module.exports = {
  getAllComments,
  addComment,
  deleteComment,
};
