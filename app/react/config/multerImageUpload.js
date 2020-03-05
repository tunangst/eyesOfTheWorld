const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('config');
const secretKey = config.get('secretAccessKey');
const accessKey = config.get('accessKeyId');
const region = config.get('region');
const bucket = config.get('AWSBucketName');

aws.config.update({
    secretAccessKey: secretKey,
    accessKeyId: accessKey,
    region: region
});
const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const multerS3Storage = multerS3({
    s3: s3,
    bucket: bucket,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function(req, file, cb) {
        // console.log(file);
        // cb(null, { fieldName: 'testing_meta_data' });
        cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
        cb(
            null,
            new Date()
                .toISOString()
                .slice(0, 10)
                .replace(/-/g, '~') +
                '~~~~' +
                file.originalname
        );
    }
});

const upload = multer({
    storage: multerS3Storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 20 // 20MB
    }
});

module.exports = upload;
