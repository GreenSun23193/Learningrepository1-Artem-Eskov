'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllFiles = async () => {
  try {
    const [rows] = await promisePool.query('SELECT fs_file.* , fs_user.name as ownername FROM fs_file inner join fs_user on fs_file.owner = fs_user.user_id;');
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const getFile = async (id) => {
  try {
    const [rows] = await promisePool.execute('SELECT * FROM fs_file WHERE file_id = ?;', [id]);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
  }
};

const addFile = async (filename, filedescription, fileowner, file_filename) => {
  try {
    var rows = [];
    rows = await promisePool.execute('Insert into fs_file (name, description, owner, filename) values (?, ?, ?, ?, ?);', [filename, filedescription, fileowner, file_filename]);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
  }
};

const changeFile = async (filebirthdate, fileweight, fileowner, fileid, fileownerCurrent, userid, userrole) => {
  if (fileownerCurrent == userid || userrole == 0) {
    try {
      if (userrole == 0) {
        const [rows] = await promisePool.execute('Update fs_file set birthdate=?, weight=?, owner=? where file_id = ?;', [filebirthdate, fileweight, fileowner, fileid]);
      }
      else {
        const [rows] = await promisePool.execute('Update fs_file set birthdate=?, weight=? where file_id = ?;', [filebirthdate, fileweight, fileid]);
      }
      return rows[0];
    } catch (e) {
    }
  }
  else {
    return "not done";
  }
};

const deleteFile = async (fileid, fileowner, userid, userrole) => {
  if (fileowner == userid || userrole == 0) {
    try {
      const [rows] = await promisePool.execute('Delete from fs_file WHERE file_id = ?;', [fileid]);
      return "done";
    } catch (e) {
    }
  }
  else {
    return "not done";
  }
};

module.exports = {
  getAllFiles,
  getFile,
  addFile,
  changeFile,
  deleteFile,
};
