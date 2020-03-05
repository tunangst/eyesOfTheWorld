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

const deleteImg = url => {
    console.log(`((((((((((((()((((((((((()))))((()))))))))))))))))))))`);
    const split = url.split('.com/');
    const key = split[split.length - 1];
    console.log(key);
    s3.deleteObject(
        {
            Bucket: bucket,
            Key: key
        },
        // {
        //     Bucket: bucket,
        //     Key: 'some/eyesontheworld-image-uploads/' + key'
        // },
        function(err, data) {
            if (err) console.error(err.message);

            console.log(data);
        }
    );
};

module.exports = deleteImg;

// s3://eyesontheworld-image-uploads/2020-03-05T21:42:58.037Z_,-^-,_cycling.jpg
