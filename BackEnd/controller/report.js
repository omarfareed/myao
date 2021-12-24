const connection = require("../connection");
const { promisify } = require("util");
const query = promisify(connection.query).bind(connection);
const catchAsync = require("../utilities/catchAsync");
const appError = require("../utilities/appError");
const { addWhereCondition, filterObjTo } = require("../utilities/control");
exports.getMyReports = catchAsync(async (req, res, next) => {
  const { id, role } = req.auth;
  let data;
  if (role === "marketer")
    data = await query(`SELECT * FROM mar_rep_mar WHERE reporter_id="${id}"`);
  else if (role === "surfer")
    data = await query(
      ["mar", "post", "pro", "sur"].reduce(
        (prev, cur, i) =>
          `${prev}${
            i === 0 ? "" : " UNION"
          } SELECT * FROM sur_rep_${cur} WHERE reporter_id="${id}"`,
        ""
      )
    );
  res.json({
    status: "success",
    data,
  });
});
exports.getReportedReports = catchAsync(async (req, res, next) => {
  const { reported_id } = req.body;
  if (!reported_id) return next(new appError("reported id must be provided"));
  const table = reported_id.substr(0, 3);
  let data;
  if (table === "mar")
    data = await query(
      `SELECT * FROM mar_rep_mar WHERE reported_id="${reported_id}" 
        UNION 
        SELECT * FROM sur_rep_mar WHERE reported_id="${reported_id}"`
    );
  else
    data = await query(
      `SELECT * FROM sur_rep_${table} WHERE WHERE reported_id="${reported_id}"`
    );
  return res.json({
    status: "success",
    data,
  });
});
exports.getReportsForTables = catchAsync(async (req, res, next) => {
  const options = req.body || [];
  const data = await query(
    options
      .map((option) => option.substr(0, 3))
      .reduce(
        (prev, cur, i) =>
          `${prev} ${i === 0 ? "" : "UNION"} SELECT * FROM sur_rep_${cur} ${
            cur === "mar" ? "UNION SELECT * FROM mar_rep_mar" : ""
          }`,
        ""
      )
  );
  res.json({
    status: "success",
    data,
  });
});
exports.makeReport = catchAsync(async (req, res, next) => {
  req.body.reporter_id = req.auth.id;
  // req.body = filterObjTo(req.body, [
  //   "reporter_id",
  //   "reported_id",
  //   "report_option",
  // ]);
  const data = await query(
    `INSERT INTO ${req.body.reporter_id.substr(
      0,
      3
    )}_rep_${req.body.reported_id.substr(0, 3)} SET ?`,
    req.body
  );
  res.json({
    status: "success",
    data,
  });
});
exports.deleteReport = catchAsync(async (req, res, next) => {
  const { reporter_id, reported_id } = req.body;
  const data = await query(
    `DELETE FROM ${reporter_id.substr(0, 3)}_rep_${reported_id.substr(
      0,
      3
    )} WHERE reporter_id="${reporter_id}" AND reported_id="${reported_id}"`
  );
  res.json({
    status: "success",
    data,
  });
});
