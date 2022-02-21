const columns = require("./tableColumns");
const { filterObjFrom } = require("./control");
class APIFeatures {
  #table;
  #query;
  #options;
  #comparisonOperators;
  constructor(table, options) {
    this.#table = table;
    this.#query = "";
    this.#options = options;
    // this.options = options;
    this.#comparisonOperators = {
      gt: ">",
      gte: ">=",
      lt: "<",
      lte: "<=",
      eq: "=",
      neq: "<>",
    };
  }
  #excludeFields() {
    return filterObjFrom({ ...this.#options }, [
      "page",
      "sort",
      "limit",
      "fields",
      "joins",
      "conditions",
    ]);
  }
  #paramsOptions(params) {
    return Object.entries(params).map(([key, val]) => {
      if (typeof val === "object" && val !== null) {
        const operator = Object.keys(val)[0];
        return `${key}${this.#comparisonOperators[operator]}"${
          val[operator]
        }" `;
      } else {
        return `${key}="${val}"`;
      }
    });
  }
  #where(params) {
    return [...this.#options.conditions, ...this.#paramsOptions(params)].reduce(
      (prev, cur, i) => `${prev}${i === 0 ? "WHERE " : " AND "}${cur} `,
      ""
    );
  }
  #join() {
    return this.#options.joins.reduce(
      (prev, cur) => `${prev}JOIN ${cur.table} ON ${cur.condition}`,
      ""
    );
  }

  filter() {
    const fields = this.#options.fields || "*";
    const paramsObj = this.#excludeFields();
    const whereConditions = this.#where(paramsObj);
    const joins = this.#join();
    this.#query = `SELECT ${fields} FROM ${
      this.#table
    } ${joins} ${whereConditions} `;
    return this;
  }
  sort() {
    let { sort: order } = this.#options;
    if (!order) return this;
    order = order
      .split(",")
      .map((val) =>
        val.startsWith("-") ? `${val.substring(1)} DESC` : `${val} ASC`
      )
      .toString();
    this.#query = `${this.#query} ORDER BY ${order}`;
    return this;
  }
  paginate() {
    const page = +this.#options.page || 1;
    const limit = +this.#options.limit || 100;
    const skip = (page - 1) * limit;
    this.#query = `${this.#query} LIMIT ${limit} OFFSET ${skip}`;
    return this;
  }
  get query() {
    return this.#query;
  }
}
module.exports = APIFeatures;