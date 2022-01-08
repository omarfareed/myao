const express = require("express");
const router = express.Router();
const {
  protect,
  restrictTo,
  uploadUserPhoto,
  resizeUserPhoto,
} = require("../controller/authController");
const {
  login,
  logout,
  signup,
  updateMe,
  deleteMe,
  getInfo,
} = require("../controller/authController");
router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", protect, logout);
router
  .route("/me")
  .get(getInfo)
  .patch(protect, uploadUserPhoto, resizeUserPhoto, updateMe)
  .delete(protect, deleteMe);
module.exports = router;
