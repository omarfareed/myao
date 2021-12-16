const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const connection = require("../connection");
const { promisify } = require("util");
const query = promisify(connection.query).bind(connection);
const security = require("../utilities/security");
exports.transferParamsToBody = (req, res, next) => {
  for (const [key, val] of Object.entries(req.params)) {
    req.body[key] = val;
  }
  next();
};
const signToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user.id, req.body.role);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};
exports.signup = catchAsync(async (req, res, next) => {
  query(`INSERT INTO ${req.role} SET ? `);

  // const url = `${req.protocol}://${req.get("host")}/me`;
  // // console.log(url);
  // await new Email(newUser, url).sendWelcome();

  createSendToken(newUser, 201, req, res);
});
exports.login = async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password) return "ERROR!";
  const user = await query(
    `SELECT * FROM ${role} WHERE email="${email}" AND password="${password}"`
  );
  if (!user)
    return res.json({
      status: "failed",
      error: "wrong email or password",
    });
  createSendToken(user, 200, req, res);
};

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // 3) Check if user still exists
  const currentUser = await query(
    `SELECT * FROM ${decoded.role} WHERE id=${decoded.id}`
  );
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (
    security.passwordChangedAfter(decoded.iat, currentUser.passwordChangedAt)
  ) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});
