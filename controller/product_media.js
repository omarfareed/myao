const connection = require("../connection");
const controller = require("./globalController");
exports.getProduct_media = controller.select("product_media");
exports.createProduct_media = controller.create("product_media", [], false);
exports.updateProduct_media = controller.update("product_media", ["product_id"]);
exports.deleteProduct_media = controller.delete("product_media");
