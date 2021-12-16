const connection = require("../connection");
const controller = require("./globalController");
exports.getPosts = controller.select("post");
exports.createPost = controller.create("post");
exports.updatePost = controller.update("post", ["id"]);
