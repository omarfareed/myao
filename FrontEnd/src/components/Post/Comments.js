import {
  Avatar,
  Button,
  Collapse,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import axios from "axios";
const Comments = ({ open, post_id }) => {
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noComment, setNoComments] = useState(false);
  const [value, setValue] = useState("");
  const fetching = async () => {
    setLoading(true);
    const { data } = await axios.patch("/api/v1/comment", { post_id });
    setInfo([...info, ...data.data]);
    setLoading(false);
    setNoComments(true);
  };
  const createComment = async () => {
    if (value.length > 0) {
      try {
        const date = new Date().toISOString();
        const dataToSend = {
          content: value,
          created_time: (0, date.slice(0, date.indexOf("T"))),
          post_id,
        };
        console.log(dataToSend);
        await axios.post("/api/v1/comment", dataToSend);
        setInfo([...info, dataToSend]);
        setValue("");
      } catch (err) {
        alert(err.message);
      }
    }
  };

  useEffect(() => {
    if (open && info.length === 0 && !loading && !noComment) {
      fetching();
    }
  }, [open]);
  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {info.map((el) => (
          <ListItem alignItems="flex-start" key={el.post_id}>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="name?"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {el.created_date}
                  </Typography>
                  {el.content}
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Name" />
          </ListItemAvatar>
          <ListItemText
            secondary={
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <TextField
                  label="Comment"
                  placeholder="give your comment"
                  multiline
                  variant="standard"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <Button
                  onClick={createComment}
                  variant="text"
                  centerRipple
                  size="small"
                  disabled={value.length === 0}
                  startIcon={<BsFillArrowRightCircleFill />}
                />
              </Stack>
            }
          />
        </ListItem>
      </List>
    </Collapse>
  );
};

export default Comments;
