const mongoose = require('mongoose');
const config = require('config');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

// const EyeSchema = require('../models/Eye');

// const db = config.get('mongoURI');
// import mongoose from 'mongoose';
// import config from 'config';
const db = config.get('mongoURI');

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// const connectDB = async () => {
//     try {
//         await mongoose.connect(db, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useCreateIndex: true,
//             useFindAndModify: false
//         });
//         console.log('DB Connected');
//     } catch (error) {
//         console.error(error.message);
//         process.exit(1);
// };
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//

// const conn = mongoose.createConnection(db, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false
// });
// // const EyeSchema = conn.model('Eye', EyeSchema);
// module.exports = conn => {
//     conn.model('Eye', EyeSchema);
// };

// const eyeSchema = require('../models/Eye');

// let gfs;
// const conn = mongoose.createConnection(db);
// conn.once('open', () => {
//     //init stream
//     gfs = Grid(conn.db, mongoose.mongo);
//     gfs.collections('uploads');
// });
//create storage obj

// const storage = new GridFsStorage({
//     url: db,
//     file: (request, file) => {
//         return new Promise((resolve, reject) => {
//             const now = new Date().toISOString();
//             const date = now.replace(/:/g, '-');
//             const filename = date + Path.extname(file.originalname);
//             const fileInfo = {
//                 filename: filename,
//                 bucketName: 'uploads'
//             };
//             resolve(fileInfo);
//         });
//     }
// });
// const upload = multer({ storage });

const connectDB = async () => {
    try {
        let gfs;
        let conn = await mongoose.createConnection(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('db connected');
        conn.once('open', () => {
            //init stream
            gfs = Grid(conn.db, mongoose.mongo);
            gfs.collections('uploads');
        });
    } catch (error) {
        console.error(error);
    }
};

module.exports = connectDB;
