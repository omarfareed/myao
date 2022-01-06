const connection = require("../connection");
const controller = require("./globalController");
const catchAsync = require("../utilities/catchAsync");
const { promisify } = require("util");
const query = promisify(connection.query).bind(connection);
// exports.getFavPost = controller.select("favpost");
const detailedPosts = async (posts, userId) => {
  if (posts.length === 0) return [];
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
          `select * from \`like\` where post_id="${post.id}" and surfer_id="${userId}"`
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
  return Object.values(postsHashed);
};
exports.getMyFavPosts = catchAsync(async (req, res, next) => {
  const { post_id, surfer_id } = req.body;
  const favPosts = await query(
    `select post_id from favpost where surfer_id="${surfer_id}"`
  );
  if (favPosts.length === 0) return res.json({ status: "success", data: [] });
  const reducedCondition =
    favPosts.reduce(
      (prev, { post_id: post }, i) => `${prev}${i === 0 ? "" : ","}"${post}"`,
      "IN("
    ) + ")";
  console.log(reducedCondition);
  const posts = await query(`select * from post where id ${reducedCondition}`);
  const data = await detailedPosts(posts, req.auth.id);
  res.json({
    status: "success",
    data,
  });
});
// exports.createFavPost = controller.create("favpost", [], false);
exports.createFavPost = catchAsync(async (req, res, next) => {
  const data = await query(`INSERT INTO favpost SET ?`, {
    surfer_id: req.auth.id,
    post_id: req.params.post_id,
  });
  res.json({
    status: "success",
    data,
  });
});
exports.deleteFavPost = controller.delete("favpost");
