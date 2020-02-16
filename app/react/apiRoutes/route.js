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

router.post('/upload', async (request, response) => {
    console.log(`post request received at: /upload`);
    console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
    try {
        const { body } = request;
        console.log(body);
        const newInfo = new Info({ ...body });
        const info = await newInfo.save();
        response.json(info);
    } catch (error) {
        console.error(error.message);
        response
            .status(500)
            .send(`Server Error: body sent resulted in: ${body}`);
    }
});

module.exports = router;

// export const register = obj => async dispatch => {
//     const { name, email, password } = obj;

//     const config = {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     };

//     const body = JSON.stringify({ name, email, password });

//     try {
//         const res = await axios.post('/api/users', body, config);
//         dispatch({ type: CLEAR_PROFILE });
//         dispatch({
//             type: REGISTER_SUCCESS,
//             payload: res.data
//         });
//         dispatch(loadUser());

//     } catch (err) {
