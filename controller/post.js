const connection = require("../connection");
const controller = require("./globalController");
exports.getPosts = controller.select("post");
exports.createPost = controller.create("post");
exports.updatePost = controller.update("post", ["id", "surfer_id", "created_date"]);
exports.deletePost = controller.delete("post");
