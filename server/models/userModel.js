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
  let isEqual;
  let newHashedPassword;
  const existingUser = await getUser(userId);

  if (user.password) {
    const salt = await bcrypt.genSalt(10);
    newHashedPassword = await bcrypt.hash(user.password, salt);
    isEqual = await bcrypt.compare(existingUser.password, newHashedPassword);
  }

  try {
    const [rows] = await promisePool.execute(
      'UPDATE user_db SET first_name = ?, last_name = ?, user_description = ?, password = ? WHERE user_id = ?',
      [
        user.first_name ?? existingUser.first_name,
        user.last_name ?? existingUser.last_name,
        user.updateDescription ?? existingUser.user_description,
        user.password
          ? isEqual
            ? existingUser.password
            : newHashedPassword
          : existingUser.password,
        userId,
      ]
    );
    return rows.affectedRows === 1;
  } catch (e) {
    console.error('error', e.message);
  }
};

const deleteUser = async (id) => {
  if (user.role === 0) {
    try {
      const [rows] = await promisePool.execute(
        'DELETE FROM user_db WHERE user_id = ?',
        [id]
      );
      return rows;
    } catch (e) {
      console.error('error', e.message);
    }
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
  deleteUser,
  getUserLogIn,
};
