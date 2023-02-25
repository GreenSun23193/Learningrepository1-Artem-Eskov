'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getUserLogin = async (params) => {
  try {
    console.log(params);
    const [rows] = await promisePool.execute(
        'SELECT * FROM wop_user WHERE email = ?;',
        params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

const getAllUsers = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM wop_user;');
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const getUser = async (id) => {
  try {
    const [rows] = await promisePool.execute('SELECT * FROM wop_user WHERE user_id = ?;', [id]);
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const addUser = async (params) => {
  const username = params[0];
  const useremail = params[1];
  const userpassword = params[2];

  console.log(username);
  console.log(useremail);
  console.log(userpassword);

  try {
    const [rows] = await promisePool.execute('Insert into wop_user (name, email, password) values (?, ?, ?);', [username, useremail, userpassword]);
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

