const express = require("express");
const { authController } = require("../../controllers");
const validate = require("../../middlewares/validate");
const { authValidations } = require("../../validations");
const { authLimit } = require("../../middlewares/rateLimitter")

const router = express.Router();

router.post("/",validate(authValidations.registerUser), authController.createUser);
router.post("/login", authLimit, validate(authValidations.login), authController.validateLogin);
router.post("/refresh", validate(authValidations.refreshTokens), authController.refreshToken);
router.post("/forgot/password",validate(authValidations.forgotPassword), authController.forgotPassword);

module.exports = router;