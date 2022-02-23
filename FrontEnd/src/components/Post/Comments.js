import {
  Avatar,
  Collapse,
  Grid,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import getTimeFrom from "../../Utilities/getTime";
import useStyle from "./Post-style";
const Comment = (props) => {
  const classes = useStyle();
  const { fname, lname, photo, content, comment_time } = props;
  return (
    <Grid container columnGap={2} alignItems="flex-start">
      <Grid item>
        <Avatar src={photo} />
      </Grid>
      <Grid item direction="column">
        <Grid item className={classes.commentContent}>
          <Typography>{`${fname} ${lname}`}</Typography>
          <Typography>{content}</Typography>
        </Grid>
        <Grid item container alignItems="center" direction="row">
          <Typography
            sx={{ fontSize: "1rem", marginLeft: "1rem" }}
            className={classes.commentLike}
          >
            like
          </Typography>
          <Typography
            sx={{
              fontSize: "1rem",
              marginLeft: "1rem",
              color: "rgba(0,0,0,0.5)",
            }}
          >
            {getTimeFrom(comment_time)}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
const Comments = (props) => {
  const { post_id, commentOpen } = props;
  const [comments, setComments] = useState([]);
  const [, setFetching] = useState(false);
  const [insertNewComment, setInsertNewComment] = useState(false);
  const [page] = useState(1);
  const classes = useStyle();
  const [content, setContent] = useState("");
  const { fname, lname, photo } = useSelector((state) => state.reducer.user);
  const handleInsertComment = (event) => {
    if (event.key === "Enter") setInsertNewComment(true);
  };
  useEffect(() => {
    const insertComment = async () => {
      try {
        await axios.post(`/api/v1/post/${post_id}/comment/`, {
          content,
          post_id,
        });
        setComments([
          { fname, lname, photo, content, comment_time: "now" },
          ...comments,
        ]);
        setContent("");
      } catch (err) {
        console.log(err);
      }
    };
    if (insertNewComment) {
      setInsertNewComment(false);
      content.length > 0 && insertComment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [insertNewComment]);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setFetching(true);
        const {
          data: { data },
        } = await axios.get(
          `/api/v1/post/${post_id}/comment?limit=8&page=${page}&sort=-comment_time`
        );
        setFetching(false);
        setComments([...data, ...comments]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments();
    // eslint-disable-next-line
  }, [page, post_id]);
  return (
    <Collapse
      in={commentOpen}
      sx={{ marginBottom: "-3.5rem" }}
      timeout="auto"
      unmountOnExit
    >
      <Grid
        container
        direction="column"
        rowGap={3}
        className={classes.commentContainer}
        justifyContent="center"
      >
        <Grid item container columnGap={3}>
          <Grid item>
            <Avatar></Avatar>
          </Grid>
          <Grid item xs={9}>
            <InputLabel htmlFor="input-label-insert-comment">
              add new comment
            </InputLabel>
            <Input
              onKeyPress={handleInsertComment}
              onChange={(e) => setContent(e.target.value)}
              id="input-label-insert-comment"
              label="add new comment"
              variant="standard"
              fullWidth
              className={classes.insertComment}
              value={content}
            />
          </Grid>
        </Grid>
        {comments.map((comment, i) => (
          <Grid item>
            <Comment {...comment} />
          </Grid>
        ))}
      </Grid>
    </Collapse>
  );
};
export default Comments;
