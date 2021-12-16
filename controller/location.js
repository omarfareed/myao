const connection = require("../connection");
const controller = require("./globalController");
exports.getLocations = controller.select("location");
exports.createLocation = controller.create("location");
exports.updateLocation = controller.update("location", ["id", "surfer_id", "created_date"]);
exports.deletePost = controller.delete("location");
