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
    JOIN likes ON post_likes.post_id = post.id 
    where post.user_id = "${userId}"
    AND post_likes.user_id = "${authId}"
    `);

const getPostQuery = (userId) =>
  query(
    new APIFeatures("post", {
      ...req.params,
      fields: "post.*,fname,lname,photo,link",
      joins: [
        { table: "user", condition: "post.user_id = user.id" },
        { table: "post_media", condition: "post.id = post_media.post_id" },
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

module.exports = async (userId, authId) => {
  const [posts, isLiked] = await Promise.all([
    getPostQuery(userId),
    getIsLikedPostQuery(userId, authId),
  ]);
  const postWithMedia = preparePostMedia(posts);
  preparePostLikes(postWithMedia, isLiked);
  return posts;
};
