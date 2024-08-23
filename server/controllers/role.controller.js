const httpStatus = require("http-status");
const errorHandler = require("../middlewares/errorHandler");
const { roleService, logService } = require("../services");
const logger = require("../middlewares/logger");

const createRole = async (req, res, next) => {
  try {
    const response = await roleService.createRole(req.body);
    if (!response) return next(errorHandler(400, "Could not create role"));
    res.status(httpStatus.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const getRoles = async (req, res, next) => {
  try {
    const response = await roleService.getRoles(req.query);
    if (!response) return next(errorHandler(400, "Could not create role"));
    res.status(httpStatus.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const getRoleById = async (req, res, next) => {
  try {
    const response = await roleService.getRoleById(req.params.roleId);
    if (!response) return next(errorHandler(400, "Could not get role"));
    res.status(httpStatus.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const updateRole = async (req, res, next) => {
  try {
    const response = await roleService.updateRole(req.params.roleId, req.body);
    if (!response) return next(errorHandler(400, "Could not get role"));
    res.status(httpStatus.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const deleteRole = async (req, res, next) => {
  try {
    const response = await roleService.deleteRole(req.params.roleId);
    if (!response) return next(errorHandler(400, "Could not delete role"));
    res.status(httpStatus.OK).json("Role deleted successfully!");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole
};
