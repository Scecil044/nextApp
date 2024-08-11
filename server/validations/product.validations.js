const Joi = require("joi");
const { objectId } = require("./custom.validations");

const createProduct = {
    body: Joi.object().keys({

    })
};

const getProduct = {
    params: Joi.object().keys({
        productId: objectId().required()
    })
};

const updateProduct = {
    params: Joi.object().keys({
        productId: objectId().required()
    })
};

const deleteProduct = {
    params: Joi.object().keys({
        productId: objectId().required()
    })
};

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getProduct
};
