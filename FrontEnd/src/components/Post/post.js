import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ArticleIcon from "@mui/icons-material/Article";
import { Stack } from "@mui/material";

const Post = () => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title="name"
        subheader="Create Data"
      />

      <CardMedia component="img" height="190" image="../imh.jpg" alt="img" />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          post content
        </Typography>
      </CardContent>

      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={3}
      >
        <IconButton aria-label="add to favorites">
          <FavoriteIcon color="red" />
        </IconButton>

        <IconButton aria-label="comments">
          <ArticleIcon />
        </IconButton>

        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </Stack>
    </Card>
  );
};

export default Post;
