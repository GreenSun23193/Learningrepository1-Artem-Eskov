'use strict';

const express = require('express')
const routerFileRoute = express.Router()

const { body, check } = require('express-validator');

routerFileRoute.use(express.static('public'));

const fileModel = require('../models/fileModel.js');

const multer  = require('multer')

const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/*" || file.mimetype == "video/*" || file.mimetype == "audio/*") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only video, audio and image files are allowed!'));
    }
  }
})

const files = fileModel.files;

const fileController = require('../controllers/fileController.js');

routerFileRoute.route('/')
  .get(fileController.file_list_get)
  .delete((req, res) => {
    res.send('File deletion.')
  })
  .post(
    upload.single('file'), 
    [
      body('name').not().isEmpty().trim().escape(),
      body('birthdate').not().isEmpty().toDate(),
      body('weight').not().isEmpty().isDecimal(),
      check('filename').custom((value, {req}) => {
        if(req.file.filename != ''){
            return true;
        }else{
            return false;
        }
      })

    ],
    fileController.file_post
  );

routerFileRoute.route('/:id')
  .get(fileController.file_get)
  .post(fileController.file_get)
  .delete(fileController.file_delete)
  .put(
    upload.single('file'), 
    [
      body('name').not().isEmpty().trim().escape(),
      body('description'),
      body('owner').optional().isInt()
    ],
    fileController.file_update_put);

module.exports = routerFileRoute
