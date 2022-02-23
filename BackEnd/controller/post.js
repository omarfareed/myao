const { paginate } = require("../utilities/postUtilities");
const { promisify } = require("util");
const connection = require("../connection");
const appError = require("../utilities/appError");
const catchAsync = require("../utilities/catchAsync");
const query = promisify(connection.query).bind(connection);
const controller = require("./globalController");
const APIFeatures = require("../utilities/apiFeatures");
const {
  AddWhereCondition,
  filterObjFrom,
  filterObjTo,
  uniqueIdGenerator,
} = require("./../utilities/control");
const columns = require("../utilities/tableColumns.js");

const sharp = require("sharp");
const multer = require("multer");
const getUserPosts = require("../utilities/getUserPosts");
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) cb(null, true);
  else cb(new appError("not an image! please provide an image"));
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadPostPhotos = upload.fields([{ name: "media", maxCount: 30 }]);
exports.resizePostPhotos = catchAsync(async (req, res, next) => {
  if (!req.files?.media?.length) return next();
  console.log(req.files.media.length);
  req.body.media = [];
  await Promise.all(
    req.files.media.map(async ({ buffer }, i) => {
      const fileName = `post-img-${i}-${req.auth.id}-${Date.now()}.jpeg`;
      await sharp(buffer)
        .resize(1000, 800)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`../frontend/public/img/posts/${fileName}`);
      req.body.media.push({ link: `/img/posts/${fileName}`, type: 0 });
    })
  );
  next();
});

exports.getUserPosts = catchAsync(async (req, res, next) => {
  console.log(req.params);
  const { user_id } = req.params;
  const data = await getUserPosts(user_id, req);
  res.json({
    status: "success",
    data,
  });
});

const prepareBodyForPostCreate = (req) => {
  req.body.id = uniqueIdGenerator();
  req.body.has_media = req.body.media?.length > 0 || 0;
  delete req.body.media;
  req.body.user_id = req.auth.id;
  return req.body;
};
const insertPost = async (req) => {
  const preparedBody = prepareBodyForPostCreate(req);
  console.log(preparedBody);
  return await query(`INSERT INTO post SET ?`, preparedBody);
};
const preparePostMedia = (postMedia, post_id) =>
  (postMedia || []).map(({ link, type }) => [
    uniqueIdGenerator(),
    type,
    post_id,
    link,
  ]);
const insertPostMedia = async (postMedia, post_id) => {
  const preparedPostMedia = preparePostMedia(postMedia, post_id);
  return await query(
    "INSERT INTO post_media (id , type , post_id , link) VALUES ?",
    [postMedia]
  );
};
const deleteMedia = async (media) => {
  media?.length &&
    (await Promise.all(
      media.map(({ link }) => unlink(`../FrontEnd/public${link}`))
    ));
};
exports.createPost = catchAsync(async (req, res, next) => {
  const { media } = req.body;
  try {
    await insertPost(req);
    if (!req.body.has_media)
      return res.json({
        staus: "success",
      });
    await insertPostMedia(media, req.body.id);
    return res.json({ status: "success" });
  } catch (err) {
    await deleteMedia(media);
    throw err;
  }
});
exports.deletePost = controller.delete("post"); // post media on delete cascade
exports.updatePost = catchAsync(async (req, res, next) => {
  const Obj = filterObjFrom(req.body, ["id", "created_date", "user_id"]);
  if (Object.keys(Obj).length === 0)
    return res.json({
      status: "success",
      data: "clown update request, no data changed",
    });
  const post = await query(`UPDATE post SET ? WHERE id='${req.body.id}'`, Obj);
  if (post.affectedRows === 0)
    return res.json({
      status: "failed",
      err: "wrong post id",
    });
  const { media } = req.body;
  res.json({
    status: "success",
    data: post,
  });
});

exports.getTimeLine = catchAsync(async (req, res, next) => {
  const { id } = req.auth;
  const posts = await query(
    paginate(
      `SELECT post.id , post.post_text , post.user_id , post.created_date , post.comment_counter 
     FROM post JOIN friend 
    WHERE (friend.source_id=post.user_id AND friend.target_id="${id}")
    OR (friend.target_id=post.user_id AND friend.source_id="${id}")
    AND friendship_time IS NOT NULL`,
      req.query.page,
      req.query.limit
    )
  );
  const data = await detailedPosts(posts, req.auth?.id);
  res.json({
    status: "success",
    data,
  });
});
