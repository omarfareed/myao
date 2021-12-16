const res = require("express/lib/response");
const { json } = require("express/lib/response");
const utils = require("nodemon/lib/utils");
const connection = require("../connection");
const columns = require("../utilities/tableColumns");
//////////// utilities functions //////////////////
const uniqueIdGenerator = () =>
  `${Date.now().toString(32)}${Math.floor(Math.random() * 100).toString()}`;
const addWhereCondition = (query, req) =>
  Object.keys(req.body).reduce(
    (prev, cur, i) =>
      `${prev} ${i == 0 ? "WHERE" : "AND"} ${cur}="${req.body[cur]}"`,
    query
  );

const filterObjFrom = (Obj, fil = []) => {
  fil.forEach((val) => delete Obj[val]);
  return Obj;
};
// TODO:
// make it work for capital and small letters
const filterObjTo = (Obj, fil = []) => {
  let newObj = {};
  fil.forEach((val) => {
    if (val in Obj) newObj[val] = Obj[val];
  });
  return newObj;
};

////////////////////////////////////////////
///////////// global routes ////////////////
// SELECT * FROM ((table)) WHERE ((get conditions from req.body))
exports.select = (table) => (req, res, next) => {
  req.body = filterObjTo(req.body, columns[table]);
  connection.query(
    addWhereCondition(`SELECT * FROM ${table}`, req),
    (err, data) => {
      if (err)
        return res.json({
          status: "fail",
          err: err.message,
        });
      return res.json({
        status: "success",
        data,
      });
    }
  );
};
// INSERT INTO TABLE SET ? ==> get values from filtered req.body
// filter from id if it doesn't have unique id
// id is the 0 index of the table columns
exports.create = (table, filter) => (req, res, next) => {
  console.log(table, columns[table]);
  req.body[columns[table][0]] = uniqueIdGenerator();
  req.body = filterObjTo(req.body, columns[table]);
  req.body = filterObjFrom(req.body, filter);
  connection.query(`INSERT INTO ${table} SET ?`, req.body, (err, data) => {
    if (err) return res.json({ status: "fail", err: err.message });
    return res.json({ status: "success", data });
  });
};
// permanently delete be careful
exports.delete = (table) => (req, res, next) => {
  req.body = filterObjTo(req.body, columns[table]);
  connection.query(
    addWhereCondition(`DELETE FROM ${table}`, req),
    (err, data) => {
      if (err) res.json({ status: "fail", err: err.message });
      return res.json({ status: "success", data });
    }
  );
};

// update table set ? ==> search from req.body and update from filtered req.body
exports.update =
  (table, filter = []) =>
  (req, res, next) => {
    req.body = filterObjTo(req.body, columns[table]);
    const idKey = columns[table][0];
    connection.query(
      `UPDATE ${table} SET ? WHERE ${idKey}="${req.body[idKey]}"`,
      filterObjFrom(req.body, filter),
      (err, data) => {
        if (err) res.json({ status: "fail", err: err.message });
        return res.json({ status: "success", data });
      }
    );
  };
exports.globalQuery = (queryStr) => (req, res, next) => {
  req.body = filterObjTo(req.body, columns[table]);
  connection.query(queryStr, (err, data) => {
    if (err)
      return res.json({
        status: "fail",
        err: err.message,
      });
    return res.json({
      status: "success",
      data,
    });
  });
};
//////////////////////////////////////////////////////

// req.body
