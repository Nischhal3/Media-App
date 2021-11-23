'use strict';
//userController
const userModel = require('../models/userModel');
const { httpError } = require('../utils/error');
const { validationResult } = require('express-validator');

const user_list_get = async (req, res) => {
	const users = await userModel.getAllUsers();
	res.json(users);
};

const user_get = async (req, res) => {
	const user_retrieved = await userModel.getUser(req.params.id);
	console.log('user_get_id', req.params.id)
	res.json(user_retrieved);
};

const user_create_post = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log("error:", errors.array());
		const err = httpError('Data not valid', 400);
		next(err);
	} else {
		const user_created = userModel.addUser(req.body);
		console.log(req.body);
		res.json(user_created);
	};
}

const user_update_put = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log("error:", errors.array());
		const err = httpError('Data not valid', 400);
		next(err);
	} else {
		const user_updated = userModel.updateUser(req.body, req.user);
		console.log('req.body in user put', req.body);
		console.log('req user in user put', req.user);
		res.json({ message: "user modified", user_updated });
	}
};

const checkToken = (req, res, next) => {
	if (!req.user) {
		next(new Error('token not valid'));
	} else {
		res.json({ user: req.user });
	}
};

module.exports = {
	user_list_get, user_get, user_create_post, user_update_put, checkToken
};
