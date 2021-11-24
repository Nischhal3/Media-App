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
    console.log('get by id', rows);
    return rows[0];
  } catch (e) {
    console.error(e.message)
  }
};

const addUser = (user) => pool.execute(
  'INSERT INTO user_db VALUES (?, ?, ?, ?, ?)', [user.first_name, user.last_name, user.email, user.passwd, 1],
  function (err, results) {
    console.log(results);
  }
);

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

const getUserLogin = async (params) => {
  try {
    console.log(params);
    const [rows] = await promisePool.execute('SELECT * FROM user_db WHERE email = ?', params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

module.exports = {
  getAllUsers, getUser, addUser, getUserLogin, updateUser,
};