'use strict';
// catController

const catModel = require('../models/catModel.js');

const cats = catModel.cats;

const cat_list_get0 = (catnum1) => cats.filter((cat) => {
    return cat.id == catnum1;
  })

const cat_list_get_old = (req, res) => {
    res.json(cats);
};

const cat_list_get = (req, res) => {
  res.json(cat_list_get0(req.params.id));
};

module.exports = {
  cat_list_get,
  cat_list_get_old,
};

