const express = require('express');
const router = express.Router();
const moment = require('moment');

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
        return new Promise((resolve, reject) => {
            const now = new Date().toISOString();
            const date = now.replace(/:/g, '-');
            // console.log(request);
            const filename = date + '|||' + file.originalname;
            // console.log(filename);
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

router.post('/upload', upload.single('pic'), (request, response) => {
    console.log(`post request received at: /upload`);
    try {
        const pic = request.file;
        console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
        const picture = () => {
            console.log(pic.fieldname);
            console.log(pic.originalname);
            console.log(pic.encoding);
            console.log(pic.mimetype);
            console.log(pic.id);
            console.log(pic.filename);
            console.log(pic.metadata);
            console.log(pic.bucketName);
            console.log(pic.chunkSize);
            console.log(pic.size);
            console.log(pic.md5);
            console.log(pic.uploadDate);
            // console.log(pic.uploadDate.toDate());
            console.log(pic.contentType);
        };
        picture();
        const timeStamp = moment(pic.uploadDate);
        pic.uploadDate = timeStamp.toDate();
        console.log(pic.uploadDate);

        console.log(pic + '  this is the pic right here uploading');
        console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
        const { body } = request;
        for (let key in body) {
            console.log(`~~${key}:::${body[key]}~~`);
        }
        console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);

        let buildEye = {
            pic: pic,
            info: body
        };
        console.log(buildEye);
        const newEye = new Eye(buildEye);

        const eye = newEye.save();
        response
            .status(200)
            .send({ message: `new Eye has been saved! :^]`, eye: buildEye });
        // response.send(`new Eye has been saved! :^]`).send(info);
    } catch (error) {
        console.error(error.message);
        response
            .status(500)
            .send(`Server Error: body sent resulted in: ${body}`);
    }
});

module.exports = router;
