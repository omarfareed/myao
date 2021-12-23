const { promisify } = require("util");
const connection = require("../connection");
const appError = require("../utilities/appError");
const catchAsync = require("../utilities/catchAsync");
const query = promisify(connection.query).bind(connection);
const controller = require("./globalController");
const {
  addWhereCondition,
  filterObjFrom,
  filterObjTo,
  uniqueIdGenerator,
} = require("./../utilities/control");
const columns = require("../utilities/tableColumns.js");
exports.getPost = catchAsync(async (req, res, next) => {
  const post = await query(`SELECT * FROM post WHERE id=${req.body.id}`);
  if (!post) return next(new appError("no post with this id"));
  post.media = (
    await query(`SELECT * FROM post_media WHERE post_id=${post.id}`)
  ).map((media) => media.link);
  return res.json({
    status: "success",
    data: post,
  });
});

exports.getPosts = catchAsync(async (req, res, next) => {
  console.log(req.query);
  const posts = await query(
    addWhereCondition(
      `SELECT * FROM post`,
      // filterObjTo(req.body, columns["post"])
      req.body
    )
  );
  if (posts.length === 0)
    return res.json({
      status: "success",
      data: posts,
    });
  let postsHashed = {};
  posts.forEach((post) => {
    postsHashed[post.id] = { ...post, media: [] };
  });
  const reducedCondition = posts.reduce(
    (prev, cur, index) =>
      `${prev} ${index == 0 ? "'" + cur.id + "'" : "," + "'" + cur.id + "'"}`,
    ""
  );
  const posts_media = await query(
    `SELECT * FROM post_media WHERE post_id IN (${reducedCondition})`
  );
  posts_media.forEach(({ post_id, link }) =>
    postsHashed[post_id].media.push(link)
  );
  res.json({
    status: "success",
    data: Object.values(postsHashed),
  });
});
exports.createPost = catchAsync(async (req, res, next) => {
  const id = uniqueIdGenerator("post");
  req.body["id"] = id;
  req.body["has_multimedia"] = 0;
  if (req.body.media?.length > 0) req.body["has_multimedia"] = 1;
  const post = await query(
    `INSERT INTO post set ? `,
    // filterObjTo(req.body, columns["post"])
    req.body
  );
  if (!req.body.media?.length)
    return res.json({
      status: "success",
      data: post,
    });
  const media = req.body.media.map(({ link, type }) => [
    uniqueIdGenerator("MEPO"),
    type,
    id,
    link,
  ]);
  const post_media = await query(
    "INSERT INTO post_media (id , type , post_id , link) VALUES ?",
    [media]
  );
  return res.json({ status: "success", post_media });
});
exports.deletePost = controller.delete("post"); // post media on delete cascade
exports.updatePost = catchAsync(async (req, res, next) => {
  const Obj = filterObjFrom(req.body, ["id", "created_date", "surfer_id"]);
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
  const data = await query(
    `SELECT * FROM post JOIN friend 
    WHERE (friend.source_id=post.surfer_id AND friend.target_id="${id}")
    OR (friend.target_id=post.surfer_id AND friend.source_id="${id}")
    AND friendship_time IS NOT NULL`
  );
  res.json({
    status: "success",
    data,
  });
});
