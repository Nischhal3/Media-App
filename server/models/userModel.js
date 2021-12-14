'use strict';
const pool = require('../database/db');
const bcrypt = require('bcryptjs');
const promisePool = pool.promise();

const getUser = async (id) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT * FROM user_db WHERE user_id = ?',
      [id]
    );
    return rows[0];
  } catch (e) {
    console.error(e.message);
  }
};

const addUser = async (user) => {
  try {
    const [rows] = await promisePool.execute(
      'INSERT INTO user_db (user_id, first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?, ?)',
      [0, user.first_name, user.last_name, user.email, user.hashedPassword, 1]
    );
    console.log('model insert user', rows);
    return rows;
  } catch (e) {
    console.error('model insert user', e.message);
  }
};

const updateUser = async (user, userId) => {
  const existingUser = await getUser(userId);
  try {
    const [rows] = await promisePool.execute(
      'UPDATE user_db SET first_name = ?, last_name = ?, user_description = ? WHERE user_id = ?',
      [
        user.first_name ?? existingUser.first_name,
        user.last_name ?? existingUser.last_name,
        user.updateDescription ?? existingUser.user_description,
        userId
      ]
    );
    return rows.affectedRows === 1;
  } catch (e) {
    console.error('error', e.message);
  }
};

const updatePassword = async (data, user) => {
  let isEqual;
  let newHashedPassword;
  const existingUser = await getUser(user.user_id);

  if (data.current_password && data.new_password) {
    const salt = await bcrypt.genSalt(10);
    newHashedPassword = await bcrypt.hash(data.new_password, salt);
    isEqual = await bcrypt.compare(data.current_password, existingUser.password);
  }
  if(!isEqual) {
    return "10";
  }

  try {
    const [rows] = await promisePool.execute(
      'UPDATE user_db SET password = ? WHERE user_id = ?',
      [newHashedPassword, user.user_id]
    );
    return rows.affectedRows === 1;
  } catch (e) {
    console.error('error', e.message);
  }
};

const getUserByEmail = async (params) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT * FROM user_db WHERE email = ?',
      [params]
    );
    return rows;
  } catch (e) {
    console.log('error', e.message);
    return [];
  }
};

const getUserLogIn = async (params) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT * FROM user_db WHERE email = ?',
      params
    );
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

module.exports = {
  getUser,
  addUser,
  getUserByEmail,
  updateUser,
  getUserLogIn,
  updatePassword
};
