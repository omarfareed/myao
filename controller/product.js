const connection = require("../connection");
const controller = require("./globalController");
exports.getProducts = controller.select("product");
exports.createProduct = controller.create("product");
exports.updateProduct = controller.update("product", ["id"]);
