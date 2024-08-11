const Joi = require("joi");
const mongoose = require("mongoose");

const objectId = () => Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('Invalid ObjectId');
    }
    return value;
}, 'ObjectId validation');

// Export the custom validation function
module.exports = {
    objectId
};
