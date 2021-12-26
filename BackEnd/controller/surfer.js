const connection = require("../connection");
const controller = require("./globalController");
const { promisify } = require("util");
const catchAsync = require("../utilities/catchAsync");
const query = promisify(connection.query).bind(connection);
exports.getSurfers = controller.select("surfer");
exports.createSurfer = controller.create("surfer");
exports.updateSurfer = controller.update("surfer", ["id", "created_date"]);
exports.deleteSurfer = (req, res, next) => {
  req.body = { id: req.body.id, is_active: false };
  next();
};
exports.searchSurfer = catchAsync(async (req, res, next) => {
  const search = req.body.search?.split(" ");
  searchLike = search.reduce((prev, cur) => `${prev}${cur}%`, "%");
  const surfers = await query(
    `SELECT *  FROM surfer WHERE CONCAT(fname , lname) LIKE "${searchLike}"`
  );
  const posts = await query(
    `select * from post where post_text like "${searchLike}"`
  );
  if (posts.length === 0)
    return res.json({
      status: "success",
      data: {
        surfers,
        posts,
      },
    });
  let postsHashed = {};
  await Promise.all(
    posts.map(async (post) => {
      const [surfer_info, like_counter, if_liked] = await Promise.all([
        query(
          `select fname , lname , photo from surfer where id="${post.surfer_id}"`
        ),
        query(
          `select count(*) as like_counter from \`like\` where post_id="${post.id}"`
        ),
        query(
          `select * from \`like\` where post_id="${post.id}" and surfer_id="${req.auth?.id}"`
        ),
      ]);
      postsHashed[post.id] = {
        ...post,
        media: [],
        surfer_info: surfer_info[0],
        like_counter: like_counter[0].like_counter,
        liked: if_liked.length > 0,
      };
    })
  );
  // return res.json({ posts, postsHashed });
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
    data: {
      surfers,
      posts: Object.values(postsHashed),
    },
  });
});

//TODO:
// SELECT * , CONCAT(FName , " " , LName) As Name WHERE Name LIKE (%arr[0]%arr[1]%)
