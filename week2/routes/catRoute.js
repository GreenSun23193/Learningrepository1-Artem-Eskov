'use strict';

const express = require('express')
const routerCatRoute = express.Router()

routerCatRoute.use(express.static('public'));

const catModel = require('../models/catModel.js');

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const cats = catModel.cats;

const catController = require('../controllers/catController.js');

routerCatRoute.route('/cat')
  .get(catController.cat_list_get)
  .post(upload.single('cat'), catController.cat_post)
  .delete((req, res) => {
    res.send('With this endpoint you can delete cats.')
  })
  .put(catController.cat_update_put);


routerCatRoute.route('/cat/:id')
  .get(catController.cat_get)
  .post(catController.cat_get)
  .delete(catController.cat_delete);

routerCatRoute.route('/')
  .get((req, res) => {
    res.render('index.pug', { title: 'Title', heading: 'Click on the cat', name: 'Name', age: 'Age: 7', weight: 'Weight 5kg' })
  });

routerCatRoute.route('/catinfo')
  .get((req, res) => {
    const cat = {
      name: 'Frank',
      birthdate: '2010-12-25',
      weight: 5,
    };
    res.json(cat);
  });

module.exports = routerCatRoute
