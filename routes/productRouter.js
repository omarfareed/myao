const express = require("express");

const authController = require("../controller/authController");
const productController = require("../controller/product");
const router = express.Router();

router
  .route("/")
  .get(productController.getProducts)
  .post(productController.createProduct);
router.use(authController.transferParamsToBody);
router
  .route("/:id")
  .get(productController.getProducts)
  .patch(productController.updateProduct);

//TODO: add review here
// router.use("/:product_id");
module.exports = router;
