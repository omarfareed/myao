const express = require("express");
const app = require("../app");

const authController = require("../controller/authController");
const marketerController = require("../controller/marketer");
const productRouter = require("./productRouter");
const router = express.Router();

router
  .route("/")
  .get(marketerController.getMarketers)
  .post(marketerController.createMarketer);
router.route("/search").get(marketerController.searchMarketer);
router
  .route("/:Id")
  .get(authController.transferParamsToBody, marketerController.getMarketers)
  .patch(
    authController.transferParamsToBody,
    marketerController.updateMarketer
  );
//TODO:
router.use("/:marketer_id", productRouter); // add post router here

module.exports = router;
