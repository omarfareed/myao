const express = require("express");
const router = express.Router();
const { protect } = require("../controller/authController");
// const restriction = restrictTo("user");
const {
  getFriendRequests,
  getUserFriends,
  sendRequest,
  respondRequest,
  getTypeOfRelation,
} = require("../controller/friend");
router.use(protect);
router
  .route("/requests")
  .post(sendRequest)
  .put(respondRequest)
  .get(getFriendRequests);
router.get("/:user_id/relation", getTypeOfRelation);
router.get("/:user_id", getUserFriends);

module.exports = router;
