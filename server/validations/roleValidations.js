const Joi = require("joi");
const { objectId } = require("./custom.validations");


const createRole = {
    body: Joi.object().keys({
        roleName: Joi.string()
            .valid("admin", "trader", "customer")
            .required()
            .trim(),
        // roleId: Joi.number()
        //     .valid(1, 2, 3)
        //     .required(),
        // createdBy: Joi.string()
        //     .required()
        //     .trim(),
        // updatedBy: Joi.string()
        //     .trim(),
        // deletedBy: Joi.string()
        //     .trim(),
        // isDeleted: Joi.boolean()
    })
};

const updateRole = {
    params: Joi.object().keys({
         roleId: objectId().required()
    }),
    body: Joi.object().keys({
        roleName: Joi.string()
            .valid("admin", "trader", "customer")
            .trim(),
        updatedBy: Joi.string()
            .trim(),
        deletedBy: Joi.string()
            .trim(),
        isDeleted: Joi.boolean()
    })
};

const deleteRole = {
    params: Joi.object().keys({
        roleId: objectId().required()
    })
};

module.exports = {
    createRole,
    updateRole,
    deleteRole
};
