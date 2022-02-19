const express = require("express");
const router = express.Router();
const {
  protect,
  transferParamsToBody,
  restrictTo,
} = require("../controller/authController");
const {
  deleteReport,
  getMyReports,
  getReportedReports,
  getReportsForTables,
  makeReport,
  getPostReports,
  getMarketerReports,
  getUserReports,
  getProductReports,
  deactivate,
} = require("../controller/report");
router
  .route("/")
  .post(protect, restrictTo("user", "marketer"), makeReport)
  .get(protect, restrictTo("admin"), getReportsForTables)
  .delete(protect, restrictTo("admin"), deleteReport);
router.get("/myReports", getMyReports);
router.get("/post", protect, restrictTo("admin"), getPostReports);
router.get("/user", protect, restrictTo("admin"), getUserReports);
router
  .route("/:reporter_id")
  .get(transferParamsToBody, protect, restrictTo("admin"), getReportedReports);
router.post("/block", protect, restrictTo("admin"), deactivate);

module.exports = router;
