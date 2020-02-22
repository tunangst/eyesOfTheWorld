const express = require('express');
const router = express.Router();

const Eye = require('../../models/Eye');

const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

const config = require('config');
const db = config.get('mongoURI');

// const storage = multer.diskStorage({
//     destination: function(request, file, callback) {
//         callback(null, 'uploads/');
//     },
//     filename: function(request, file, callback) {
//         const now = new Date().toISOString();
//         const date = now.replace(/:/g, '-');
//         callback(null, date + file.originalname);
//     }
// });

// const fileFilter = (req, file, callback) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         callback(null, true); //accepts
//     } else {
//         callback(null, false); //rejects null will return an error
//     }
//     // callback(null,true); //accepts
// };

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const storage = new GridFsStorage({
    url: db,
    file: (request, file) => {
        console.log(file + `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
        return new Promise((resolve, reject) => {
            const now = new Date().toISOString();
            const date = now.replace(/:/g, '-');
            // console.log(request);
            const filename = date + '|||' + file.originalname;
            console.log(filename);
            const fileInfo = {
                filename: filename,
                bucketName: 'uploads'
            };
            resolve(fileInfo);
        });
    }
});

const upload = multer({ storage });

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// const upload = multer({ storage: storage, fileFilter: fileFilter });
// in upload can add limits: {fileSize: 1024 * 1024 * 5 to accept limit of 5 megabites}

const Info = require('../../models/Info');

//should be request from /api/eyes
router.get('/', async (request, response) => {
    console.log(`get /api targeted and running`);
    // debugger;
    try {
        //find all eyes stored
        const infoData = await Eyes.find();
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

router.post(
    '/upload',
    // upload.fields([{ name: 'picSubmit', maxCount: 1 }, { name: 'infoSubmit' }]),
    upload.single('pic'),
    (request, response) => {
        console.log(`post request received at: /upload`);
        console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
        // console.log(request.file);
        // response.json({ file: request.file });
        // console.log(request.file);
        console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
        // console.log(request);
        console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
        // request body looks like
        // {
        //      pic: 'baseuri:/ablkasdjfalsdfioajsfklasdf...,
        //      info: {
        //          latitude: 28.24898,
        //          longitude: -82.24898,...
        //      }
        // }
        // debugger;

        try {
            // console.log(request);
            // console.log(request);
            const picture = request.file;
            const pic = () => {
                console.log(picture.fieldname);
                console.log(picture.originalname);
                console.log(picture.encoding);
                console.log(picture.mimetype);
                console.log(picture.id);
                console.log(picture.filename);
                console.log(picture.metadata);
                console.log(picture.bucketName);
                console.log(picture.chunkSize);
                console.log(picture.size);
                console.log(picture.md5);
                console.log(picture.uploadDate);
                console.log(picture.contentType);
            };
            pic();
            console.log(picture + '  this is the pic right here uploading');
            const { body } = request;
            for (let key in body) {
                console.log(`~~${key}:::${body[key]}~~`);
            }
            // console.log(request.body + 'this is body from request');
            // debugger;
            // let buildEye = {
            //     pic: pic,
            //     info: body
            // };
            // console.log(buildEye);
            // const newEye = new Eye({ ...body });

            // const info = newInfo.save();
            response.send(`new Eye has been saved! :^]`);
            // response.send(`new Eye has been saved! :^]`).send(info);
        } catch (error) {
            console.error(error.message);
            response
                .status(500)
                .send(`Server Error: body sent resulted in: ${body}`);
        }
    }
);

module.exports = router;
