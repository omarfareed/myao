import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { RiShareForwardLine } from "react-icons/ri";
import {
  Button,
  Checkbox,
  Collapse,
  Menu,
  MenuItem,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
// import {MoreVertIcon} from 'react-icons/MoreVert';
// import FavoriteBorder from 'react-icons/FavoriteBorder';
// import Favorite from 'react-icons/Favorite';

import ListItemText from "@mui/material/ListItemText";
import { BiCommentDetail as CommentIcon } from "react-icons/bi";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
// import ReportPost from "./ReportPost";

const Post = () => {
  const LikesCounter = 1250;
  const CommentCounter = 170;

  const [reportOpen, setreportOpen] = React.useState(0);

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
    <Paper style={{ height: "fit-content" }}>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" />}
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
                <RiShareForwardLine />
                {/* <MoreVertIcon /> */}
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
                {/* <ReportPost /> */}
              </Menu>
            </div>
          }
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            post content
          </Typography>
        </CardContent>

        <CardMedia component="img" height="200" alt="img" gutterBottom />
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
            // icon={<FavoriteBorder />}
            icon={<RiShareForwardLine />}
            // checkedIcon={<Favorite />}
            checkedIcon={<RiShareForwardLine />}
          />

          <IconButton aria-label="share">
            <CommentIcon onClick={handleCommentClick} />
          </IconButton>

          <IconButton aria-label="share">
            {/* <ShareIcon /> */}
            <RiShareForwardLine />
          </IconButton>
        </Stack>

        <Collapse in={openComment} timeout="auto" unmountOnExit>
          <List
            sx={{ width: "100%", maxWidth: 345, bgcolor: "background.paper" }}
          >
            <ListItem alignItems="flex-start">
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
                      Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
              />
            </ListItem>

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
                    />
                    <Button
                      variant="text"
                      centerRipple
                      size="small"
                      startIcon={<BsFillArrowRightCircleFill />}
                    />
                  </Stack>
                }
              />
            </ListItem>
          </List>
        </Collapse>
      </Card>
    </Paper>
  );
};

export default Post;
