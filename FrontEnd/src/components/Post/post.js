import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
// import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Checkbox, Grid, Menu, MenuItem, Paper, Stack } from "@mui/material";
import { RiShareForwardLine } from "react-icons/ri";
import ReportPost from "./ReportPost";
import { FiMoreVertical } from "react-icons/fi";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import Comments from "./Comments";
import PostContent from "./PostContent";
import PostImgs from "./imgGallary";
const formatDate = (created_date) => {
  let date = new Date(created_date);
  return date.toUTCString().slice(0, 16);
};
const Post = ({ id, surfer_info = {}, data, className, style = {} }) => {
  const LikesCounter = data.like_counter;
  const CommentCounter = data.comment_counter;
  const lenth_of_imgs = data.media.length;
  const media = lenth_of_imgs > 0 ? <PostImgs media={data.media} /> : <></>;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const [openComment, setOpenComment] = React.useState(0);

  const handleCommentClick = () => {
    setOpenComment(!openComment);
  };
  return (
    <Paper
      style={{ width: "100%", height: "fit-content", ...style }}
      className={className}
    >
      <Card id={id}>
        <CardHeader
          avatar={<Avatar color="primary" aria-label="recipe" />}
          title={
            <span style={{ color: "#222" }}>
              {surfer_info.fname + " " + surfer_info.lname}
            </span>
          }
          subheader={
            <span style={{ fontSize: ".75rem" }}>
              {formatDate(data.created_date)}
            </span>
          }
          action={
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <FiMoreVertical />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={() => {
                  setAnchorEl(null);
                }}
              >
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                  }}
                >
                  Add To favourite
                </MenuItem>
                <ReportPost />
              </Menu>
            </div>
          }
        />

        <PostContent text={data.post_text} />

        {media}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body2" marginLeft="1rem" marginRight="auto">
            {!LikesCounter ? null : `${LikesCounter} Reaction`}
          </Typography>
          <Grid container width="fit-content" marginLeft="auto">
            <Typography variant="body2" marginRight=".5rem">
              {!CommentCounter ? null : `${CommentCounter} Comments`}
            </Typography>
            <Typography variant="body2" marginRight="1rem">
              {!CommentCounter ? null : `${CommentCounter} Shares`}
            </Typography>
          </Grid>
        </Stack>
        {/* {line} */}
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={3}
        >
          <Checkbox
            {...label}
            icon={<MdOutlineFavoriteBorder size={25} />}
            checkedIcon={<MdOutlineFavorite size={25} />}
          />
          <IconButton aria-label="share" onClick={handleCommentClick}>
            <FaRegComment />
          </IconButton>

          <IconButton aria-label="share">
            <RiShareForwardLine />
          </IconButton>
        </Stack>
        <Comments open={openComment} post_id={data.id} />
      </Card>
    </Paper>
  );
};

export default Post;
