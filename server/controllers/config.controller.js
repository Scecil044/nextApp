const httpStatus = require("http-status");
const errorHandler = require("../middlewares/errorHandler");
const logger = require("../middlewares/logger");
const { logService, configService } = require("../services");

const getSystemConfigurations = async (req, res, next) => {
  try {
    const response = await configService.getSystemConfigs(req.query);
    if (!response) return next(errorHandler(httpStatus.BAD_REQUEST, "Could not get system configurations"));

    res.status(httpStatus.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const addConfiguration = async (req, res, next) => {
  try {
    const response = await configService.createNewConfig(req.body, req.user._id);
    if (!response) return next(errorHandler(httpStatus.BAD_REQUEST, "Could not create new configuration"));

    res.status(httpStatus.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const updateConfiguration = async (req, res, next) => {
  try {
    const response = await configService.updateConfiguration(req.params.configId, req.body, req.user._id);
    if (!response) return next(errorHandler(httpStatus.BAD_REQUEST), "could not update role");

    res.status(httpStatus.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const deleteConfiguration = async (req, res, next) => {
  try {
    const response = await configService.deleteConfigByConfigId(req.params.configId, req.user._id);
    if (!response) return next(errorHandler(httpStatus.BAD_REQUEST), "could not update role");

    res.status(httpStatus.OK).json("Configuration successfuly deleted!");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addConfiguration,
  getSystemConfigurations,
  updateConfiguration,
  deleteConfiguration
};
