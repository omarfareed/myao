const connection = require("../connection");
const controller = require("./globalController");
exports.getReviews = controller.select("review");
exports.createReview = controller.create("review");
exports.updateReview = controller.update("review", ["id", "surfer_id", "product_id", "rating_time"]);
exports.deleteReview = controller.delete("review");
