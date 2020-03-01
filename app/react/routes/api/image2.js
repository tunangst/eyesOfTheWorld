const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// mongoose.set('useCreateIndex', true);
// const { mongo, connection } = mongoose;
// const Grid = require('gridfs-stream');
// const { GridFSBucket } = require('mongo');
const fs = require('fs');
// Grid.mongo = mongoose.mongo;
// console.log(mongoose);

const config = require('config');
const dbURI = config.get('mongoURI');

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};
const { GridFSBucket, MongoClient, ObjectId } = require('mongodb');
// import { GridFSBucket, MongoClient, ObjectId } from 'mongodb';

// hitting /api/image/:id
router.get('/:id', async (request, response) => {
    // const mongoose = require('mongoose');
    console.log(`(((((((((((((( /api/image/:id area))))))))))))))`);
    const filename = request.params.id;
    console.log(filename);
    // console.log(request.params);
    // var conn = mongoose.createConnection(dbURI, options);
    //     conn.once('open', async function() {
    let connection = await MongoClient.connect(dbURI, options);
    let db = connection.db('World');
    // let gfs = new GridFSBucket(db, { bucketName: 'picUploads' });
    // console.log(db);
    // var gfs = new mongoose.mongo.GridFSBucket(db, mongoose.mongo);
    // var gfs = Grid(db, mongoose.mongo);

    let gridfsbucket = new GridFSBucket(db, { bucketName: 'picUploads' });
    let cursor = await gridfsbucket.find({ filename: filename });
    console.log(cursor);
    // const readstream = fs.createReadStream('sample.txt');
    // const writestream = gridfsbucket.openUpload;
    gridfsbucket
        .openDownloadStreamByName('./write/stream-download.txt')
        .pipe(fs.createWriteStream('./write/stream-download.txt'))
        .on('error', error => {
            console.log('error in createWRITEstream');
            console.log(error);
            response.send(error);
        })
        .on('finish', () => {
            console.log('down downloading');
            response.send('finished');
        });
    // gridfsbucket
    //     .openDownloadStreamByName(id + '.txt')
    //     .pipe(fs.createWriteStream(id + '.txt'))
    //     .on('error', () => {
    //         console.log('error in createWRITEstream');
    //         response.send(error);
    //     })
    //     .on('finish', () => {
    //         console.log('down downloading');
    //         response.send('finished');
    //     });
    // const writestream = fs.createWriteStream({
    //     filename: cursor.originalname,
    //     content_type: cursor.mimetype
    // });
    // fs.createReadStream('./write/').pipe(writestream);
    // readStream.pipe(response);
    // gfs.findOne(
    //     {
    //         _id: id,
    //         root: 'picUploads'
    //     },
    //     (err, file) => {
    //         console.log(file);
    //         const writestream = gfs.createWriteStream({
    //             filename: file.originalname,
    //             content_type: file.mimetype
    //         });
    //         fs.createReadStream('./write/').pipe(writestream);
    //         // readStream.pipe(response);
    //     }
    // );
    // console.log(cursor);

    // let uploadStream = gridfsbucket.openUploadStream(`./write/displayImg.dat`);

    // uploadStream.once('finish', () => {
    //     let downloadStream = gridfsbucket.openDownloadStreamByName(
    //         `./write/displayImg.dat`
    //     );
    // });

    // console.log(cursor);
    // console.log('^^^^^^^filecursor^^^^^^^^^^');

    // // console.log(mongoose.mongo.GridFSBucket);
    // // let gridfsbucket = new mongoose.mongo.GridFSBucket(dbURI);
    // // console.log(gridfsbucket);
    // gridfsbucket
    //     .openDownloadStreamByName(`./write`)
    //     .pipe(fs.createWriteStream(`./write`))
    //     .on('error', error => {
    //         console.log('Some error occurred in download:' + error);
    //         response.status(404).json({
    //             msg: error.message
    //         });
    //     })
    //     .on('finish', () => {
    //         console.log('done downloading');
    //         response.send('Done Downloading');
    //         // let readStream = fs.createReadStream(
    //         //     `./write/` + filename + '.json'
    //         // );
    //         // readStream.pipe(response);
    //     });
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // var mongoose = require('mongoose');
    // var Grid = require('gridfs-stream');

    // var conn = mongoose.createConnection(dbURI, options);
    // conn.once('open', async function() {
    //     var gfs = new mongoose.mongo.GridFSBucket(conn.db, mongoose.mongo);
    //     var gfs = Grid(conn.db, mongoose.mongo);

    //     console.log(gfs.findOne);
    //     gfs.findOne(
    //         {
    //             _id: id,
    //             root: 'picUploads'
    //         },
    //         (error, file) => {
    //             console.log(`**************** ${file} *****************`);
    //             if (!file || file.length === 0) {
    //                 return response.status(404).json({
    //                     error: 'No file found'
    //                 });
    //             }
    //             for (let key in file) {
    //                 console.log(key, file[key]);
    //             }
    //             var readstream = gfs.createReadStream({
    //                 id: request.params.id
    //             });
    //             readstream.on('error', function(err) {
    //                 response.send('No image found with that title');
    //             });
    //             readstream.pipe(response);
    //         }
    //     );
    // });

    // console.log(mongoose.connection.db);

    // console.log(`get /api/image/${id} targeted and running`);
});

// var Grid = require('gridfs-stream');
// Grid.mongo = mongo;

// router.get('/:filename', function(req, res) {
//     gfs = Grid(db);
//     var readstream = gfs.createReadStream({ filename: req.params.filename });
//     readstream.on('error', function(err) {
//         res.send('No image found with that title');
//     });
//     readstream.pipe(res);
// });

module.exports = router;
