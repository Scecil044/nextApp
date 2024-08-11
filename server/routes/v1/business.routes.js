const express = require("express")
const validate = require("../../middlewares/validate");
const verifyToken = require("../../middlewares/verifyToken");
const { businessController } = require("../../controllers");
const { businessValidations } = require("../../validations");

const router = express.Router();

router.get("/", businessController.getBusinesses);
router.get("/:businessId", verifyToken, validate(businessValidations.getBusinessById),businessController.getBusinessById)
router.post("/", verifyToken, validate(businessValidations.createBusiness),businessController.createNewBusiness)
router.put("/:businessId", verifyToken, validate(businessValidations.updateBusiness),businessController.updateBusiness)
router.delete("/:businessId", verifyToken, validate(businessValidations.deleteBusiness),businessController.deleteBusiness)
router.delete("/contact/person/:businessId", verifyToken, validate(businessValidations.removecontact),businessController.removecontact)

module.exports = router;