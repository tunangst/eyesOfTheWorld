const express = require('express');
const router = express.Router();

const aws = require('aws-sdk');
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

const upload = require('../../config/multerImageUpload');
const singleUpload = upload.single('insertedImg');

router.post('/:bucketId', async (request, response) => {
    console.log('image post where singleUpload is called');
    singleUpload(request, response, error => {
        error &&
            console.log(error.message) &&
            response.json({ msg: error.message });
        return response.json({ imageUrl: request.file.location });
    });
});

// api/image/:keyName
router.delete('/:userEmail/:keyName', async (request, response) => {
    const userEmail = request.params.userEmail;
    console.log(userEmail);
    const key = `${request.params.keyName}.jpg`;
    console.log(`^^^^^^^^^^^^^^^^^^^delete params^^^^^^^^^^^^^^`);

    try {
        const params = {
            Bucket: bucket,
            Delete: {
                Objects: [{ Key: `${userEmail}/${key}` }]
            }
        };

        s3.deleteObjects(params, function(err, data) {
            if (err) {
                // an error occurred
                response.status(500).json({
                    msg: 'Server Error, Eye failed to remove',
                    type: 'error'
                });
            }
            response
                .status(200)
                .json({ msg: 'Image removed ;^[', type: 'success' });
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send(error.message);
    }
});

module.exports = router;
