const express = require("express");
const app = express();
const surferRouter = require("./routes/surferRoutes");
const postRouter = require("./routes/postRouter");
const marketerRouter = require("./routes/marketerRouter");
app.use(express.json());

app.use("/api/v1/surfer", surferRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/marketer", marketerRouter);

module.exports = app;
