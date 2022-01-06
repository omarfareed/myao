const express = require("express");
const { convertAuthTo } = require("../utilities/control");
const {
  transferParamsToBody,
  protect,
  restrictTo,
} = require("../controller/authController");
const favPostController = require("../controller/fav_post");
const router = express.Router({ mergeParams: true });
const restriction = restrictTo("surfer", "admin");
// router.get("/", transferParamsToBody, , favPostController.getFavPost);
router.get(
  "/myFavPosts",
  protect,
  restrictTo("surfer"),
  convertAuthTo("surfer_id"),
  favPostController.getMyFavPosts
);
router
  .route("/:post_id")
  .post(
    transferParamsToBody,
    protect,
    restriction,
    favPostController.createFavPost
  )
  .get(transferParamsToBody, favPostController.getMyFavPosts)
  .delete(
    transferParamsToBody,
    protect,
    restriction,
    favPostController.deleteFavPost
  );

module.exports = router;
