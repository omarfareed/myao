const connection = require("../connection");
const controller = require("./globalController");
exports.getFavpost = controller.select("favpost");
exports.createFavpost = controller.create("favpost", [], false);
exports.deleteFavpost = controller.delete("favpost");
