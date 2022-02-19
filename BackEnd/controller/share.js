const connection = require("../connection");
const { promisify } = require("util");
const query = promisify(connection.query).bind(connection);
const catchAsync = require("../utilities/catchAsync");
const controller = require("./globalController");
exports.getShares = controller.select("share");
exports.createShare = controller.create("share", [], false);
exports.deleteShare = controller.delete("share");

// exports.getShares = catchAsync(async (req, res, next) => {

// });
exports.getPostShares = catchAsync(async (req, res, next) => {
  const post_id = req.params;
  const user_ids = await query(
    `select user_id from share where post_id="${post_id}"`
  );
  const reducedCondition = user_ids.reduce((prev, cur, i) => {
    return `${prev} ${i === 0 ? "" : " , "} "${cur}"`;
  }, "");
  const data = await query(
    `select fname , lname , photo , id from user where id IN (${reducedCondition})`
  );
  res.json({
    status: "success",
    data,
  });
});
