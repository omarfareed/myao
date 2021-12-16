const connection = require("../connection");
const controller = require("./globalController");
exports.getPost_media = controller.select("post_media");
exports.createPost_media = controller.create("post_media", [], false);
exports.updatePost_media = controller.update("post_media", ["post_id"]);
exports.deletePost_media = controller.delete("post_media");
