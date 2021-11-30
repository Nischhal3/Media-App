'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllUsers = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM user_db');
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const getUser = async (id) => {
  try {
    const [rows] = await promisePool.execute('SELECT * FROM user_db WHERE user_id = ?', [id]);
    return rows[0];
  } catch (e) {
    console.error(e.message)
  }
};

const addUser = async (user) => {
  try {
    const [rows] = await promisePool.execute(
      'INSERT INTO user_db (user_id, first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?, ?)',
      [0, user[0], user[1], user[2], user[3], 1]);
    console.log('model insert user', rows);
    return rows
  } catch (e) {
    console.error('model insert user', e.message);
  }
};

const updateUser = async (body, user) => {
  if (user.role === 0) {
    try {
      const [rows] = await promisePool.execute('UPDATE user_db SET first_name = ?, last_name = ?, email = ?, password= ? WHERE user_id = ?', [body.first_name, body.last_name, body.email, body.passwd, body.user_id]);
      return rows;
    } catch (e) {
      console.error('error', e.message);
    }
  } else {
    try {
      const [rows] = await promisePool.execute('UPDATE user_db SET first_name = ?, last_name = ?, email = ?, password = ? WHERE user_id = ?', [body.first_name, body.last_name, body.email, body.passwd, user.user_id]);
      return rows;
    } catch (e) {
      console.error('error', e.message);
    }
  }
};

const deleteUser = async (id) => {
  if (user.role === 0) {
    try {
      const [rows] = await promisePool.execute('DELETE FROM user_db WHERE user_id = ?', [id]);
      return rows;
    } catch (e) {
      console.error('error', e.message);
    }
  }
};

const getUserByEmail = async (params) => {
  try {
    const [rows] = await promisePool.execute('SELECT * FROM user_db WHERE email = ?', [params]);
    return rows;
  } catch (e) {
    console.log('error', e.message);
    return [];
  }
};

module.exports = {
  getAllUsers, getUser, addUser, getUserByEmail, updateUser, deleteUser
};