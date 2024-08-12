const Joi = require("joi");
const { objectId } = require("./custom.validations");

const getLogById={
    params:objectId()
}


module.exports = {
    getLogById
}