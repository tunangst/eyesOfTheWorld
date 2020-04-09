// // import createMap from '../googleMaps/createMap';
// import { calculateLatLong, enterInForm } from '../utilityFunctions/utilities';
// // import EXIF from 'exif-js';
// // const EXIF = require('exif-js');
// import EXIF from '../../../node_modules/exif-js/exif';

// const workData = img => {
//     let latitude;
//     let longitude;
//     const tags = EXIF.getAllTags(img);

//     //~~~~~~~~~~~~~~lat-lon start~~~~~~~~~~~~~~~~~~~~~~
//     const lat = tags.GPSLatitude;
//     const latDegree = lat[0].numerator / lat[0].denominator;
//     const latMinute = lat[1].numerator / lat[1].denominator;
//     const latSecond = lat[2].numerator / lat[2].denominator;
//     const latDirection = tags.GPSLatitudeRef;
//     const GPSLatitude = [latDegree, latMinute, latSecond, latDirection];

//     const lon = tags.GPSLongitude;
//     const lonDegree = lon[0].numerator / lon[0].denominator;
//     const lonMinute = lon[1].numerator / lon[1].denominator;
//     const lonSecond = lon[2].numerator / lon[2].denominator;
//     const lonDirection = tags.GPSLongitudeRef;
//     const GPSLongitude = [lonDegree, lonMinute, lonSecond, lonDirection];

//     latitude = calculateLatLong(
//         GPSLatitude[0],
//         GPSLatitude[1],
//         GPSLatitude[2],
//         GPSLatitude[3]
//     );
//     longitude = calculateLatLong(
//         GPSLongitude[0],
//         GPSLongitude[1],
//         GPSLongitude[2],
//         GPSLongitude[3]
//     );
//     console.log(latitude, longitude);
//     const elLatitude = document.querySelector('#latitude');
//     enterInForm(elLatitude, latitude);
//     const elLongitude = document.querySelector('#longitude');
//     enterInForm(elLongitude, longitude);

//     // obj.latitude = latitude;
//     // obj.longitude = longitude;
//     // console.log(obj);

//     // createMap(latitude, longitude);
//     //~~~~~~~~~~~~~~lat-lon end~~~~~~~~~~~~~~~~~~~~~~
//     //~~~~~~~~~~~~~~primary picture info start~~~~~~~~~~~~~~~~~~~~~~~
//     const elModel = document.querySelector('#model');
//     enterInForm(elModel, tags.Model);

//     const elDate = document.querySelector('#date');
//     enterInForm(elDate, tags.DateTimeOriginal);

//     const elWidth = document.querySelector('#width');
//     enterInForm(elWidth, tags.PixelXDimension);

//     const elHeight = document.querySelector('#height');
//     enterInForm(elHeight, tags.PixelYDimension);

//     //~~~~~~~~~~~~~~primary picture info start~~~~~~~~~~~~~~~~~~~~~~~
//     //~~~~~~~~~~~~~~ picture taken info start~~~~~~~~~~~~~~~~~~~~~~~
//     const elAperture = document.querySelector('#aperture');
//     enterInForm(elAperture, tags.ApertureValue);

//     const elShutter = document.querySelector('#shutter');
//     enterInForm(elShutter, tags.ShutterSpeed);

//     const elIso = document.querySelector('#iso');
//     enterInForm(elIso, tags.ISOSpeedRatings);

//     const elExposure = document.querySelector('#exposure');
//     enterInForm(elExposure, tags.ExposureTime);

//     //~~~~~~~~~~~~~~ picture taken info end~~~~~~~~~~~~~~~~~~~~~~~
//     //~~~~~~~~~~~~~~ picture light info start~~~~~~~~~~~~~~~~~~~~~~~
//     const elLight = document.querySelector('#light');
//     enterInForm(elLight, tags.LightSource);

//     const elFlash = document.querySelector('#flash');
//     enterInForm(elFlash, tags.Flash);

//     const elEnergy = document.querySelector('#energy');
//     enterInForm(elEnergy, tags.FlashEnergy);

//     //~~~~~~~~~~~~~~ picture light info end~~~~~~~~~~~~~~~~~~~~~~~
//     //~~~~~~~~~~~~~~ picture edit info start~~~~~~~~~~~~~~~~~~~~~~~
//     const elContrast = document.querySelector('#contrast');
//     enterInForm(elContrast, tags.Contrast);

//     const elSaturation = document.querySelector('#saturation');
//     enterInForm(elSaturation, tags.Saturation);

//     const elSharpness = document.querySelector('#sharpness');
//     enterInForm(elSharpness, tags.Sharpness);

//     const elBrightness = document.querySelector('#brightness');
//     enterInForm(elBrightness, tags.BrightnessValue);

//     const elWhiteBalance = document.querySelector('#whiteBalance');
//     enterInForm(elWhiteBalance, tags.WhiteBalance);

//     const elZoom = document.querySelector('#zoom');
//     enterInForm(elZoom, tags.DigitalZoomRation);

//     //~~~~~~~~~~~~~~ picture edit info end~~~~~~~~~~~~~~~~~~~~~~~
//     //~~~~~~~~~~~~~~ picture copyright start~~~~~~~~~~~~~~~~~~~~~~~
//     const elArtist = document.querySelector('#artist');
//     enterInForm(elArtist, tags.Artist);

//     const elSoftware = document.querySelector('#software');
//     enterInForm(elSoftware, tags.Software);

//     const elCopyright = document.querySelector('#copyright');
//     enterInForm(elCopyright, tags.Copyright);

//     //~~~~~~~~~~~~~~ picture copyright end~~~~~~~~~~~~~~~~~~~~~~~
// };

// const findData = (img, info) => {
//     console.log(info);
//     const test = document.querySelector('.img1');
//     const result = EXIF.getData(test, () => workData(test));
//     console.log(result);
// };

// export default findData;
