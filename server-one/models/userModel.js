/*'use strict';
const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@metropolia.fi',
    password: '1234',
  },
  {
    id: '2',
    name: 'Jane Doez',
    email: 'jane@metropolia.fi',
    password: 'qwer',
  },
];

module.exports = {
  users,
};
*/

'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllUsers = async () => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    const [rows] = await promisePool.query('SELECT * FROM wop_user;');
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const getUser = async (id) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM wop_user WHERE user_id = ' + id + ';');
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const addUser = async (username, useremail, userpassword) => {
  try {
    const [rows] = await promisePool.query('Insert into wop_user (name, email, password) values ("' + username +'", "' + useremail +'", "' + userpassword +'");');
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  addUser,
};

