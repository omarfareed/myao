const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const appError = require("./utilities/appError");
const errorHandler = require("./controller/errorController");
const surferRouter = require("./routes/surferRoutes");
const postRouter = require("./routes/postRouter");
const commentRouter = require("./routes/commentRouter");
const shareRouter = require("./routes/shareRouter");
const likeRouter = require("./routes/likeRouter");
const userRouter = require("./routes/userRouter");
const friendRouter = require("./routes/friendRouter");
const fav_postRouter = require("./routes/fav_postRouter");
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/surfer", surferRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/share", shareRouter);
app.use("/api/v1/like", likeRouter);
app.use("/api/v1/friend", friendRouter);
app.use("/api/v1/fav_post", fav_postRouter);
app.all("*", (req, res, next) => {
  next(new appError(`can't find ${req.originalUrl} on this server`, 404));
});
app.use(errorHandler);
module.exports = app;
