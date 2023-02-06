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

const { body, validationResult  } = require('express-validator');

const cat_post = (req, res, next) => {
  console.log(req.file);
  console.log(req.body);
  console.log("adding cat");

  const errors = validationResult(req);
  if (!errors.isEmpty())
  {
    console.log(errors);
    return res.status(500).json({message: "bad cat"});
  }
  //catModel.addCat(req.body.name.not().isEmpty().trim().escape(), req.body.birthdate.toDate(), req.body.weight.isDecimal(), req.body.owner.isInt(), req.file.filename.not().isEmpty().trim().escape())
  catModel.addCat(req.body.name, req.body.birthdate, req.body.weight, req.body.owner, req.file.filename);
  console.log("added a cat");
  res.json({message :"cat added"})
};

const cat_update_put = (req, res, next) => {
  const errorsUpdate = validationResult(req);
  if (!errorsUpdate .isEmpty())
  {
    console.log(errorsUpdate );
    //console.log("bad cat update console 1");
    return res.status(500).json({message: "bad cat update"});
  }
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

