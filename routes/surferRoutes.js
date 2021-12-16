const express = require("express");
const app = require("../app");

const authController = require("../controller/authController");
const surferController = require("../controller/surfer");
const router = express.Router();
const postRouter = require("./postRouter");

router
  .route("/")
  .get(surferController.getSurfers)
  .post(surferController.createSurfer);
  router.route("/search").get(surferController.searchSurfer);
  router.get("/login", authController.login);
router
  .route("/:id")
  .get(authController.transferParamsToBody, surferController.getSurfers)
  .patch(authController.transferParamsToBody, surferController.updateSurfer);
router.use("/:surfer_id/post", postRouter);

module.exports = router;
