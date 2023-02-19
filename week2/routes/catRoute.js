'use strict';

const express = require('express')
const routerCatRoute = express.Router()

const { body, check } = require('express-validator');

routerCatRoute.use(express.static('public'));

const catModel = require('../models/catModel.js');

const multer  = require('multer')

//const upload = multer({ dest: 'uploads/' }

const upload = multer({
  dest: 'uploads/',
  //storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
})

const cats = catModel.cats;

const catController = require('../controllers/catController.js');

routerCatRoute.route('/')
  .get(catController.cat_list_get)
  .delete((req, res) => {
    res.send('With this endpoint you can delete cats.')
  })
  .post(
    upload.single('cat'), 
    [
      body('name').not().isEmpty().trim().escape(),
      body('birthdate').not().isEmpty().toDate(),
      body('weight').not().isEmpty().isDecimal(),
      //body('owner').not().isEmpty().isInt({ min: 0 }),
      check('filename').custom((value, {req}) => {
        if(req.file.filename != ''){
            return true;
        }else{
            return false;
        }
      })

    ],
    catController.cat_post
  );

//routerCatRoute.route('/cat')
/*
function putcheck (req, body) {
  console.log(req.user);
  if (req.user.user_role == 0) {
    [
      body('name').not().isEmpty().trim().escape(),
      body('birthdate').not().isEmpty().toDate(),
      body('weight').not().isEmpty().isDecimal(),
      body('owner').not().isEmpty().isInt()

    ]
  }
  else {
    [
      body('name').not().isEmpty().trim().escape(),
      body('birthdate').not().isEmpty().toDate(),
      body('weight').not().isEmpty().isDecimal(),
    ]
  }
}
*/
routerCatRoute.route('/:id')
  .get(catController.cat_get)
  .post(catController.cat_get)
  .delete(catController.cat_delete)
  .put(
    upload.single('cat'), 
    [
      body('name').not().isEmpty().trim().escape(),
      body('birthdate').not().isEmpty().toDate(),
      body('weight').not().isEmpty().isDecimal(),
      body('owner').optional().isInt()
    ],
    catController.cat_update_put);

//routerCatRoute.use('/cat', passport.authenticate('jwt', {session: false}), routerCatRoute);

/*routerCatRoute.route('/catinfo')
  .get((req, res) => {
    const cat = {
      name: 'Frank',
      birthdate: '2010-12-25',
      weight: 5,
    };
    res.json(cat);
  });*/

module.exports = routerCatRoute
