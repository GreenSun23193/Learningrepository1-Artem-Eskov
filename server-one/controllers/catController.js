'use strict';

const catModel = require('../models/catModel.js');

const cats = catModel.cats;

const cat_get = async (req, res) => {
  const ret = await catModel.getCat(req.params.id);
  res.json(ret);
};

const cat_list_get = async (req, res) => {
  const cats = await catModel.getAllCats();
  res.json(cats);
};

const cat_post = (req, res, next) => {
  console.log(req.file);
  console.log(req.body);
  catModel.addCat(req.body.name, req.body.birthdate, req.body.weight, req.body.owner, req.file.filename)
};

const cat_update_put = (req, res, next) => {
  catModel.changeCat(req.body.name, req.body.birthdate, req.body.weight, req.body.owner, req.body.id)
  res.json({message: 'Cat changed!'});
};

const cat_delete = (req, res, next) => {
  catModel.deleteCat(req.params.id)
};

module.exports = {
  cat_list_get,
  cat_post,
  cat_get,
  cat_update_put,
  cat_delete,
};

