const errorHandler = require("../middlewares/errorHandler");
const { productService, logService } = require("../services");
const logger = require("../middlewares/logger");

const getProducts = async (req, res, next) => {
    try {
      const response = await productService.getProducts(req.body, req.user._id);
      if(!response) return next(errorHandler(400, "could not create new product"));
      res.status(httpStatus.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

const createNewProduct = async (req, res, next) => {
    try {
      const response = await productService.createNewProduct(req.body, req.user._id);
      if(!response) return next(errorHandler(400, "could not create new product"));
      res.status(httpStatus.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  const getProductById = async (req, res, next) => {
    try {
      const response = await productService.getProductById(req.body, req.user._id);
      if(!response) return next(errorHandler(400, "could not create new product"));
      res.status(httpStatus.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  const updateProduct = async (req, res, next) => {
    try {
      const response = await productService.updateProduct(req.body, req.user._id);
      if(!response) return next(errorHandler(400, "could not create new product"));
      res.status(httpStatus.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  const deleteProduct = async (req, res, next) => {
    try {
      const response = await productService.deleteProduct(req.body, req.user._id);
      if(!response) return next(errorHandler(400, "could not create new product"));
      res.status(httpStatus.OK).json(response);
    } catch (error) {
      next(error);
    }
  };


module.exports = {
    createNewProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    getProducts
}