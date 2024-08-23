const Joi = require("joi");
const { objectId } = require("./custom.validations");

const createConfiguration = {
  body: Joi.object().keys({
    mailTrap: Joi.object()
      .keys({
        trap: Joi.boolean().default(true),
        toEmails: Joi.array()
          .items(Joi.string().email())
          .default(["scecil072@gmail.com"]),
        ccEmails: Joi.array()
          .items(Joi.string().email())
          .default([])
      })
      .default({
        trap: true,
        toEmails: ["scecil072@gmail.com"],
        ccEmails: []
      }),
    productCategories: Joi.array().items(Joi.string()),
    isDeleted: Joi.boolean().default(false),
    createdBy: Joi.string().custom(objectId),
    updatedBy: Joi.string().custom(objectId),
    deletedBy: Joi.string().custom(objectId)
  })
};

const updateConfiguration = {
  params: Joi.object().keys({
    configId: objectId().required()
  }),
  body: Joi.object().keys({
    mailTrap: Joi.object().keys({
      trap: Joi.boolean().default(true),
      toEmails: Joi.array().items(Joi.string().email()),
      ccEmails: Joi.array().items(Joi.string().email())
    }),
    productCategories: Joi.array().items(Joi.string())
  })
};

const deleteConfiguration = {
  params: Joi.object().keys({
    configId: objectId().required()
  })
};

module.exports = {
  createConfiguration,
  updateConfiguration,
  deleteConfiguration
};
