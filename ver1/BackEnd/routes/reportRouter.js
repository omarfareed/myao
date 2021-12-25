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
} = require("../controller/report");
router
  .route("/")
  .post(protect, restrictTo("surfer", "marketer"), makeReport)
  .get(protect, restrictTo("admin"), getReportsForTables)
  .delete(protect, restrictTo("admin"), deleteReport);
router
  .route("/:reporter_id")
  .get(transferParamsToBody, protect, restrictTo("admin"), getReportedReports);
router.get("/myReports", getMyReports);
module.exports = router;
