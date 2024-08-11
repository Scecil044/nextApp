const express = require("express")
const validate = require("../../middlewares/validate");
const { verifyToken } = require("../../services/token.service");
const { productsController } = require("../../controllers");
const { productValidations } = require("../../validations");

const router = express.Router();

router.get("/", verifyToken, productsController.getProducts)
router.get("/:productId", verifyToken,validate(productValidations.getProduct), productsController.getProductById)
router.post("/", verifyToken,validate(productValidations.createProduct), productsController.createNewProduct)
router.put("/productId", verifyToken, validate(productValidations.updateProduct), productsController.updateProduct)
router.delete("/productId", verifyToken, validate(productValidations.deleteProduct), productsController.deleteProduct)


module.exports = router;