// const connection = require("../connection");
// const { promisify } = require("util");
// const catchAsync = require("../utilities/catchAsync");
// const query = promisify(connection.query).bind(connection);
// const controller = require("./globalController");
// exports.getFriends = catchAsync(async (req, res, next) => {
//   const { user_id } = req.params;
//   console.log(user_id);
//   const data = await query(
//     `SELECT * FROM friend 
//     WHERE (source_id="${user_id}" OR target_id="${user_id}")
//     AND friendship_time IS NOT NULL`
//   );
//   res.json({
//     status: "success",
//     data,
//   });
// });

// exports.getMyFriends = catchAsync(async (req, res, next) => {
//   const data = await query(
//     `SELECT * FROM friend 
//     WHERE (source_id="${req.auth.id}" OR target_id="${req.auth.id}")
//     AND friendship_time IS NOT NULL`
//   );
//   friends = await Promise.all(
//     data
//       .map(({ source_id, target_id }) =>
//         source_id === req.auth.id ? target_id : source_id
//       )
//       .map((friend) => query(`select * from user where id="${friend}"`))
//   );
//   res.json({
//     status: "success",
//     data: friends,
//   });
// });
// exports.getReceivedRequests = catchAsync(async (req, res, next) => {
//   const sources_id = await query(
//     `SELECT source_id FROM \`friend\` WHERE target_id="${req.auth.id}" AND friendship_time IS NULL`
//   );
//   const data = (
//     await Promise.all(
//       sources_id.map(({ source_id }) =>
//         query(`select * from user where id = "${source_id}"`)
//       )
//     )
//   ).map((el) => el[0]);
//   res.json({
//     status: "success",
//     data,
//   });
// });
// exports.getSentRequests = catchAsync(async (req, res, next) => {
//   const targets_id = await query(
//     `SELECT target_id FROM \`friend\` WHERE source_id="${req.auth.id}" AND friendship_time IS NULL`
//   );
//   const data = (
//     await Promise.all(
//       targets_id.map(({ target_id }) =>
//         query(`select * from user where id = "${target_id}"`)
//       )
//     )
//   ).map((el) => el[0]);
//   res.json({
//     status: "success",
//     data,
//   });
// });

// exports.makeRequest = controller.create("friend", [], false);
// exports.acceptRequest = catchAsync(async (req, res, next) => {
//   console.log(req.auth.id, req.body.source_id, req.body.friendship_time);
//   const request = await query(
//     `UPDATE friend SET friendship_time="${req.body.friendship_time}" 
//     WHERE target_id="${req.auth.id}"
//     AND source_id="${req.body.source_id}"`
//   );
//   return res.json({
//     status: "success",
//     data: request,
//   });
// });
// exports.beforeRequest = (req, res, next) => {
//   req.body.source_id = req.auth.id;
//   next();
// };
// exports.deleteRequest = catchAsync(async (req, res, next) => {
//   const data = await query(
//     `DELETE FROM friend 
//     WHERE (source_id="${req.auth.id}" AND target_id="${req.body.target_id}") 
//     OR (source_id="${req.body.target_id}" AND target_id="${req.auth.id}")`
//   );
//   return res.json({
//     status: "success",
//     data,
//   });
// });
// exports.checkFriendship = catchAsync(async (req, res, next) => {
//   const data = await query(
//     `SELECT * FROM friend WHERE source_id="${req.auth.id}" AND target_id="${req.body.target_id}"`
//   );
//   if (data && data.length !== 0)
//     return res.json({
//       status: "success",
//       friend: true,
//     });
//   res.json({
//     status: "success",
//     friend: false,
//   });
// });

// exports.getTypeOfRelation = catchAsync(async (req, res, next) => {
//   let data = await query(
//     `select * FROM friend 
//     WHERE (source_id="${req.auth.id}" AND target_id="${req.body.target_id}") 
//     OR (source_id="${req.body.target_id}" AND target_id="${req.auth.id}")`
//   );
//   if (data.length === 0) data = { type: 0 };
//   else if (data[0].friendship_time == null) {
//     if (data[0].source_id === req.auth.id) data = { type: 1 };
//     else data = { type: 4 };
//   } else data = { type: 2 };
//   return res.json({
//     status: "success",
//     data,
//   });
// });
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
  