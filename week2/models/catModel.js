'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllCats = async () => {
  try {
    const [rows] = await promisePool.query('SELECT wop_cat.* , wop_user.name as ownername FROM wop_cat inner join wop_user on wop_cat.owner = wop_user.user_id;');
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const getCat = async (id) => {
  try {
    const [rows] = await promisePool.execute('SELECT * FROM wop_cat WHERE cat_id = ?;', [id]);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
  }
};

const addCat = async (catname, catbirthdate, catweight, catowner, catfilename, catcoordinates) => {
  try {
    console.log("adding cat from");
    console.log(catcoordinates);
    var rows = [];
    if (catcoordinates == "") {
      rows = await promisePool.execute('Insert into wop_cat (name, birthdate, weight, owner, filename) values (?, ?, ?, ?, ?);', [catname, catbirthdate, catweight, catowner, catfilename]);
    }
    else {
      rows = await promisePool.execute('Insert into wop_cat (name, birthdate, weight, owner, filename, coords) values (?, ?, ?, ?, ?, ?);', 
        [catname, catbirthdate, catweight, catowner, catfilename, "[" + catcoordinates.toString() + "]"]);
    }
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
  }
};

const changeCat = async (catname, catbirthdate, catweight, catowner, catid, catownerCurrent, userid, userrole) => {
  if (catownerCurrent == userid || userrole == 0) {
    try {
      if (userrole == 0) {
        const [rows] = await promisePool.execute('Update wop_cat set name=?, birthdate=?, weight=?, owner=? where cat_id = ?;', [catname, catbirthdate, catweight, catowner, catid]);
      }
      else {
        const [rows] = await promisePool.execute('Update wop_cat set name=?, birthdate=?, weight=? where cat_id = ?;', [catname, catbirthdate, catweight, catid]);
      }
      return rows[0];
    } catch (e) {
    }
  }
  else {
    return "not done";
  }
};

const deleteCat = async (catid, catowner, userid, userrole) => {
  if (catowner == userid || userrole == 0) {
    try {
      const [rows] = await promisePool.execute('Delete from wop_cat WHERE cat_id = ?;', [catid]);
      return "done";
    } catch (e) {
    }
  }
  else {
    return "not done";
  }
};

module.exports = {
  getAllCats,
  getCat,
  addCat,
  changeCat,
  deleteCat,
};
