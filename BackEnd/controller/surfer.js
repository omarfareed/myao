const connection = require("../connection");
const controller = require("./globalController");
const { promisify } = require("util");
const catchAsync = require("../utilities/catchAsync");
const query = promisify(connection.query).bind(connection);
exports.getSurfers = controller.select("surfer");
exports.createSurfer = controller.create("surfer");
exports.updateSurfer = controller.update("surfer", ["id", "created_date"]);
exports.deleteSurfer = (req, res, next) => {
  req.body = { id: req.body.id, is_active: false };
  next();
};
exports.searchSurfer = catchAsync(async (req, res, next) => {
  const search = req.body.search?.split(" ");
  searchLike = search.reduce((prev, cur) => `${prev}${cur}%`, "%");
  const data = await query(
    `SELECT *  FROM surfer WHERE CONCAT(fname , lname) LIKE "${searchLike}"`
  );
  res.json({
    status: "success",
    data,
  });
});

//TODO:
// SELECT * , CONCAT(FName , " " , LName) As Name WHERE Name LIKE (%arr[0]%arr[1]%)
