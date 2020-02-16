const express = require('express');
const router = express.Router();
// import express from 'express';
// const auth = require('../../middleware/auth');
// const { check, validationResult } = require('express-validator');

// const Profile = require('../../models/Profile');
// const User = require('../../models/User');
// import Info from '../models/Info';
const Info = require('../models/Info');

router.get('/', async (request, response) => {
    try {
        //find all eyes stored
        const info = await NodeList.find();
        //load google maps location request for everything

        //send the res back
    } catch (error) {
        console.error(err.message);
        response.status(500).send('Server Error');
    }
});

module.exports = router;
