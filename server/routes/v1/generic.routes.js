const express = require("express")
const validate = require("../../middlewares/validate")
const { genericValidations } = require("../../validations")
const { genericController } = require("../../controllers")



const router = express.Router()

router.get("/filter", validate(genericValidations.genericAppFilter), genericController.genericFilter);

module.exports = router