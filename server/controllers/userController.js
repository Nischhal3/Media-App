'use strict';

const userModel = require('../models/userModel');
const { badRequestError } = require('../utils/error');

const user_get = async (req, res) => {
  const user_retrieved = await userModel.getUser(req.params.id);
  delete user_retrieved.password;
  res.json(user_retrieved);
};

const user_update_put = (req, res, next) => {
  const userId = req.params.id;
  console.log('here', req.body);
  const user_updated = userModel.updateUser(req.body, userId);
  if (user_updated) {
    res.json({ message: 'Update successfully' });
    return;
  }
  next(badRequestError('Error updating user'));
  return;
};

const user_delete = (req, res) => {
  console.log(req.params.id);
  const user_deleted = userModel.deleteUser(req.params.id);
  res.json({ message: 'user deleted' });
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
  user_delete,
};
