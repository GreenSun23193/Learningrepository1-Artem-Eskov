/*'use strict';
const cats = [
  {
    id: '1',
    name: 'Frank',
    birthdate: '2010-10-30',
    weight: '5',
    owner: '1',
    filename: 'http://placekitten.com/400/300',
  },
  {
    id: '2',
    name: 'James',
    birthdate: '2015-12-25',
    weight: '11',
    owner: '2',
    filename: 'http://placekitten.com/400/302',
  },
];

module.exports = {
  cats,
};*/
'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllCats = async () => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    //const [rows] = await promisePool.query('SELECT * FROM wop_cat;');

    const [rows] = await promisePool.query('SELECT wop_cat.* , wop_user.name as ownername FROM wop_cat inner join wop_user on wop_cat.owner = wop_user.user_id;');
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const getCat = async (id) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM wop_cat WHERE cat_id = ' + id + ';');
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
  }
};

const addCat = async (catname, catbirthdate, catweight, catowner, catfilename) => {
  try {
    const [rows] = await promisePool.query('Insert into wop_cat (name, birthdate, weight, owner, filename) values ("' + catname +'", "' + catbirthdate + '", "' + catweight + '", "' + catowner + '", "' + catfilename + '");');
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
  }
};

const changeCat = async (catname, catbirthdate, catweight, catowner, catid) => {
  try {
    const [rows] = await promisePool.query('Update wop_cat set name="'+ catname +'", birthdate="'+ catbirthdate +'", weight="'+ catweight +'", owner="'+ catowner +'" where cat_id = '+ catid +';');
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
  }
};

const deleteCat = async (catid) => {
  try {
    const [rows] = await promisePool.query('Delete from wop_cat WHERE cat_id = ' + catid + ';');
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
  }
};


module.exports = {
  getAllCats,
  getCat,
  addCat,
  changeCat,
  deleteCat,
};
