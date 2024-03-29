const express = require("express");
const {
  transferParamsToBody,
  protect,
  restrictTo,
} = require("../controller/authController");
const restriction = restrictTo("user", "admin");
const commentController = require("../controller/comment");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(commentController.getComments)
  .post(
    transferParamsToBody,
    protect,
    restriction,
    (req, res, next) => {
      req.body.user_id = req.auth.id;
      next();
    },
    commentController.createComment
  );
router
  .route("/:id")
  .get(transferParamsToBody, commentController.getComments)
  .patch(
    transferParamsToBody,
    protect,
    restrictTo,
    commentController.updateComment
  )
  .delete(
    transferParamsToBody,
    protect,
    restriction,
    commentController.deleteComment
  );

//TODO: add comment here
// router.use("/:comment_id");
module.exports = router;
