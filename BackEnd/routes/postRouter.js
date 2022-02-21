const express = require("express");

const {
  transferParamsToBody,
  protect,
  restrictTo,
  getLogin,
} = require("../controller/authController");
const restriction = restrictTo("user");
const postController = require("../controller/post");
const router = express.Router({ mergeParams: true });
const postMediaRouter = require("./postMediaRouter");
const commentRouter = require("./commentRouter");
const shareRouter = require("./shareRouter.js");
const likeRouter = require("./likeRouter");
router.get("/timeline", protect, postController.getTimeLine);
router
  .route("/")
  .get(transferParamsToBody, getLogin, postController.getUserPosts)
  .post(
    transferParamsToBody,
    protect,
    restriction,
    postController.uploadPostPhotos,
    postController.resizePostPhotos,
    postController.createPost
  );

router
  .route("/:id")
  .patch(
    transferParamsToBody,
    protect,
    restriction,
    postController.uploadPostPhotos,
    postController.resizePostPhotos,
    postController.updatePost
  )
  .delete(
    transferParamsToBody,
    protect,
    restriction,
    postController.deletePost
  );

router.use("/:post_id", likeRouter);

router.use("/:post_id/comment", commentRouter);
router.use("/:post_id/media", postMediaRouter);
router.use("/:post_id/share", shareRouter);
//TODO: add comment here
// router.use("/:post_id");
module.exports = router;
