const connection = require("../connection");
const { promisify } = require("util");
const query = promisify(connection.query).bind(connection);
const controller = require("./globalController");
const catchAsync = require("../utilities/catchAsync");
exports.getLikes = controller.select("like");
exports.getPostLikes = catchAsync(async (req, res, next) => {
  const { post_id } = req.params;
  const data = await query(
    `select fname , lname , photo , user.id as user_id , like_time , post_likes.type as like_type
     from post_likes JOIN user ON post_likes.user_id = user.id 
     WHERE post_likes.post_id = "${post_id}"`
  );
  res.json({
    status: "success",
    data,
  });
});

exports.createLike = controller.create("like", [], false);
exports.deleteLike = controller.delete("like");
exports.updateLike = controller.updateNonPrimary(
  "like",
  ["type"],
  ["user_id", "post_id"]
);
