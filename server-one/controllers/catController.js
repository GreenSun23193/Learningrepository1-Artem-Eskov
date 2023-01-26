'use strict';
// catController

const catModel = require('../models/catModel.js');

const cats = catModel.cats;

/*const cat_get0 = (catnum1) => getCat((cat) => {
    return cat.id == catnum1;
  })*/

const cat_get = async (req, res) => {
  console.log(req.params.id);
  const ret = await catModel.getCat(req.params.id);
  console.log(ret);
  res.json(ret);
};

/*
const cat_list_get0 = (catnum1) => cats.filter((cat) => {
    return cat.id == catnum1;
  })

const cat_list_get_old = (req, res) => {
    res.json(cats);
};

const cat_list_get = (req, res) => {
  res.json(cat_list_get0(req.params.id));
};*/

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
  console.log(req.body); 
  catModel.changeCat(req.body.name, req.body.birthdate, req.body.weight, req.body.owner, req.body.id)
  res.json({message: 'Cat changed!'});
};

const cat_delete = (req, res, next) => {
  console.log(req.file);
  console.log(req.body);
  catModel.deleteCat(req.body.id)
};

module.exports = {
  cat_list_get,
  //cat_list_get_old,
  cat_post,
  cat_get,
  cat_update_put,
  cat_delete,
  //upload
};

