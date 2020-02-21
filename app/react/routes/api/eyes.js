const express = require('express');
const router = express.Router();

const Info = require('../../models/Info');

//should be request from /api/eyes
router.get('/', async (request, response) => {
    console.log(`get /api targeted and running`);
    // debugger;
    try {
        //find all eyes stored
        const infoData = await Info.find();
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

router.post('/upload', async (request, response) => {
    console.log(`post request received at: /upload`);
    console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
    // request body looks like
    // {
    //      pic: 'baseuri:/ablkasdjfalsdfioajsfklasdf...,
    //      info: {
    //          latitude: 28.24898,
    //          longitude: -82.24898,...
    //      }
    // }
    try {
        const { body } = request;
        console.log(body);
        const newInfo = new Info({ ...body });
        const info = await newInfo.save();
        response.send(`new Eye has been saved! :^]`).send(info);
    } catch (error) {
        console.error(error.message);
        response
            .status(500)
            .send(`Server Error: body sent resulted in: ${body}`);
    }
});

module.exports = router;
