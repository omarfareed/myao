const connection = require("../connection");
const controller = require("./globalController");
const { promisify } = require("util");
const catchAsync = require("../utilities/catchAsync");
const query = promisify(connection.query).bind(connection);
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

const getUserPosts = async (
  userId,
  additionalJoin = "",
  additionalCondition = "",
  queryObj
) => {
  const { page, limit } = queryObj;
  const [posts, likes_counter, isLikes, posts_media] = await Promise.all([
    query(
      paginate(
        `
   select post.id as post_id , post.user_id as user_id ,
  post_text , post.created_date as created_date ,
  comment_counter , fname , lname , photo
  from post JOIN user
  ON user.id = post.user_id
  ${additionalJoin}
  ${additionalCondition === "" ? "" : "where " + additionalCondition}
  `,
        page,
        limit
      )
    ),
    query(
      `select COUNT(*) as like_counter , post.id as post_id
      from post JOIN \`like\` 
      ON post.id = \`like\`.post_id 
      ${additionalJoin}
      ${additionalCondition === "" ? "" : "where " + additionalCondition}
      group by post.id`
    ),
    query(
      `select post.id as post_id from \`like\` JOIN post ON \`like\`.post_id = post.id 
      ${additionalJoin}
      where \`like\`.user_id = "${userId}"
      ${additionalCondition === "" ? "" : "AND " + additionalCondition}
      `
    ),
    query(
      `select post.id as post_id , link 
      from post JOIN post_media 
      ON post_media.post_id = post.id 
      ${additionalJoin}
      ${additionalCondition === "" ? "" : "where " + additionalCondition}
      `
    ),
  ]);
  let postHashed = {};
  posts.forEach((post) => {
    const { fname, lname, photo, user_id, post_id } = post;
    postHashed[post_id] = {
      ...post,
      user_info: {
        fname,
        lname,
        photo,
        user_id,
      },
      liked: false,
      like_counter: 0,
      media: [],
    };
  });
  likes_counter.forEach(({ like_counter, post_id }) => {
    if (postHashed.hasOwnProperty(post_id))
      postHashed[post_id].like_counter = like_counter;
  });
  isLikes.forEach(({ post_id }) => {
    if (postHashed.hasOwnProperty(post_id)) postHashed[post_id].liked = true;
  });
  posts_media.forEach(({ link, post_id }) => {
    if (postHashed.hasOwnProperty(post_id))
      postHashed[post_id].media.push(link);
  });
  return Object.values(postHashed);
};

/////////////////////////////////

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
