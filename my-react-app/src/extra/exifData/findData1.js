// import EXIF from '../../../node_modules/exif-js/exif';

// const findData1 = () => {
//     const img1 = document.querySelector('.img1');
//     EXIF.getData(img1, () => {
//         let latitude;
//         let longitude;
//         const tags = EXIF.getAllTags(img1);
//         console.log(tags);
//         // debugger;

//         //~~~~~~~~~~~~~~lat-lon start~~~~~~~~~~~~~~~~~~~~~~
//         const lat = tags.GPSLatitude;
//         const latDegree = lat[0].numerator / lat[0].denominator;
//         const latMinute = lat[1].numerator / lat[1].denominator;
//         const latSecond = lat[2].numerator / lat[2].denominator;
//         const latDirection = tags.GPSLatitudeRef;
//         const GPSLatitude = [latDegree, latMinute, latSecond, latDirection];

//         const lon = tags.GPSLongitude;
//         const lonDegree = lon[0].numerator / lon[0].denominator;
//         const lonMinute = lon[1].numerator / lon[1].denominator;
//         const lonSecond = lon[2].numerator / lon[2].denominator;
//         const lonDirection = tags.GPSLongitudeRef;
//         const GPSLongitude = [lonDegree, lonMinute, lonSecond, lonDirection];

//         latitude = calculateLatLong(
//             GPSLatitude[0],
//             GPSLatitude[1],
//             GPSLatitude[2],
//             GPSLatitude[3]
//         );
//         longitude = calculateLatLong(
//             GPSLongitude[0],
//             GPSLongitude[1],
//             GPSLongitude[2],
//             GPSLongitude[3]
//         );
//         console.log(latitude, longitude);
//         // const elLatitude = document.querySelector('#latitude');
//         // enterInForm(elLatitude, latitude);
//         // const elLongitude = document.querySelector('#longitude');
//         // enterInForm(elLongitude, longitude);

//         console.log(tags.Model);
//         const enterInfo = {
//             latitude: latitude,
//             longitude: longitude,
//             camera: tags.Model,
//             date: tags.DateTimeOriginal,
//             width: tags.PixelXDimension,
//             height: tags.PixelYDimension,
//             aperture: tags.ApertureValue,
//             shutter: tags.ShutterSpeed,
//             iso: tags.ISOSpeedRatings,
//             exposure: tags.ExposureTime,
//             light: tags.LightSource,
//             flash: tags.Flash,
//             flashStrength: tags.FlashEnergy,
//             contrast: tags.Contrast,
//             saturation: tags.Saturation,
//             sharpness: tags.Sharpness,
//             brightness: tags.BrightnessValue,
//             whiteBalance: tags.WhiteBalance,
//             zoom: tags.DigitalZoomRation,
//             artist: tags.Artist,
//             software: tags.Software,
//             copyright: tags.Copyright
//         };

//         setState({
//             ...state,
//             googleMapsLocation: [latitude, longitude],
//             info: {
//                 ...enterInfo
//             }
//         });
//     });
//     console.log(state);
// };
// export default findData1;
