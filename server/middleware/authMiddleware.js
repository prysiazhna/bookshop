const jwt = require('jsonwebtoken');
const ApiErrorHandler = require('../errorHandler/ApiErrorHandler');

function verifyToken(req, res, next) {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return next(ApiErrorHandler.forbidden('Unauthorized: No token provided'));
        }

        req.user = jwt.verify(token, process.env.SECRET_KEY);
        return next();
    } catch (error) {
        return next(ApiErrorHandler.forbidden('Unauthorized: Invalid token'));
    }
}

module.exports = { verifyToken };
