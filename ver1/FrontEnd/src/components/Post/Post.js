import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
// import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Checkbox, Menu, MenuItem, Paper, Stack } from "@mui/material";
import { BsFillShareFill } from "react-icons/bs";
// import img from "../IMG_20200124_165226.jpg"
import ReportPost from "./ReportPost";
import { FiMoreVertical } from "react-icons/fi";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import Comments from "./Comments";
import PostContent from "./PostContent";
import PostImgs from "./imgGallary";

const Post = ({ id, data }) => {
  // console.log(data);
  const LikesCounter = 1250;
  const CommentCounter = 170;
  const lenth_of_imgs = 1;
  const media = lenth_of_imgs > 0 ? <PostImgs /> : <></>;

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
    <>
      <Card id={id} sx={{ width: "100%", height: "fit-content" }}>
        <CardHeader
          avatar={<Avatar color="primary" aria-label="recipe" />}
          title="Name"
          subheader="Create Data"
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

        <PostContent />

        {media}
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={8}
        >
          <Typography color="primary">♥ {LikesCounter}</Typography>
          <Typography></Typography>
          <Typography color="primary">Comments:{CommentCounter} </Typography>
        </Stack>

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
            <BsFillShareFill />
          </IconButton>
        </Stack>
        <Comments open={openComment} />
      </Card>
    </>
  );
};

export default Post;
