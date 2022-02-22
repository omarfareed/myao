const connection = require("../connection");
const controller = require("./globalController");
const catchAsync = require("../utilities/catchAsync");
const { promisify } = require("util");
const { uniqueIdGenerator } = require("../utilities/control");
const APIFeatures = require("../utilities/apiFeatures");
const query = promisify(connection.query).bind(connection);
exports.getComments = catchAsync(async (req, res, next) => {
  const data = await query(
    `select * from comment JOIN user ON 
    comment.user_id = user.id 
    where comment.post_id="${req.body.post_id}"`
  );
  res.json({
    status: "success",
    data,
  });
});
const getCommentQuery = (req) =>
  query(
    new APIFeatures("comments", {
      ...req.query,
      fields: "comments.*,fname,lname,photo",
      joins: [
        { type: "", table: "user", condition: "comments.user_id = user.id" },
      ],
      conditions: [`comments.post_id="${req.params.post_id}"`],
    })
      .filter()
      .sort()
      .paginate().query
  );
exports.getComments = catchAsync(async (req, res, next) => {
  const data = await getCommentQuery(req);
  console.log("iam here", data);
  res.json({
    status: "success",
    data,
  });
});

exports.createComment = catchAsync(async (req, res, next) => {
  req.body.id = uniqueIdGenerator();
  req.body.user_id = req.auth.id;
  const data = await query(`insert into comments set ?`, req.body);
  res.json({
    status: "success",
    data,
  });
});
exports.updateComment = controller.update("comment", [
  "id",
  "post_id",
  "user_id",
  "comment_time",
]);
exports.deleteComment = controller.delete("comment");
