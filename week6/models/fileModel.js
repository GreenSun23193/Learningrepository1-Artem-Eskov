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

const getFileSearch = async (searchtext) => {
  try {
    console.log('searchtext: ');
    console.log(searchtext);
    const [rows] = await promisePool.execute('Select * from fs_file where instr(name, ?) > 0 or instr(description, ?);', [searchtext, searchtext]);

    console.log('getFileSearch rows: ');
    console.log(rows);

    //return rows[0];
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const addFile = async (filename, filedescription, fileowner, file_filename, filetype) => {
  try {
    console.log('filedescription: ');
    console.log(filedescription);

    var filetypenumber = 4;
    if (filetype.startsWith("image/")){
      filetypenumber = 0;
    }
    else if (filetype.startsWith("video/")){
      filetypenumber = 1;
    }
    else if (filetype.startsWith("audio/")){
      filetypenumber = 2;
    }
    var rows = [];
    rows = await promisePool.execute('Insert into fs_file (name, description, owner, filename, file_type) values (?, ?, ?, ?, ?);', [filename, filedescription, fileowner, file_filename, filetypenumber]);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
  }
};

const changeFile = async (filedescription, fileowner, fileid, fileownerCurrent, userid, userrole) => {
  if (fileownerCurrent == userid || userrole == 0) {
    try {
      if (userrole == 0) {
        const [rows] = await promisePool.execute('Update fs_file set description=?, owner=? where file_id = ?;', [filedescription, fileowner, fileid]);
      }
      else {
        const [rows] = await promisePool.execute('Update fs_file set description=? where file_id = ?;', [filedescription, fileid]);
      }
      console.log(rows);
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
  getFileSearch,
};
