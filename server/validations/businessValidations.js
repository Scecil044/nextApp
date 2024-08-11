const Joi = require("joi");
const { objectId } = require("./custom.validations");


const getBusinessById = {
    params:Joi.object().keys({
        businessId:objectId().required()
    })
}

const updateBusiness = {
    params:Joi.object().keys({
        businessId:objectId().required()
    }),
    body:Joi.object().keys({
        contact_persons:Joi.array().items(
            Joi.object({
                firstName: Joi.string().allow(""),
                lastName: Joi.string().allow(""),
                email: Joi.string().email().allow(""),
                phoneNumber: Joi.string().allow(""),
              })
        ),
        location:Joi.object({
            address: Joi.string().allow(""),
            town: Joi.string().allow(""),
            street: Joi.string().allow(""),
            building: Joi.string().allow(""),
            country: Joi.string().default("Kenya").allow(""),
        }).default(),
        metaData: Joi.object({
            phone: Joi.string().allow(""),
            email: Joi.string().email().allow(""),
            category: Joi.string().allow(""),
          }).default(),
        name: Joi.string().trim(),
        logo: Joi.string().trim().allow(""),
    })
}

const deleteBusiness = {
    params:Joi.object().keys({
        businessId:objectId().required()
    })
}
const removecontact = {
    params:Joi.object().keys({
        businessId:objectId().required()
    }),
    body:Joi.object().keys({
        contactEmail:Joi.string().email().required(),
    })
}

const createBusiness = {
    body:Joi.object().keys({
        owner:objectId().required(),
        contact_persons:Joi.array().items(
            Joi.object({
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                email: Joi.string().email().required(),
                phoneNumber: Joi.string().required(),
              })
        ),
        location:Joi.object({
            address: Joi.string().allow(""),
            town: Joi.string().allow(""),
            street: Joi.string().allow(""),
            building: Joi.string().allow(""),
            country: Joi.string().default("Kenya"),
        }).default(),
        metaData: Joi.object({
            phone: Joi.string().allow(""),
            email: Joi.string().email().allow(""),
            category: Joi.string().allow(""),
          }).default(),
        name: Joi.string().required().trim(),
        logo: Joi.string().trim().allow(""),
    })
}



module.exports = {
    getBusinessById,
    updateBusiness,
    deleteBusiness,
    createBusiness,
    removecontact
}