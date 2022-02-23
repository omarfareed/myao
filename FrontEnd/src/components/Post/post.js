import {
  Avatar,
  Button,
  Card,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCommentAlt } from "react-icons/fa";
import { BiShare } from "react-icons/bi";
import useStyle from "./Post-style";
import { useState } from "react";
import Comment from "./Comments";
import getTimeFrom from "../../Utilities/getTime";
import PostReact from "./PostReact";
const PostHeader = ({ fname, lname, photo, created_date }) => {
  const classes = useStyle();
  return (
    <Grid container direction="row" alignItems="center">
      <Grid
        item
        className={classes.userPhoto}
        component={Avatar}
        src={photo}
      ></Grid>
      <Grid item>
        <Grid container direction="column">
          <Grid item component={Typography}>{`${fname} ${lname}`}</Grid>
          <Grid item component={Typography} className={classes.createdDate}>
            {getTimeFrom(created_date)}
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.optionsButton}>
        <BsThreeDotsVertical />
      </Grid>
    </Grid>
  );
};

const PostFooter = (props) => {
  const { setCommentOpen } = props;
  const classes = useStyle();
  return (
    <Grid
      container
      justifyContent="center"
      className={classes.reactionContainer}
    >
      <PostReact />
      <Grid
        item
        component={Button}
        disableRipple
        columnGap={1}
        onClick={() => setCommentOpen((state) => !state)}
      >
        <Typography>comment</Typography>
        <FaCommentAlt />
      </Grid>
      <Grid item component={Button} disableRipple columnGap={1}>
        <Typography>share</Typography>
        <BiShare />
      </Grid>
    </Grid>
  );
};
const getNumOfColumns = (numOfImgs, imgNum) => {
  if ((numOfImgs === imgNum) === 3 || numOfImgs === 1) return 2;
  return 1;
};
const maxImgCapacity = (numOfImgs, imgNum) => numOfImgs > 4 && imgNum === 4;

const PostPhotos = ({ media }) => {
  const classes = useStyle();
  const numOfImgs = media.length;
  return (
    <ImageList className={classes.imgContainer}>
      {media.slice(0, 4).map((link, i) => (
        <ImageListItem
          key={i}
          rows={1}
          cols={getNumOfColumns(numOfImgs, i + 1)}
          sx={{ position: "relative" }}
        >
          <img src={link} alt="post" />
          {maxImgCapacity(numOfImgs, i + 1) && (
            <Button disableRipple className={classes.showAllImgs}>{`+${
              numOfImgs - 3
            }`}</Button>
          )}
        </ImageListItem>
      ))}
    </ImageList>
  );
};
const Post = ({ data }) => {
  const classes = useStyle();
  const [commentOpen, setCommentOpen] = useState(false);

  return (
    <Grid
      direction="column"
      container
      component={Card}
      className={classes.postContainer}
    >
      <Grid item component={PostHeader} {...data} />
      <Grid item component={Typography} className={classes.postContent}>
        {data.content}
      </Grid>
      <Grid
        item
        component={PostPhotos}
        media={[
          "/img/users/user-photo-marky7ekmc6v.jpeg",
          "/img/users/user-photo-marky7ekmc6v.jpeg",
          // "/img/users/user-photo-marky7ekmc6v.jpeg",
          // "/img/users/user-photo-marky7ekmc6v.jpeg",
          // "/img/users/user-photo-marky7ekmc6v.jpeg",
          // "/img/users/user-photo-marky7ekmc6v.jpeg",
          // "/img/users/user-photo-marky7ekmc6v.jpeg",
          // "/img/users/user-photo-marky7ekmc6v.jpeg",
          // "/img/users/user-photo-marky7ekmc6v.jpeg",
          // "/img/users/user-photo-marky7ekmc6v.jpeg",
          // "/img/users/user-photo-marky7ekmc6v.jpeg",
          // "/img/users/user-photo-marky7ekmc6v.jpeg",
        ]}
      ></Grid>
      <Grid item component={PostFooter} setCommentOpen={setCommentOpen} />
      <Comment
        post_id={data.id}
        commentOpen={commentOpen}
        setCommentOpen={setCommentOpen}
      />
    </Grid>
  );
};
export default Post;
