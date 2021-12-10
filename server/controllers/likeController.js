'use strict';

const { getAllLikes, addLike } = require('../models/likeModel');
const { badRequestError } = require('../utils/error');

const getAllLikes = async (req, res) => {
  const allLikes = await getAllLikes(req.body.id);
  if (allLikes) {
    res.json(allLikes);
    return;
  }

  next(badRequestError('Error get all the likes'));
};

const addLike = async (req, res) => {
  const result = await addLike(req.body.id);

  if (result) {
    res.json(result);
    return;
  }

  next(badRequestError('Error adding like'));
};

module.exports = {
  getAllLikes,
  addLike,
};
