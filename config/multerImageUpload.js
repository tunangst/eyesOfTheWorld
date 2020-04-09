// const aws = require('aws-sdk');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
// const multerS3 = require('multer-s3');
const config = require('config');

let cloudinaryCloudName;
let cloudinaryKey;
let cloudinarySecret;

if (config.util.getEnv('NODE_ENV') === 'development') {
    cloudinaryCloudName = config.get('cloudinaryCloudName');
    cloudinaryKey = config.get('cloudinaryKey');
    cloudinarySecret = config.get('cloudinarySecret');
}

// const secretKey = config.get('secretAccessKey');
// const accessKey = config.get('accessKeyId');
// const region = config.get('region');
// const s3Bucket = config.get('AWSBucketName');

// aws.config.update({
//     secretAccessKey: secretKey,
//     accessKeyId: accessKey,
//     region: region
// });
// const s3 = new aws.S3();
// console.log(process.env);
// console.log('process.env');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || cloudinaryCloudName,
    api_key: process.env.CLOUDINARY_KEY || cloudinaryKey,
    api_secret: process.env.CLOUDINARY_SECRET || cloudinarySecret,
});

console.log(process.env.CLOUDINARY_CLOUD_NAME, 'cloudname');
console.log(process.env.CLOUDINARY_KEY, 'key');
console.log(process.env.CLOUDINARY_SECRET, 'secret');

const fileFilter = (req, file, cb) => {
    console.log(file, 'fileFilter');
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// const multerS3Storage = multerS3({
//     s3: s3,
//     bucket: function(req, file, cb) {
//         console.log('inside bucketname !!!!!!!!!!!!!!!!!!!!!!!!!!');
//         const bucketName = `${s3Bucket}/${req.params.bucketId}` || s3Bucket;
//         console.log(bucketName);
//         console.log(file);
//         // let bucketName = s3Bucket;

//         console.log(`multer storage file`);

//         cb(null, bucketName);
//     },
//     acl: 'public-read',
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     metadata: function(req, file, cb) {
//         console.log(file.fieldname);
//         // console.log(req);
//         // console.log(file);
//         // cb(null, { fieldName: 'testing_meta_data' });
//         cb(null, { fieldName: file.fieldname });
//     },
//     key: function(req, file, cb) {
//         cb(
//             null,
//             new Date()
//                 .toISOString()
//                 .slice(0, 10)
//                 .replace(/-/g, '~') +
//                 '~~~~' +
//                 file.originalname
//         );
//     }
// });
const multerCloudinaryStorage = cloudinaryStorage({
    cloudinary: cloudinary,
    // folder: 'EyesOfTheWorld',
    allowedFormats: ['jpg'],
    folder: function (req, file, cb) {
        console.log('inside folder !!!!!!!!!!!!!!!!!!!!!!!!!!');
        const folderName =
            `EyesOfTheWorld/${req.params.directoryName}` ||
            'EyesOfTheWorld/defaulted';
        console.log(folderName);
        console.log(file);

        console.log(`multer storage file`);
        cb(null, `EyesOfTheWorld/${req.params.directoryName}`);
    },
    filename: function (req, file, cb) {
        cb(
            null,
            new Date().toISOString().slice(0, 10).replace(/-/g, '~') +
                '~~~~' +
                file.originalname
        );
    },
});

// const upload = multer({
//     storage: multerS3Storage,
//     fileFilter: fileFilter,
//     limits: {
//         fileSize: 1024 * 1024 * 20 // 20MB
//     }
// });
const upload = multer({
    storage: multerCloudinaryStorage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 20, // 20MB
    },
});

module.exports = upload;
