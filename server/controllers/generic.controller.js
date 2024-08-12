const httpStatus = require("http-status");
const errorHandler = require("../middlewares/errorHandler");
const { genericService, logService } = require("../services");
const logger = require("../middlewares/logger");

const genericFilter = async(req, res,next)=>{
    try {
        const response = await genericService.genericFilter(req.query, req.body);
        if(!response) return next(errorHandler(httpStatus.BAD_REQUEST), `Could not complete filter from ${req.body.module}`)

        res.status(httpStatus.OK).json(response);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    genericFilter
}