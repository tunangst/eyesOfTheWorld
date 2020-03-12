const express = require('express');
const router = express.Router();
const moment = require('moment');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');

// const Eye = require('../../models/Eye');

// /api/user
router.get('/', async (request, response) => {
    console.log(`get /api targeted and running`);
    // debugger;
    try {
        //find all eyes stored
        const infoData = await Eye.find();
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

router.post('/', async (request, response) => {
    console.log('post received at /api/user');
    const { username, email, password, avatar } = request.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            response.status(400).json({ msg: 'User already exists' });
        }
        user = new User({
            username,
            email,
            password,
            avatar
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        console.log(user);
        await user.save();
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                console.log(token, 'token');
                if (err) throw err;
                response.json({ token });
            }
        );
    } catch (error) {
        console.log('error in user after token');
        console.error(error.message);
    }
});

module.exports = router;
