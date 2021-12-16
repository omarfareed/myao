exports.transferParamsToBody = (req, res, next) => {
  console.log(req.params);
  for (const [key, val] of Object.entries(req.params)) {
    req.body[key] = val;
  }
  console.log(req.body);
  next();
};
