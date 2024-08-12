const httpStatus = require("http-status");
const errorHandler = require("../middlewares/errorHandler");
const { businessService, logService } = require("../services");
const logger = require("../middlewares/logger");

const getBusinesses = async (req, res, next) => {
  try {
    const response = await businessService.getBusinesses(req.query);
    if(!response) return next(errorHandler(400, `Could not get businesses`))
      res.status(httpStatus.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const getBusinessById = async (req, res, next) => {
  try {
    const response = await businessService.getBusinessById(req.params.businessId);
    if(!response) return next(errorHandler(400, `Could not get business with the provided id: ${req.params.businessId}`))
      res.status(httpStatus.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const createNewBusiness = async (req, res, next) => {
  try {
    const response = await businessService.createNewBusiness(req.body, req.user._id);
    if (!response) return next(errorHandler(400, "could not create new business"));
    res.status(httpStatus.OK).json(response);
  } catch (error) {
    next(error);
  }
};


const updateBusiness = async (req, res, next) => {
  try {
    const response = await businessService.updateBusiness(req.body, req.params.businessId, req.user._id);
    if (!response) return next(errorHandler(400, "could not update business"));
    res.status(httpStatus.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const deleteBusiness = async (req, res, next) => {
  try {
    const response = await businessService.deleteBusiness(req.params.businessId, req.user._id, req.role);
    if (!response) return next(errorHandler(400, "could not delete business"));
    res.status(httpStatus.OK).json("Business deleted successfuly!");
  } catch (error) {
    next(error);
  }
};

const removecontact = async (req, res, next) => {
  try {
    const response = await businessService.removecontact(req.params.businessId, req.body.contactEmail);
    if (!response) return next(errorHandler(400, "could not delete contact person"));
    res.status(httpStatus.OK).json("contact person deleted successfuly!");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewBusiness,
  getBusinessById,
  updateBusiness,
  deleteBusiness, 
  getBusinesses,
  removecontact
};
