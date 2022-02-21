// const crypto = require("crypto");
const catchAsync = require("../utilities/catchAsync");
const jwt = require("jsonwebtoken");
const connection = require("../connection");
const { promisify } = require("util");
const query = promisify(connection.query).bind(connection);
const {
  correctPassword,
  hashPassword,
  passwordChangedAfter,
  createPasswordResetToken,
} = require("../utilities/security");
const appError = require("../utilities/appError");
const {
  uniqueIdGenerator,
  filterObjFrom,
  filterObjTo,
} = require("../utilities/control");
const columns = require("../utilities/tableColumns");
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

const sharp = require("sharp");
const multer = require("multer");
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) cb(null, true);
  else cb(new appError("not an image! please provide an image"));
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");
exports.uploadUserPhoto = upload.fields([
  { name: "photo", maxCount: 1 },
  { name: "cover_photo", maxCount: 1 },
]);
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.files?.cover_photo && !req.files?.photo) return next();

  if (req.files.cover_photo) {
    req.body.cover_photo = `user-cover-${req.auth.id}.jpeg`;
    await sharp(req.files.cover_photo[0].buffer)
      .resize(2500, 1000)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`../FrontEnd/public/img/users/${req.body.cover_photo}`);
    req.body.cover_photo = `/img/users/${req.body.cover_photo}`;
  }
  if (req.files.photo) {
    req.body.photo = `user-photo-${req.auth.id}.jpeg`;
    await sharp(req.files.photo[0].buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`../FrontEnd/public/img/users/${req.body.photo}`);
    req.body.photo = `/img/users/${req.body.photo}`;
  }
  next();
});

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user.id, user.role);
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
  });
  return res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 1000),
    httpOnly: true,
  });
  return res.status(200).json({ status: "success" });
};
const prepareSignupBody = async (req) => {
  req.body.id = uniqueIdGenerator();
  req.body.password &&
    (req.body.password = await hashPassword(req.body.password));
};
exports.signup = catchAsync(async (req, res, next) => {
  await prepareSignupBody(req);
  await query(`INSERT INTO user SET ?`, req.body);
  req.body.role = "user";
  createSendToken(req.body, 201, req, res);
});
const sendErrorMessage = (next, message) => {
  next(new appError(message));
  return null;
};
const searchForUser = async (email, password, role) => {
  const [user] = await query(`select * from ${role} where email="${email}"`);
  if (!user || !(await correctPassword(password, user.password))) return null;
  user.role = role;
  return user;
};

const getUserLogin = async (req, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return sendErrorMessage(next, "you must enter email and password");
  const user =
    (await searchForUser(email, password, "user")) ||
    (await searchForUser(email, password, "admin"));
  if (!user) return sendErrorMessage(next, "wrong email or password");
  return user;
};

exports.login = catchAsync(async (req, res, next) => {
  const user = await getUserLogin(req, next);
  if (!user) return;
  if (user.role === "user" && user.is_active === 0)
    return sendErrorMessage(next, "this account has been closed");
  createSendToken(user, 200, req, res);
});

const findAuthorizationToken = (req) => {
  if (req.headers?.authorization?.startsWith("Bearer"))
    return req.headers.authorization.split(" ")[1];
  return req.cookies.jwt;
};
const getCurrentUser = async (req) => {
  const token = findAuthorizationToken(req);
  if (!token) return null;
  const { id, role } = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );
  const currentUser = (
    await query(
      `select * from ${role} where id="${id}" ${
        role === "user" ? "and is_active=1" : ""
      }`
    )
  )[0];
  currentUser.role = role;
  // currentUser.id = id;
  return currentUser;
};
exports.getLogin = catchAsync(async (req, res, next) => {
  const currentUser = await getCurrentUser(req);
  if (!currentUser) return next();
  req.auth = { role: currentUser.role, id: currentUser.id };
  next();
});

exports.protect = catchAsync(async (req, res, next) => {
  const currentUser = await getCurrentUser(req);
  if (!currentUser)
    return next(
      new appError("You are not logged in! Please log in to get access."),
      401
    );
  req.auth = { role: currentUser.role, id: currentUser.id };
  next();
});
exports.getInfo = catchAsync(async (req, res, next) => {
  const currentUser = await getCurrentUser(req);
  if (!currentUser) {
    return res.status(401).json({
      status: "notAuth",
    });
  }
  return res.status(200).json({
    status: "success",
    data: currentUser,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  const { role, id } = req.auth;
  req.body = filterObjFrom(req.body, [
    "id",
    "created_date",
    "email",
    "passwordChangedAt",
    "passwordResetToken",
    "passwordResetExpires",
    "is_active",
    "last_login",
    "closed_admin",
    "last_published",
    "founded_at",
  ]);
  if (req.file?.filename) req.body.photo = req.file.filename;
  const data = await query(`UPDATE ${role} SET ? WHERE id="${id}"`, req.body);
  res.json({
    status: "success",
    data,
    updatedData: req.body,
  });
});
exports.deleteMe = catchAsync(async (req, res, next) => {
  const { role, id } = req.auth;
  const data = await query(`UPDATE ${role} SET is_active=0 WHERE id="${id}"`);
  return res.json({
    status: "success",
    data,
  });
});
exports.restrictTo =
  (...roles) =>
  (req, body, next) => {
    if (roles.includes(req.auth.role)) return next();
    next(new appError(`you don't have the permission to make this action`));
  };
exports.changeAuthTo = (newName) => (req, res, next) => {
  req.body[newName] = req.auth.id;
  next();
};

// TODO:
exports.changeUserRole = catchAsync(async (req, res, next) => {
  const { oldRole, newRole, user_id, newData } = req.body;
  const oldUser = (
    await query(`select * from ${oldRole} where id = "${user_id}"`)
  )[0];
  await query(`delete from user where id = "${req.body.user_id}"`);
  const newUserData = filterObjTo(
    { ...oldUser, ...newData, id: uniqueIdGenerator() },
    columns[newRole]
  );
  const data = await query(`insert into ${newRole} set ?`, newUserData);
  res.json({
    status: "success",
    data,
  });
});

exports.forgetPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await query(`select * from user where email = "${email}"`);
  if (!user) return next(new appError("no user with such email"));
  const { resetToken, passwordResetExpires, passwordResetToken } =
    createPasswordResetToken();
});
// TODO:
exports.updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, newPasswordConfirm, role } = req.body;
  if (newPassword !== newPasswordConfirm)
    return next(new appError(`password doesn't equal password confirm`));
  const [{ password: hashedPass }] = await query(
    `select password from ${role} where id = "${req.auth.id}" AND is_active = 1`
  );
  if (!hashedPass) next(new appError("account is deleted"));
  if (!(await correctPassword(currentPassword, hashedPass)))
    next(new appError("wrong password"));
  const newPasswordHashed = await hashPassword(newPassword);
  const data = await query(
    `update ${role} set password = "${newPasswordHashed}" where id = "${req.auth.id}"`
  );
  res.json({
    status: "success",
    data,
  });
});
