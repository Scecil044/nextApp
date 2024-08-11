const Joi = require("joi")
const { objectId } = require("./custom.validations")

const getUser = {
    params: Joi.object().keys({
        userId: objectId().required(),
    })
}

const deleteUser = {
    params: Joi.object().keys({
        userId:objectId().required()
    })
}

const updateUser = {
    params: Joi.object().keys({
        userId: objectId().required()
    }),
    body: Joi.object().keys({
        firstName: Joi.string(),
        lastName: Joi.string(),
        middleName: Joi.string().allow("",'',null),
        email:Joi.string(),
        phoneNumber:Joi.string(),
        image_url:Joi.string(),
        contactPerson: Joi.object({
            phoneNumber: Joi.string().trim().allow('', null),
            email: Joi.string().email().allow('', null),
            firstName: Joi.string().trim().allow('', null),
            lastName: Joi.string().trim().allow('', null),
            middleName: Joi.string().trim().allow('', null)
        }).default({
            phoneNumber: "",
            email: "",
            firstName: "",
            lastName: "",
            middleName: ""
        }),
        personal: Joi.object({
            gender: Joi.string().trim().allow('', null),
            age: Joi.string().trim().allow('', null),
            dateOfBirth: Joi.string().trim().allow('', null)
        }).default({
            gender: "",
            age: "",
            dateOfBirth: ""
        }),
        address: Joi.object({
            town: Joi.string().trim().allow('', null),
            county: Joi.string().trim().allow('', null),
            building: Joi.string().trim().allow('', null),
            closestLandMark: Joi.string().trim().allow('', null)
        }).default({
            town: "",
            county: "",
            building: "",
            closestLandMark: ""
        }),
    }),
}

module.exports = {
    deleteUser,
    updateUser,
    getUser
}