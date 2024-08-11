const express = require("express");

const { rolesController } = require("../../controllers");
const validate = require("../../middlewares/validate");
const { roleValidations } = require("../../validations");



const router = express.Router();

router.get("/", rolesController.getRoles);
router.post("/", validate(roleValidations.createRole), rolesController.createRole);
router.get("/:roleId", rolesController.getRoleById);
router.put("/:roleId",validate(roleValidations.updateRole), rolesController.updateRole);
router.delete("/:roleId",validate(roleValidations.deleteRole), rolesController.deleteRole);

module.exports = router;