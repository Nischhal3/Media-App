'use strict';
const pool = require('../database/db');
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

const updateUser = async (user, userId) => {
  try {
    const [rows] = await promisePool.execute(
      'UPDATE user_db SET first_name = ?, last_name = ?, user_description = ?, email = ?, password = ? WHERE user_id = ?',
      [
        user.first_name,
        user.last_name,
        user.updateDescription,
        user.email,
        user.password,
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
  getUserByEmail,
  updateUser,
  deleteUser,
  getUserLogIn,
};
