'use strict';
const sharp = require('sharp');

const makeThumbnail = async (file, thumbname) => { // file = full path to image (req.file.path), thumbname = filename (req.file.filename)
  // TODO: use sharp to create a png thumbnail of 160x160px, use async await
  //file = await sharp(req.file.path),
  //thumbname = await sharp(req.file.filename)

/*  file = await sharp(create: {
    width: 48,
    height: 48})*/
};

module.exports = {
  makeThumbnail,
};