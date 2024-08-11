const httpStatus = require("http-status");
const errorHandler = require("../middlewares/errorHandler");

const { authService, tokenService } = require("../services");

/**
 * This is the login function
 * Expects all user data marked as required in user model
 */
const validateLogin = async(req, res,next) =>{
   try {
    const response = await authService.validateLogin(req.body);
    if(!response) return next(errorHandler(400, `An error was encountered when attempting to validate auth credentials. Reload this page and give it a second try`));
    res.status(httpStatus.OK).json(response);
   } catch (error) {
    next(error);
   }
}

/**
 * Function to register new users
 * validations in this function are handled by auth validations.js
 */
const createUser = async(req, res,next) => {
    try {
        const response = await authService.createUser(req.body);
        if(!response) return next(errorHandler(400, "Could not create user!"))
        res.status(httpStatus.OK).json(response);
    } catch (error) {
        console.log(error);
        next(error);
    }
}


const refreshToken = async(req,res,next)=>{
    try {
        const tokens = await authService.refreshToken(req.body.refreshToken);
        if(!tokens) return next(errorHandler(400,  "Could not refresh token"));
        res.status(httpStatus.OK).json(tokens);
    } catch (error) {
        next(error);
    }
}

const logout = async() =>{

}

const forgotPassword = async(req, res,next)=>{
    try {
        const resetToken = await tokenService.generatePasswordResetToken(req.body.email);
        // send email
        res.status(200).json(`A reset email has been sent to ${req.body.email}`)
    } catch (error) {
        next(error)
    }
}

const resetPassword = async(req, res,next)=>{
    try {
        await authService.resetPassword(req.body.password, req.query.token);
        res.status(httpStatus.NO_CONTENT).send();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    validateLogin,
    logout,
    createUser,
    refreshToken,
    forgotPassword,
    resetPassword
}