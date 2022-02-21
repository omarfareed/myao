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
  unfriend,
} = require("../controller/friend");
router.use(protect);
router
  .route("/requests")
  .post(sendRequest)
  .put(respondRequest)
  .get(getFriendRequests);
router.get("/:user_id/relation", getTypeOfRelation);
router.route("/:user_id").get(getUserFriends).delete(unfriend);

module.exports = router;
