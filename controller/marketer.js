const app = require("../app");
const connection = require("../connection");
const controller = require("./globalController");

exports.getMarketers = controller.select("marketer");
exports.createMarketer = controller.create("marketer");
exports.updateMarketer = controller.update("marketer", ["id"]);
exports.searchMarketer = (req, res, next) => {
  let arr = []; //req.body.search.split(" ");
  let q;

  if (arr.length == 1)
    q = `Select * from marketer where Fname like '%${arr[0]}' or Lname like '${arr[0]}'`;
  else
    q = `Select * from marketer where Fname like '%${arr[0]}' or Lname like '${arr[1]}'`;
  connection.query(q, (err, data) => {
    if (err)
      return res.json({
        status: "fail",
        message: err.message,
      });
    res.json({
      status: "success",
      data,
    });
  });
};