const httpStatus = require("http-status");
const errorHandler = require("../middlewares/errorHandler");
const { userService, logService } = require("../services");
const logger = require("../middlewares/logger");
// function to get user by id
const getUserById = async(req,res,next)=>{
  try {
    const response = await userService.getUserById(req.params.userId);
    if (!response) return next(errorHandler(400, "could not get user by the provided id"));

    res.status(httpStatus.OK).json(response);
  } catch (error) {
    next(error);
  }
}

const updateUser = async (req, res, next) => {
  try {
    const response = await userService.updateUser(req.body, req.user._id);
    if (!response) return next(errorHandler(400, "could not update user"));

    res.status(httpStatus.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const getUsers = async(req, res,next)=>{
  try {
    const response = await userService.getUsers(req.query);
    if (!response) return next(errorHandler(400, "could not list system users"));

    res.status(httpStatus.OK).json(response);
  } catch (error) {
    next(error)
  }
}

const deleteUser = async(req, res,next)=>{
  try {
    const response = await userService.deleteUser(req.params.userId);
    if(!response) return next(errorHandler(httpStatus.BAD_REQUEST, "Could not delete user"));
    res.status(httpStatus.OK).json("User deleted!")
  } catch (error) {
    next(error);
  }
}

module.exports = {
  updateUser,
  getUserById,
  getUsers,
  deleteUser
};
