const rateLimit = require("express-rate-limit");

// Rate limit for authentication routes
const authLimit = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 15, // Limit each IP to 15 requests per `windowMs`
    skipSuccessfulRequests: true // Skip counting successful requests
});

// Rate limit for file upload routes
const uploadLimit = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 15, // Limit each IP to 15 requests per `windowMs`
    skipSuccessfulRequests: true // Skip counting successful requests
});

// Rate limit for common routes
const commonLimit = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 15, // Limit each IP to 15 requests per `windowMs`
    skipSuccessfulRequests: true // Skip counting successful requests
});

module.exports = {
    commonLimit,
    authLimit,
    uploadLimit
};
