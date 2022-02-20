const connection = require("../connection");
const controller = require("./globalController");
const { promisify } = require("util");
const catchAsync = require("../utilities/catchAsync");
const query = promisify(connection.query).bind(connection);
const APIFeature = require("../utilities/apiFeatures");
exports.getUsers = controller.select("user");
exports.createUser = controller.create("user");
exports.updateUser = controller.update("user", ["id", "created_date"]);
exports.deleteUser = (req, res, next) => {
  req.body = { id: req.body.id, is_active: false };
  next();
};
///////////////////////////////// photo
const sharp = require("sharp");
const multer = require("multer");
const AppError = require("../utilities/appError");
const { paginate } = require("../utilities/postUtilities");
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) cb(null, true);
  else cb(new AppError("not an image! please provide an image"));
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.auth.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

exports.searchUser = catchAsync(async (req, res, next) => {
  const search = req.body.search?.split(" ");
  if (!search) return next(new AppError("can't search for empty string"));
  searchLike = search.reduce((prev, cur) => `${prev}${cur}%`, "%");
  const users = await query(
    `SELECT * FROM user WHERE CONCAT(fname , lname) LIKE "${searchLike}" AND is_active = 1`
  );
  //  TODO:
  const posts = await getUserPosts(
    req.auth?.id,
    "",
    `post_text LIKE "${searchLike}"`,
    req.query
  );
  res.json({
    status: "success",
    data: {
      users,
      posts,
    },
  });
});

//TODO:
exports.deactivate = catchAsync(async (req, res, next) => {});

// SELECT * , CONCAT(FName , " " , LName) As Name WHERE Name LIKE (%arr[0]%arr[1]%)
