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

const cat_list_change = (cats) => {
  var new_cats = document.createElement('new_cats');
  cats.forEach((cat) => {
    const option = document.createElement('option');
    option.value = user.user_id;
    option.innerHTML = user.name;
    option.classList.add('light-border');
    userList.appendChild(option);
  });
};


const cat_list_get = async (req, res) => {
  const cats = await catModel.getAllCats();

  /*console.log("cats------------------------");
  console.log(cats);
  console.log("cats.filename------------------------");
  console.log(cats.filename);
  console.log("cats.path------------------------");
  console.log(cats.path);*/

  //cats.filename = cats.path;

  /*console.log("new cats------------------------");
  console.log(cats);
  console.log("new cats.filename------------------------");
  console.log(cats.filename);
  console.log("new cats.path------------------------");
  console.log(cats.path);*/

  res.json(cats);
};

const cat_post = (req, res, next) => {

  console.log(req.file);
  console.log(req.body);
  catModel.addCat(req.body.name, req.body.birthdate, req.body.weight, req.body.owner, req.file.filename)
  //console.log("req------------------------");
  //console.log(req);
};

module.exports = {
  cat_list_get,
  //cat_list_get_old,
  cat_post,
  cat_get,
  //upload
};

