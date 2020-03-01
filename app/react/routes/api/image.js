const express = require('express');
const router = express.Router();

const upload = require('../../config/multerImageUpload');
const singleUpload = upload.single('insertedImg');

router.post('/', async (request, response) => {
    singleUpload(request, response, error => {
        // console.log(request);
        // return response.json({ imageUrl: 'request.file.location' });
        // console.log(request.file);
        // console.log(request.file + `   request.file ~~~~~~~~~~~~~`);
        // console.log(request.file);
        error && console.log(error.message);
        return response.json({ imageUrl: request.file.location });
    });
});

module.exports = router;
