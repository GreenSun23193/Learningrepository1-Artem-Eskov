'use strict';

const catModel = require('../models/catModel.js');
const resize = require('../utils/resize.js');

const cats = catModel.cats;

const cat_get = async (req, res) => {
  const ret = await catModel.getCat(req.params.id);
  console.log(ret);
  res.json(ret);
};

const cat_list_get = async (req, res) => {
  console.log("get all cats");
  const cats = await catModel.getAllCats();
  res.json(cats);
};

const { body, validationResult  } = require('express-validator');

const cat_post = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
  {
    console.log(errors);
    return res.status(500).json({message: "bad cat"});
  }
  try {
    resize.makeThumbnail(req.file.path, "thumbnails/" + req.file.filename);

    const coords = await imageMeta.getCoordinates(req.file.path);
    console.log('coords', coords);

    const cat = await catModel.addCat(req.body.name, req.body.birthdate, req.body.weight, /*req.body.owner,*/ req.user[0].user_id, req.file.filename, coords);
    console.log("added a cat (controller)");
    await res.json({message :"upload ok"})
  }
  catch (e) {
    console.log('exif error', e);
    res.status(400).json({message: 'error'});
  }

};

const cat_update_put = async (req, res, next) => {
  console.log("CAT UPDATE PUT PASSED");
  const errorsUpdate = validationResult(req);
  if (!errorsUpdate .isEmpty())
  {
    console.log(errorsUpdate );
    //console.log("bad cat update console 1");
    return res.status(500).json({message: "bad cat update"});
  }
  const thisCat = await catModel.getCat(req.params.id);
  console.log("THISCAT PASSED");
  if (req.user[0].user_role == 0) {
  catModel.changeCat(req.body.name, req.body.birthdate, req.body.weight, req.body.owner, req.params.id, thisCat.owner, req.user[0].user_id, req.user[0].user_role)
  }
  else {
  catModel.changeCat(req.body.name, req.body.birthdate, req.body.weight, req.params.id, thisCat.owner, req.user[0].user_id, req.user[0].user_role)
  }
  res.json({message: 'Cat changed!'});
};

const cat_delete = async (req, res, next) => {
  const thisCat = await catModel.getCat(req.params.id);
  catModel.deleteCat(req.params.id, thisCat.owner, req.user[0].user_id, req.user[0].user_role)
};

module.exports = {
  cat_list_get,
  cat_post,
  cat_get,
  cat_update_put,
  cat_delete,
};

