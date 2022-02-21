const { promisify } = require("util");
const connection = require("../connection");
const query = promisify(connection.query).bind(connection);
const APIFeatures = require("./apiFeatures");

const preparePostMedia = (posts) => {
  let postHashed = {};
  posts.forEach((post) => {
    if (!postHashed.hasOwnProperty(post.id)) {
      postHashed[post.id] = post;
      post.media = [post.link];
      post.link = undefined;
      post.is_liked = 0;
    } else {
      postHashed[post.id].media.push(post.link);
    }
  });
  return postHashed;
};
const getIsLikedPostQuery = (userId, authId) =>
  query(`select post.id from post 
    JOIN post_likes ON post_likes.post_id = post.id 
    where post.user_id = "${userId}"
    AND post_likes.user_id = "${authId}"
    `);

const getPostQuery = (userId, req) =>
  query(
    new APIFeatures("post", {
      ...req.query,
      fields: "post.*,fname,lname,photo,link",
      joins: [
        { type: "", table: "user", condition: "post.user_id = user.id" },
        {
          type: "LEFT",
          table: "post_media",
          condition: "post.id = post_media.post_id",
        },
      ],
      conditions: [`post.user_id="${userId}"`],
    })
      .filter()
      .paginate().query
  );
const preparePostLikes = (posts, isLiked) => {
  isLiked.forEach((id) => {
    posts[id].is_liked = 1;
  });
};

module.exports = async (userId, req) => {
  console.log(req.auth);
  console.log(userId);
  console.log(req.query);
  const [posts, isLiked] = await Promise.all([
    getPostQuery(userId, req),
    getIsLikedPostQuery(userId, req.auth.id),
  ]);
  const postWithMedia = preparePostMedia(posts);
  preparePostLikes(postWithMedia, isLiked);
  return posts;
};
