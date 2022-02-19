const connection = require("../connection");
const controller = require("./globalController");
const catchAsync = require("../utilities/catchAsync");
const { promisify } = require("util");
const query = promisify(connection.query).bind(connection);
// exports.getfav_post = controller.select("fav_post");
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
          `select count(*) as like_counter from post_likes where post_id="${post.id}"`
        ),
        query(
          `select * from post_likes where post_id="${post.id}" and surfer_id="${userId}"`
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
exports.getMyfav_posts = catchAsync(async (req, res, next) => {
  // post information posts , owner surfer
  // TODO: => because of stored proc
  const [[posts], isLikes, posts_media] = await Promise.all([
    query(`call fav_post_details("${req.auth.id}")`),
    query(
      `select fav_post.post_id as post_id from post_likes JOIN fav_post ON post_likes.post_id = fav_post.post_id
    where post_likes.surfer_id = "${req.auth.id}"`
    ),
    query(
      `select fav_post.post_id as post_id , link from fav_post JOIN post_media ON post_media.post_id = fav_post.post_id
      AND fav_post.surfer_id = "${req.auth.id}"
      `
    ),
  ]);
  // console.log(posts);
  // return res.json({
  //   posts,
  //   isLikes,
  //   posts_media,
  // });
  let postHashed = {};
  posts.forEach((post) => {
    const { fname, lname, photo, surfer_id, post_id } = post;
    postHashed[post_id] = {
      ...post,
      surfer_info: {
        fname,
        lname,
        photo,
        surfer_id,
      },
      liked: false,
      media: [],
    };
  });
  isLikes.forEach(({ post_id }) => {
    if (postHashed.hasOwnProperty(post_id)) postHashed[post_id].liked = true;
  });
  posts_media.forEach(({ link, post_id }) => {
    if (postHashed.hasOwnProperty(post_id))
      postHashed[post_id].media.push(link);
  });
  console.log(req.auth.id);
  res.json({
    status: "success",
    data: Object.values(postHashed),
  });
});
// exports.getMyfav_posts = catchAsync(async (req, res, next) => {
//   const { post_id, surfer_id } = req.body;
//   const fav_posts = await query(
//     `select post_id from fav_post where surfer_id="${surfer_id}"`
//   );
//   if (fav_posts.length === 0) return res.json({ status: "success", data: [] });
//   const reducedCondition =
//     fav_posts.reduce(
//       (prev, { post_id: post }, i) => `${prev}${i === 0 ? "" : ","}"${post}"`,
//       "IN("
//     ) + ")";
//   console.log(reducedCondition);
//   const posts = await query(`select * from post where id ${reducedCondition}`);
//   const data = await detailedPosts(posts, req.auth.id);
//   res.json({
//     status: "success",
//     data,
//   });
// });
// exports.createfav_post = controller.create("fav_post", [], false);
exports.createfav_post = catchAsync(async (req, res, next) => {
  const data = await query(`INSERT INTO fav_post SET ?`, {
    surfer_id: req.auth.id,
    post_id: req.params.post_id,
  });
  res.json({
    status: "success",
    data,
  });
});
exports.deletefav_post = controller.delete("fav_post");
