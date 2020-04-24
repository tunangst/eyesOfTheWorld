const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');

let secret;

if (config.util.getEnv('NODE_ENV') === 'development') {
    secret = config.get('jwtSecret');
}
// /api/user
router.get('/', async (request, response) => {
    try {
        //find all eyes stored
        const infoData = await Eye.find();

        response.json(infoData);
    } catch (error) {
        console.error(error.message);
        response.status(500).send('Server Error');
    }
});
router.post('/', async (request, response) => {
    // console.log('post received at /api/user');
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
            avatar,
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        // console.log(user);
        await user.save();
        const payload = {
            user: {
                id: user.id,
            },
        };
        // console.log(process.env.jwtSecret, 'jwtSecret env');
        jwt.sign(
            payload,
            process.env.JWTSECRET || secret,
            { expiresIn: 360000 },
            (err, token) => {
                // console.log(token, 'token');
                if (err) throw err;
                response.json({ token });
            }
        );
    } catch (error) {
        // console.log('error in user after token');
        console.error(error.message);
    }
});
//  /api/user/:userId
router.get('/:userId', async (request, response) => {
    const userId = request.params.userId;
    try {
        const user = await User.findOne({ _id: userId });
        response.json(user);
    } catch (error) {
        console.log(error);
    }
});

router.put('/:userId', async (request, response) => {
    const { username, oldPassword, newPassword, avatar } = request.body;
    const userId = request.params.userId;
    try {
        let user = await User.findOne({ _id: userId });
        // make sure user does exist
        if (!user) {
            return response.status(400).json({ msg: 'Invalid Credentials' });
        }
        //make sure password matches the saved password
        if (newPassword) {
            if (!isMatch) {
                return response
                    .status(400)
                    .json({ msg: 'Invalid Credentials or incorrect password' });
            }
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }
        if (username) {
            user.username = username;
        }
        if (avatar) {
            user.avatar = avatar;
        }

        await user.save();
        response.send({ msg: 'Profile Update Successful', user: user });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
