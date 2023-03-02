'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getUserLogin = async (params) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT * FROM fs_user WHERE name = ?;',
        params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

const getAllUsers = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM fs_user;');
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const getUser = async (id) => {
  try {
    const [rows] = await promisePool.execute('SELECT * FROM fs_user WHERE user_id = ?;', [id]);
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const addUser = async (params) => {
  const username = params[0];
  const userpassword = params[1];

  try {
    const [rows] = await promisePool.execute('Insert into fs_user (name, password) values (?, ?);', [username, userpassword]);
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  getUserLogin,
};

