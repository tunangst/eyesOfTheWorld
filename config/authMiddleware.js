const jwt = require('jsonwebtoken');
const config = require('config');
let secret;
if (config.util.getEnv('NODE_ENV') === 'development') {
    secret = config.get('mongoURI');
}

module.exports = function (request, response, next) {
    const token = request.header('x-auth-token');
    if (!token) {
        return response
            .status(401)
            .json({ msg: 'No token, authorization denied' });
    }
    try {
        console.log(process.env.JWTSECRET);
        const secret = process.env.JWTSECRET || secret;
        const decoded = jwt.verify(token, secret);

        request.user = decoded.user;
        next();
    } catch (error) {
        response.status(401).json({ msg: 'Token is not valid' });
    }
};
