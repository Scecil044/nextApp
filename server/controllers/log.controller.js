const httpStatus = require("http-status");
const { logService } = require("../services");
const errorHandler = require("../middlewares/errorHandler");

const getLogs = async (req, res, next) => {
  try {
    const response = await logService.getLogs(req.query, req.role.roleName);
    if (!response) return next(errorHandler(400, `Could not get system logs`));
    res.status(httpStatus.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const getLogById = async (req, res, next) => {
  try {
    const response = await logService.getLogById(req.params.logId);
    if (!response) return next(errorHandler(400, `Could not get log by provided id ${req.params.logId}`));
    res.status(httpStatus.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const updateLog = async (req, res, next) => {
  try {
    const response = await logService.updateLog(req.body, req.params.logId, req.user._id);
    if (!response) return next(errorHandler(400, `Could not update log by provided id ${req.params.logId}`));
    res.status(httpStatus.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const deleteLog = async (req, res, next) => {
  try {
    const response = await logService.deleteLog(req.params.logId);
    if (!response) return next(errorHandler(400, `Could not delete log by provided id ${req.params.logId}`));
    res.status(httpStatus.OK).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLogs,
  getLogById,
  deleteLog,
  updateLog
};
