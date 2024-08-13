const he = require("he");

const errorHandler = (statusCode, message) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = he.decode(message);
    error.message = message.replace(/(\"\s?)/g,' ');

    return error;
}

module.exports = errorHandler;