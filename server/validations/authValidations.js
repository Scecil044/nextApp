const Joi = require("joi");

const emailSchema = Joi.string().email().required().trim();
const passwordSchema = Joi.string().min(6).required();
const nameSchema = Joi.string().min(1).max(50).required();

const registerUser = {
    body: Joi.object({
        email: emailSchema,
        firstName: nameSchema.messages({
            'string.empty': 'First name field is required',
            'any.required': 'First name field is required'
        }),
        lastName: nameSchema.messages({
            'string.empty': 'Last name field is required',
            'any.required': 'Last name field is required'
        }),
        password: passwordSchema,
        confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
            'any.only': 'Passwords do not match',
            'any.required': 'Confirm password is required'
        }),
        middleName:Joi.string().allow('').optional(),
        role:Joi.string().valid("admin", "trader", "customer").required().trim()
    })
};

const login = {
    body: Joi.object().keys({
        email:emailSchema,
        password: Joi.string().required()
    })
}

const refreshTokens = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required()
    })
}

const forgotPassword = {
    body: Joi.object().keys({
        email:emailSchema,
    })
}
module.exports = {
    registerUser,
    login,
    refreshTokens,
    forgotPassword
};
