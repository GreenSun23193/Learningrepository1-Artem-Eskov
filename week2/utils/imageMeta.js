'use strict';
const ExifImage = require('exif').ExifImage;

const getCoordinates = (imgFile) => { // imgFile = full path to uploaded image
  //console.log("OOOOOOOOOOOOOOOOOOO getCoordinates WORKING");
  return new Promise((resolve, reject) => {
    //console.log("OOOOOOOOOOOOOOOOOOO new Promise WORKING");
    try {
        //console.log("OOOOOOOOOOOOOOOOOOO try WORKING");
      // TODO: Use node-exif to get longitude and latitude from imgFile
      // coordinates below should be an array of GPS coordinates in decimal format: [longitude, latitude]
      new ExifImage({ image : imgFile }, function (error, coordinates) {
        //console.log("OOOOOOOOOOOOOOOOOOO ExifImage WORKING");
        if (error) {
            //console.log("OOOOOOOOOOOOOOOOOOO if WORKING");
            //console.log('Error: '+error.message);
        }
        else {
            //console.log("OOOOOOOOOOOOOOOOOOO else WORKING");
            //console.log("coordinates :");
            //console.log(coordinates);
            //resolve(coordinates);
            const tobereturned = [gpsToDecimal(coordinates.gps.GPSLongitude, coordinates.gps.GPSLongitudeRef), gpsToDecimal(coordinates.gps.GPSLatitude, coordinates.gps.GPSLatitudeRef)];
            console.log("coordinates.gps.GPSLongitude: ");
            console.log(coordinates.gps.GPSLongitude);

            console.log("coordinates.gps.GPSLatitude: ");
            console.log(coordinates.gps.GPSLatitude);

            console.log("coordinates.gps.GPSLongitudeRef: ");
            console.log(coordinates.gps.GPSLongitudeRef);

            console.log("coordinates.gps.GPSLatitudeRef: ");
            console.log(coordinates.gps.GPSLatitudeRef);

            console.log("gpsToDecimal(coordinates.gps.GPSLongitude, coordinates.gps.GPSLatitude): ");
            console.log(gpsToDecimal(coordinates.gps.GPSLongitude, coordinates.gps.GPSLatitude));

            console.log("gpsToDecimal(coordinates.gps.GPSLongitudeRef, coordinates.gps.GPSLatitudeRef): ");
            console.log(gpsToDecimal(coordinates.gps.GPSLongitudeRef, coordinates.gps.GPSLatitudeRef));


            console.log("gpsToDecimal(coordinates.gps.GPSLongitude, coordinates.gps.GPSLongitudeRef): ");
            console.log(gpsToDecimal(coordinates.gps.GPSLongitude, coordinates.gps.GPSLongitudeRef));


            console.log("gpsToDecimal(coordinates.gps.GPSLatitude, coordinates.gps.GPSLatitudeRef): ");
            console.log(gpsToDecimal(coordinates.gps.GPSLatitude, coordinates.gps.GPSLatitudeRef));

            console.log("tobereturned: ");
            console.log(tobereturned);
            resolve(tobereturned);
        }
      })
    } 
    catch (error) {
      //console.log("OOOOOOOOOOOOOOOOOOO catch WORKING");
      reject(error);
    }
})
};

// convert GPS coordinates to decimal format
// for longitude, send exifData.gps.GPSLongitude, exifData.gps.GPSLongitudeRef
// for latitude, send exifData.gps.GPSLatitude, exifData.gps.GPSLatitudeRef
const gpsToDecimal = (gpsData, hem) => {
  let d = parseFloat(gpsData[0]) + parseFloat(gpsData[1] / 60) +
      parseFloat(gpsData[2] / 3600);
  return (hem === 'S' || hem === 'W') ? d *= -1 : d;
};

module.exports = {
  getCoordinates,
};