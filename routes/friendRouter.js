const express = require("express");
const router = express.Router();
const { protect, restrictTo } = require("../controller/authController");
const restriction = restrictTo("surfer");
const {
  acceptRequest,
  beforeRequest,
  checkFriendship,
  deleteRequest,
  getReceivedRequests,
  getSentRequests,
  makeRequest,
  getMyFriends,
  getFriends,
} = require("../controller/friend");
router.use(protect, restriction);
router.get("/sent", getSentRequests);
router.get("/received", getReceivedRequests);
router.post("/accept", acceptRequest);
router.get("/:surfer_id", getFriends);
router.get("/myFriends", getMyFriends);
router.route("/").post(beforeRequest, makeRequest).delete(deleteRequest);
module.exports = router;
