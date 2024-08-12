const express = require("express");
const validate = require("../../middlewares/validate");
const { verifyToken } = require("../../services/token.service");
const { logController } = require("../../controllers");
const { logValidations } = require("../../validations");


const router = express();

router.get("/", verifyToken, logController.getLogs);
router.get("/:logId", verifyToken,validate(logValidations.getLogById), logController.getLogById);

module.exports = router