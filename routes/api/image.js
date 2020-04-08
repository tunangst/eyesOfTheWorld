const cloudinary = require('cloudinary');
const express = require('express');
const router = express.Router();

// const aws = require('aws-sdk');
const config = require('config');
const cloudinaryCloudName = config.get('cloudinaryCloudName');
const cloudinaryKey = config.get('cloudinaryKey');
const cloudinarySecret = config.get('cloudinarySecret');
// const secretKey = config.get('secretAccessKey');
// const accessKey = config.get('accessKeyId');
// const region = config.get('region');
// const bucket = config.get('AWSBucketName');

// aws.config.update({
//     secretAccessKey: secretKey,
//     accessKeyId: accessKey,
//     region: region
// });
// const s3 = new aws.S3();

const upload = require('../../config/multerImageUpload');
const singleUpload = upload.single('insertedImg');
cloudinary.config({
    cloud_name: cloudinaryCloudName,
    api_key: cloudinaryKey,
    api_secret: cloudinarySecret
});

//api/image/:directoryName
router.post('/:directoryName', async (request, response) => {
    singleUpload(request, response, error => {
        error &&
            console.log(error.message) &&
            response.json({ msg: error.message });
        console.log(request.file);
        console.log('image post where singleUpload is called');
        console.log(request.file.secure_url);
        return response.json({ imageUrl: request.file.secure_url });
    });
    console.log('single Upload finished');
});

// https://res.cloudinary.com/truz/image/upload/v1586044401/EyesOfTheWorld/trunangst%40gmail.com/2020%7E04%7E04%7E%7E%7E%7EBarnacleese.jpg.jpg

// api/image/:public_id
router.delete('/:userEmail/:public_id', async (request, response) => {
    const userEmail = request.params.userEmail;
    console.log(userEmail);
    const public_id = `EyesOfTheWorld/${userEmail}/${request.params.public_id}.jpg`;
    console.log(public_id);
    console.log(`^^^^^^^^^^^^^^^^^^^delete params^^^^^^^^^^^^^^`);

    try {
        cloudinary.api.delete_resources(public_id, function(error, result) {
            response.json({ msg: 'image Deleted :^{', type: 'success' });
        });
    } catch (error) {
        console.log(error.message);
        response.json({ msg: error.message, type: 'error' });
    }
});

module.exports = router;