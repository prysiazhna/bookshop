const jwt = require('jsonwebtoken');
const ApiErrorHandler = require('../errorHandler/ApiErrorHandler');

function verifyToken(req, res, next) {
    if (req.method === "OPTIONS") {
        return next();
    }

    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return next(ApiErrorHandler.forbidden('Unauthorized'));
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        return next();
    } catch (e) {
        return next(ApiErrorHandler.forbidden('Unauthorized'));
    }
}

module.exports = {
    verifyToken,
    checkRole: function (role) {
        return function (req, res, next) {
            verifyToken(req, res, function () {
                if(!req.user?.role){
                    return next(ApiErrorHandler.forbidden('Unauthorized'));
                }
                if (req.user.role !== role) {
                    return next(ApiErrorHandler.forbidden('Access denied'));
                }
                next();
            });
        };
    }
};
