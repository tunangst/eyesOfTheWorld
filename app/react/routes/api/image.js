const express = require('express');
const router = express.Router();

const upload = require('../../config/multerImageUpload');
const singleUpload = upload.single('insertedImg');

router.post('/', async (request, response) => {
    singleUpload(request, response, error => {
        // console.log(error, 'image error');
        error &&
            console.log(error.message) &&
            response.json({ msg: error.message });
        return response.json({ imageUrl: request.file.location });
    });
});

module.exports = router;
