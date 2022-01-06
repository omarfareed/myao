const connection = require("../connection");
const controller = require("./globalController");
const catchAsync = require("../utilities/catchAsync");
const { promisify } = require("util");
const query = promisify(connection.query).bind(connection);
exports.getComments = catchAsync(async (req, res, next) => {
  let data = await query(
    `select * from comment where post_id="${req.body.post_id}"`
  );
  data = data.map((d) => {
    return { ...d, fname: "omar", lname: "fareed", photo: null };
  });
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
