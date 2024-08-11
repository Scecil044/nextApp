const errorHandler = require("./errorHandler");

const validate = (schema) => (req, res, next) => {
    const { error } = schema.body ? schema.body.validate(req.body) : { error: null };
    const paramError = schema.params ? schema.params.validate(req.params).error : null;

    if (error || paramError) {
        // Use the errorHandler to create a consistent error object
        return next(errorHandler(400, error?.details[0].message || paramError.details[0].message));
    }
    next();
};

module.exports = validate;

