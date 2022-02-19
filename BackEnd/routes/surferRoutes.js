const express = require("express");
const app = require("../app");

const {
  protect,
  transferParamsToBody,
  restrictTo,
  getLogin,
} = require("../controller/authController");
const userController = require("../controller/user");
const router = express.Router();
const postRouter = require("./postRouter");
const fav_postRouter = require("./fav_postRouter");
const commentRouter = require("./commentRouter");

router
  .route("/")
  .get((req, res, next) => {
    req.body.is_active = 1;
    next();
  }, userController.getUsers)
  .post(protect, restrictTo("admin"), userController.createUser);
router.route("/search").post(getLogin, userController.searchUser);
router
  .route("/:id")
  .get(
    transferParamsToBody,
    (req, res, next) => {
      req.body.is_active = 1;
      next();
    },
    userController.getUsers
  )
  .patch(
    transferParamsToBody,
    protect,
    restrictTo("admin"),
    userController.updateUser
  )
  .delete(
    transferParamsToBody,
    protect,
    restrictTo("admin"),
    userController.deleteUser,
    userController.updateUser
  );

router.use("/:user_id/post", postRouter);
router.use("/:user_id/fav_post", fav_postRouter);
router.use("/:user_id/comment", commentRouter);
module.exports = router;
/*
1- change put => params
2- solve problems  
*/ 