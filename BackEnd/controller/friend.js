const connection = require("../connection");
const { promisify } = require("util");
const catchAsync = require("../utilities/catchAsync");
const query = promisify(connection.query).bind(connection);

exports.getUserFriends = catchAsync(async (req, res, next) => {
  const data = await query(`
  select fname,lname,photo,user.id from 
  user JOIN friend 
  ON user1_id = user.id OR user2_id = user.id 
  AND user.id = "${req.params.user_id}"
  `);
  res.json({
    status: "success",
    data,
  });
});
exports.getFriendRequests = catchAsync(async (req, res, next) => {
  const data = await query(`
  select fname,lname,photo,user.id,time_sending
  from user JOIN friend_requests 
  ON receiver = user.id 
  AND user.id = "${req.auth.id}"
  `);
  res.json({
    status: "success",
    data,
  });
});
exports.sendRequest = catchAsync(async (req, res, next) => {
  const data = await query(`INSERT INTO friend_requests SET ?`, {
    sender: req.auth.id,
    receiver: req.body.receiver,
  });
  res.json({
    status: "success",
    data,
  });
});
// TODO: stored procedure
exports.respondRequest = catchAsync(async (req, res, next) => {
  const data = await Promise.all([
    query(
      `DELETE FROM friend_requests WHERE receiver = "${req.auth.id}" AND sender = "${req.body.sender}"`
    ),
    !req.body.accept ||
      query(`INSERT INTO friend SET ?`, {
        user1_id: req.body.sender,
        user2_id: req.auth.id,
      }),
  ]);
  res.json({
    status: "success",
    data,
  });
});

exports.getTypeOfRelation = catchAsync(async (req, res, next) => {
  const [{ friends, sender_receiver }] = await query(`
  select (select exists(select user1_id from friend where user1_id = "${req.params.user_id}" and user2_id = "${req.auth.id}"
  or user1_id = "${req.auth.id}" and user2_id = "${req.params.user_id}")) as friends,
  (select concat(sender," ",receiver) from friend_request where sender = "${req.params.user_id}"
  and receiver = "${req.auth.id}" or sender = "${req.auth.id}" and receiver = "${req.params.user_id}") as sender_receiver`);

  let data;
  if (friends) data = "f";
  else if (sender_receiver)
    if (sender_receiver.slice(0, 13) === req.auth.id) data = "s";
    else data = "r";
  else data = "n";

  res.json({
    status: "success",
    data,
  });
});
