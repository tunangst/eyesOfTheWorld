const express = require('express');
const router = express.Router();
const moment = require('moment');

const Eye = require('../../models/Eye');

const upload = require('../../config/multerImageUpload');
const awsDelete = require('../../config/awsDelete');
// /api/eyes/user/${userId}
// /api/eyes/user/:userId
router.get('/user/:userId', async (request, response) => {
    console.log(`get /api/eyes/user/:user targeted and running`);
    const userId = request.params.userId;
    // console.log('userId', userId);
    const userEyes = await Eye.find({ user: userId });
    // console.log(userEyes);
    response.json(userEyes);
});

router.get('/', async (request, response) => {
    console.log(`get /api/eyes targeted and running`);
    // debugger;
    try {
        //find all eyes stored
        const infoData = await Eye.find();
        response.json(infoData);
    } catch (error) {
        console.error(error.message);
        response.status(500).send('Server Error');
    }
});

router.get('/:id', async (request, response) => {
    console.log(`(((((((((((((( /api/eyes/:id area))))))))))))))`);
    const id = request.params.id;
    try {
        const eye = await Eye.findById(id);
        response.json(eye);
    } catch (error) {
        console.error(error.message);
    }
});

router.post('/upload', upload.none(), async (request, response) => {
    try {
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
            url,
            user
        } = request.body;

        const alreadyPosted = await Eye.find({
            'info.latitude': latitude,
            'info.longitude': longitude
        });
        console.log('alreadyPosted');
        if (alreadyPosted.length > 0) {
            response
                .status(500)
                .send({ msg: 'Server Error: Eye already exists' });
        } else {
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

            const buildEye = {
                user: user,
                url: url,
                uploadDate: moment().format('LLLL'),
                pic: buildPic,
                info: buildInfo
            };

            const newEye = new Eye(buildEye);

            await newEye.save(err => {
                err && console.log(err.message);
            });
            response.json(newEye);
        }
    } catch (error) {
        console.error(error);
        response.status(500).send(error);
    }
});

module.exports = router;
