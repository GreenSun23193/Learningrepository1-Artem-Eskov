'use strict';

const fileModel = require('../models/fileModel.js');
const resize = require('../utils/resize.js');
var ExifImage = require('exif').ExifImage;

const files = fileModel.files;

const file_get = async (req, res) => {
  const ret = await fileModel.getFile(req.params.id);
  console.log(ret);
  res.json(ret);
};

const file_list_get = async (req, res) => {
  console.log("get all files");
  const files = await fileModel.getAllFiles();
  res.json(files);
};

const { body, validationResult  } = require('express-validator');

const file_post = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
  {
    console.log("errors: ");
    console.log(errors);
    return res.status(500).json({message: "File submitted incorrectly."});
  }
  try {
    resize.makeThumbnail(req.file.path, "thumbnails/" + req.file.filename);
    const file = await fileModel.addFile(req.body.name, req.body.description, req.user[0].user_id, req.file.filename);
    await res.json({message :"File upload has been succesful."})
  }
  catch (e) {
    console.log('exif error', e);
    res.status(400).json({message: 'error'});
  }
};

const file_update_put = async (req, res, next) => {
  const errorsUpdate = validationResult(req);
  if (!errorsUpdate .isEmpty())
  {
    console.log(errorsUpdate );
    return res.status(500).json({message: "File update has been unsuccesful."});
  }
  const thisFile = await fileModel.getFile(req.params.id);
  if (req.user[0].role == 0) {
      fileModel.changeFile(req.body.description, req.body.owner, req.params.id, thisFile.owner, req.user[0].user_id, req.user[0].role)
    }
    else {
      fileModel.changeFile(req.body.description, "", req.params.id, thisFile.owner, req.user[0].user_id, req.user[0].role)
    }
  res.json({message: 'File changed!'});
};

const file_delete = async (req, res, next) => {
  const thisFile = await fileModel.getFile(req.params.id);
  fileModel.deleteFile(req.params.id, thisFile.owner, req.user[0].user_id, req.user[0].role)
};

module.exports = {
  file_list_get,
  file_post,
  file_get,
  file_update_put,
  file_delete,
};

