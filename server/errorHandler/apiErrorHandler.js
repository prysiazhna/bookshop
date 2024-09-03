class ApiErrorHandler extends Error{
    constructor(status, message) {
        super(message);
        this.status = status;
    }

    static badRequest(message) {
        return new ApiErrorHandler(400, message);
    }

    static internal(message) {
        return new ApiErrorHandler(500, message);
    }

    static forbidden(message) {
        return new ApiErrorHandler(403, message);
    }
    static notFound(message) {
        return new ApiErrorHandler(404, message);
    }
}

module.exports = ApiErrorHandler;