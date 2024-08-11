const express = require("express")
const validate = require("../../middlewares/validate");
const { userValidations } = require("../../validations");
const { usersController } = require("../../controllers");
const verifyToken = require("../../middlewares/verifyToken");

const router = express.Router();

router.get("/",verifyToken,usersController.getUsers);
router.get("/:userId",verifyToken, validate(userValidations.getUser),usersController.getUserById);
router.put("/:userId",verifyToken, validate(userValidations.updateUser),usersController.updateUser);
router.delete("/:userId",verifyToken, validate(userValidations.deleteUser),usersController.deleteUser);

module.exports = router;