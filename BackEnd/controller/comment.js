const connection = require("../connection");
const controller = require("./globalController");
const catchAsync = require("../utilities/catchAsync");
const { promisify } = require("util");
const query = promisify(connection.query).bind(connection);
exports.getComments = catchAsync(async (req, res, next) => {
  let data = await query(
    `select * from comment JOIN surfer ON 
    comment.surfer_id = surfer.id 
    where comment.post_id="${req.body.post_id}"`
  );
  res.json({
    status: "success",
    data,
  });
});

exports.createComment = controller.create("comment");
exports.updateComment = controller.update("comment", [
  "id",
  "post_id",
  "surfer_id",
  "comment_time",
]);
exports.deleteComment = controller.delete("comment");
