const ApiErrorHandler = require('../errorHandler/ApiErrorHandler');

module.exports = function (err, req, res, next) {
    console.log(err, err instanceof  ApiErrorHandler)
    if (err instanceof ApiErrorHandler) {
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: "Something went wrong!"})
}
