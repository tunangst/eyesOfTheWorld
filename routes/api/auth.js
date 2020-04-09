const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authMiddleware = require('../../config/authMiddleware');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

let secret;
if (config.util.getEnv('NODE_ENV') === 'development') {
    secret = config.get('jwtSecret');
}

// api/auth
router.get('/', authMiddleware, async (request, response) => {
    try {
        const user = await User.findById(request.user.id).select('-password');
        response.json(user);
    } catch (error) {
        console.log(error);
    }
});

router.post('/', async (request, response) => {
    const { email, password } = request.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return response.status(400).json({ msg: 'Invalid Credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return response.status(400).json({ msg: 'Invalid Credentials' });
        }
        const payload = {
            user: {
                id: user.id,
            },
        };
        // console.log(process.env.JWTSECRET, 'jwtSecret env');
        jwt.sign(
            payload,
            process.env.JWTSECRET || secret,
            { expiresIn: 360000 },
            (error, token) => {
                if (error) throw error;
                response.json({ token });
            }
        );
    } catch (error) {
        console.error(error.message);
        response.status(500).send('Server error');
    }
});

module.exports = router;
