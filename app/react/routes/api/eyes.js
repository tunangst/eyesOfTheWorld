const express = require('express');
const router = express.Router();
const moment = require('moment');
const mongoose = require('mongoose');
// const axios = require('axios');

const dbMethods = require('../../config/db');
const gfs = dbMethods.gfs;

const Eye = require('../../models/Eye');

const multer = require('multer');
const upload = multer();

const GridFsStorage = require('multer-gridfs-storage');

const config = require('config');
const db = config.get('mongoURI');

// const fileFilter = (req, file, callback) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         callback(null, true); //accepts
//     } else {
//         callback(null, false); //rejects null will return an error
//     }
//     // callback(null,true); //accepts
// };

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// const storage = new GridFsStorage({
//     url: db,
//     options: { useUnifiedTopology: true },
//     file: (request, file) => {
//         return new Promise((resolve, reject) => {
//             const now = new Date().toISOString();
//             const date = now.replace(/:/g, '-');
//             const filename = date + '|||' + file.originalname;
//             const fileInfo = {
//                 filename: filename,
//                 bucketName: 'picUploads'
//             };
//             resolve(fileInfo);
//         });
//     }
// });

// const upload = multer({ storage });

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// const upload = multer({ storage: storage, fileFilter: fileFilter });
// in upload can add limits: {fileSize: 1024 * 1024 * 5 to accept limit of 5 megabites}

// const Info = require('../../models/Info');

//should be request from /api/eyes
router.get('/', async (request, response) => {
    console.log(`get /api targeted and running`);
    // debugger;
    try {
        //find all eyes stored
        const infoData = await Eye.find();
        console.log(`☻ info data down`);
        console.log(infoData);
        //load google maps location request for everything

        //send the res back
        response.json(infoData);
    } catch (error) {
        console.error(error.message);
        response.status(500).send('Server Error');
    }
});

router.get('/:id', async (request, response) => {
    console.log(`(((((((((((((( /api/eyes/:id area))))))))))))))`);
    const id = request.params.id;
    console.log(id);
    console.log(`get /api/eyes/${id} targeted and running`);
    try {
        const eye = await Eye.findById(id);
        console.log(eye);
        response.json(eye);
    } catch (error) {
        console.error(error.message);
    }
});

router.post('/upload', upload.none(), async (request, response) => {
    console.log(`post request received at: /upload`);
    console.log(`.`);
    console.log(`.`);
    console.log(`.`);
    console.log(`.`);
    try {
        // const timeStamp = moment(uploadDate);
        // const newUploadDate = timeStamp.toDate();

        const {
            latitude,
            longitude,
            camera,
            date,
            width,
            height,
            aperture,
            shutter,
            iso,
            exposure,
            light,
            flash,
            flashStrength,
            contrast,
            saturation,
            sharpness,
            brightness,
            whiteBalance,
            zoom,
            artist,
            software,
            copyright,
            picName,
            picSize,
            picType,
            url
        } = request.body;

        // const buildUrl = {
        //     link: imgUrl
        // };

        const buildInfo = {};
        latitude && (buildInfo.latitude = latitude);
        longitude && (buildInfo.longitude = longitude);
        camera && (buildInfo.camera = camera);
        date && (buildInfo.date = date);
        width && (buildInfo.width = width);
        height && (buildInfo.height = height);
        aperture && (buildInfo.aperture = aperture);
        shutter && (buildInfo.shutter = shutter);
        iso && (buildInfo.iso = iso);
        exposure && (buildInfo.exposure = exposure);
        light && (buildInfo.light = light);
        flash && (buildInfo.flash = flash);
        flashStrength && (buildInfo.flashStrength = flashStrength);
        contrast && (buildInfo.contrast = contrast);
        saturation && (buildInfo.saturation = saturation);
        sharpness && (buildInfo.sharpness = sharpness);
        brightness && (buildInfo.brightness = brightness);
        whiteBalance && (buildInfo.whiteBalance = whiteBalance);
        zoom && (buildInfo.zoom = zoom);
        artist && (buildInfo.artist = artist);
        software && (buildInfo.software = software);
        copyright && (buildInfo.copyright = copyright);

        const buildPic = {};
        picName && (buildPic.name = picName);
        picSize && (buildPic.size = picSize);
        picType && (buildPic.type = picType);

        // console.log(typeof imgUrl);

        const buildEye = {
            url: url,
            pic: buildPic,
            info: buildInfo
        };
        console.log(`~~~~~~~`);
        console.log(buildEye);
        console.log(`~~~~~~~`);
        // debugger;

        const newEye = new Eye(buildEye);
        // const newEye = new Eye(buildEye);
        console.log(newEye);
        console.log(newEye.url);

        console.log(`\\\\\\\\\\\\\\\\\\\\\\\\\\\\\//////////////////////////`);
        await newEye.save(err => {
            err && console.log(err.message);
        });
        // debugger;
        response.status(200).send({ message: `new Eye has been saved! :^]` });
    } catch (error) {
        console.error(error.message);
        response.status(500).send(`Server Error: tried to send and resulted`);
    }
});

module.exports = router;
