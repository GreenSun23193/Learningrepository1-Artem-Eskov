'use strict';
// catRoute

const express = require('express')
const router1 = express.Router()

router1.use(express.static('public'));

/*NEW
router1.get('/catinfo', (req, res) => {
  const cat = {
    name: 'Frank',
    birthdate: '2010-12-25',
    weight: 5,
  };
  res.json(cat);
});*/

//router1.set('view engine', 'pug')

/*NEW
router1.get('/', (req, res) => {
  res.render('index.pug', { title: 'Title', heading: 'Click on the cat', name: 'Name', age: 'Age: 7', weight: 'Weight 5kg' })
})*/

/*router1.get('/cat', (req, res) => {
  res.render('index.pug', { title: 'Title', heading: 'Click on the cat', name: 'Name', age: 'Age: 7', weight: 'Weight 5kg' })
})*/

/*router1.post('/cat', (req, res) => {
  res.send('With this endpoint you can add cats.')
})*/

/*router1.put('/cat', (req, res) => {
  res.send('With this endpoint you can edit cats.')
})*/

/*NEW
router1.delete('/cat', (req, res) => {
  res.send('With this endpoint you can delete cats.')
})*/


const catModel = require('../models/catModel.js');

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const cats = catModel.cats;

/*router1.get('/cat/:id', (req, res) => {
  res.send("You requested a cat whose id is " + req.params.id)
})*/

const catController = require('../controllers/catController.js');

/*router1.get('/catcontroller', catController.cat_list_get_old);

router1.get('/catcontroller/:id', catController.cat_list_get);*/

//router1.get('/cat', catController.cat_list_get_old);

//router1.get('/cat/:id', catController.cat_list_get);

//router1.post('/cat', catController.cat_list_get_old);

//router1.post('/cat/:id', catController.cat_list_get);

/*NEW
router1.get('/cat/:id', catController.cat_get);
router1.post('/cat/:id', catController.cat_get);

router1.post('/cat', upload.single('cat'), catController.cat_post);

router1.get('/cat', catController.cat_list_get);

router1.put('/cat', catController.cat_update_put);

router1.delete('/cat/:id', catController.cat_delete);*/

router1.route('/cat')
  .get(catController.cat_list_get)
  .post(upload.single('cat'), catController.cat_post)
  .delete((req, res) => {
    res.send('With this endpoint you can delete cats.')
  })
  .put(catController.cat_update_put);


router1.route('/cat/:id')
  .get(catController.cat_get)
  .post(catController.cat_get)
  .delete(catController.cat_delete);

router1.route('/')
  .get((req, res) => {
    res.render('index.pug', { title: 'Title', heading: 'Click on the cat', name: 'Name', age: 'Age: 7', weight: 'Weight 5kg' })
  });

router1.route('/catinfo')
  .get((req, res) => {
    const cat = {
      name: 'Frank',
      birthdate: '2010-12-25',
      weight: 5,
    };
    res.json(cat);
  });

module.exports = router1
