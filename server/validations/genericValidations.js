const Joi = require("joi");
const {objectId} = require("./custom.validations")

const genericAppFilter = {
    body:Joi.object().keys(({
        module:Joi.string().required()
    }))
}


module.exports = {
    genericAppFilter
}