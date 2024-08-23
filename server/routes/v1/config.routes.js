const express = require("express");
const { configController } = require("../../controllers");
const verifyToken = require("../../middlewares/verifyToken")
const validate = require("../../middlewares/validate");
const checkRole = require("../../middlewares/roleValidator");
const { configValidations } = require("../../validations");

const router = express.Router();

router
  .route("/")
  .all(verifyToken, checkRole(['admin', 'super Admin']))
  .get(configController.getSystemConfigurations)
  .post(validate(configValidations.createConfiguration), configController.addConfiguration);

router
  .route("/:configId")
  .all(verifyToken, checkRole(['admin', 'super Admin']))
  .get()
  .put(validate(configValidations.updateConfiguration), configController.updateConfiguration)
  .delete(validate(configValidations.deleteConfiguration), configController.deleteConfiguration)

module.exports = router;
