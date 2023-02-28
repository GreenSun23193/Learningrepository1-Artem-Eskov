'use strict';
const ExifImage = require('exif').ExifImage;

const getCoordinates = (imgFile) => { 
  return new Promise((resolve, reject) => {
    try {
      new ExifImage({ image : imgFile }, function (error, coordinates) {
        if (error) {
        }
        else {
            const tobereturned = [gpsToDecimal(coordinates.gps.GPSLongitude, coordinates.gps.GPSLongitudeRef), gpsToDecimal(coordinates.gps.GPSLatitude, coordinates.gps.GPSLatitudeRef)];
            resolve(tobereturned);
        }
      })
    } 
    catch (error) {
      reject(error);
    }
})
};

const gpsToDecimal = (gpsData, hem) => {
  let d = parseFloat(gpsData[0]) + parseFloat(gpsData[1] / 60) +
      parseFloat(gpsData[2] / 3600);
  return (hem === 'S' || hem === 'W') ? d *= -1 : d;
};

module.exports = {
  getCoordinates,
};