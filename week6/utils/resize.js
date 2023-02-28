'use strict';
//TEMPORARILY COMMENTED AWAY BECAUSE OF VIRTUAL COMPUTER ISSUES
const sharp = require('sharp');

const makeThumbnail = async (file, thumbname) => { // file = full path to image (req.file.path), thumbname = filename (req.file.filename)
  // TODO: use sharp to create a png thumbnail of 160x160px, use async await
  //file = await sharp(req.file.path),
  //thumbname = await sharp(req.file.filename)
  console.log("THUMBNAIL 1");
  console.log("file :");
  console.log(file);
  console.log("thumbname :");
  console.log(thumbname);

  await sharp(file)
  .resize(160, 160)
  .toFile(thumbname, function(err) {
  });
};

console.log("THUMBNAIL 2");

module.exports = {
  makeThumbnail,
};