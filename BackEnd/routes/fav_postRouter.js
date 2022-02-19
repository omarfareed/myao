const express = require("express");
const { convertAuthTo } = require("../utilities/control");
const {
  transferParamsToBody,
  protect,
  restrictTo,
} = require("../controller/authController");
const fav_postController = require("../controller/fav_post");
const router = express.Router({ mergeParams: true });
const restriction = restrictTo("surfer", "admin");
// router.get("/", transferParamsToBody, , fav_postController.getfav_post);
router.get(
  "/myfav_posts",
  protect,
  restrictTo("surfer"),
  convertAuthTo("surfer_id"),
  fav_postController.getMyfav_posts
);
router
  .route("/:post_id")
  .post(
    transferParamsToBody,
    protect,
    restriction,
    fav_postController.createfav_post
  )
  .delete(
    transferParamsToBody,
    protect,
    restriction,
    fav_postController.deletefav_post
  );

module.exports = router;
