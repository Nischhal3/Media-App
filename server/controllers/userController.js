'use strict';
const userModel = require('../models/userModel');
const { httpError } = require('../utils/error');
const { validationResult } = require('express-validator');

const user_list_get = async (req, res) => {
  const users = await userModel.getAllUsers();
  res.json(users);
};

const user_get = async (req, res) => {
  const user_retrieved = await userModel.getUser(req.params.id);
  res.json(user_retrieved);
};

const user_update_put = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = httpError('Data not valid', 400);
    next(err);
  } else {
    const user_updated = userModel.updateUser(req.body, req.user);
    res.json({ message: 'user modified', user_updated });
  }
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
  user_list_get,
  user_get,
  user_update_put,
  checkToken,
  user_delete,
};
