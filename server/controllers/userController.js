'use strict';

const userModel = require('../models/userModel');
const { badRequestError } = require('../utils/error');

// get one user by id
const user_get = async (req, res) => {
  const user_retrieved = await userModel.getUser(req.params.id);
  res.json(user_retrieved);
};

//update information of user
const user_update_put = async (req, res, next) => {
  const userId = req.params.id;
  const user_updated = await userModel.updateUser(req.body, userId);
  if (user_updated) {
    res.json({ message: 'Update successfully' });
    return;
  }
  next(badRequestError('Error updating user'));
  return;
};

//update password
const user_update_password = async (req, res, next) => {
  const user_updated = await userModel.updatePassword(req.body, req.user);
  if(user_updated === "10") {
    res.json({ message: 'You have entered the wrong password. Try again!'});
    return;
  }
  if (user_updated) {
    res.json({ message: 'Update successfully' });
    return;
  }
  next(badRequestError('Error updating user'));
  return;
};

const checkToken = (req, res, next) => {
  if (!req.user) {
    next(new Error('Token is not valid'));
  } else {
    res.json({ user: req.user });
  }
};

module.exports = {
  user_get,
  user_update_put,
  checkToken,
  user_update_password
};
