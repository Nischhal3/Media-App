'use strict';

const sharp = require('sharp');

const makeThumbnail = async (file, thumbname) => {
  return await sharp(file)
    .resize(250, 100)
    .toFile('./thumbnails/' + thumbname);
};
module.exports = makeThumbnail;
