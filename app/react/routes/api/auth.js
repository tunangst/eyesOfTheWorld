const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authMiddleware = require('../../config/authMiddleware');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

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
                id: user.id
            }
        };
        jwt.sign(
            payload,
            config.get('jwtSecret'),
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
