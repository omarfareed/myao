const express = require("express");

const authController = require("../controller/authController");
const postController = require("../controller/post");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(authController.transferParamsToBody, postController.getPosts)
  .post(authController.transferParamsToBody, postController.createPost);
router
  .route("/:id")
  .get(authController.transferParamsToBody, postController.getPosts)
  .patch(authController.transferParamsToBody, postController.updatePost);

router.route("/:id/like").get();

//TODO: add comment here
// router.use("/:post_id");
module.exports = router;
