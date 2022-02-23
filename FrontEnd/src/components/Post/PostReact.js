import { Button, Fade, Grid, Paper, Popper, Typography } from "@mui/material";
import { useState } from "react";
import { AiFillLike } from "react-icons/ai";
import like from "../../Material/icons/like.svg";
import dislike from "../../Material/icons/dislike.svg";
import heart from "../../Material/icons/heart.svg";
import lol from "../../Material/icons/lol.svg";
import wow from "../../Material/icons/wow.svg";
import cry from "../../Material/icons/cry.svg";
import angry from "../../Material/icons/angry.svg";
import useStyle from "./Post-style";
const PostReact = () => {
  const classes = useStyle();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const handleHover = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleClose = (event) => {
    setOpen(false);
  };
  const scaleEmoji = (event) => {
    event.currentTarget.classList.add(classes.scaledEmoji);
  };
  const unscaleEmoji = (event) => {
    event.currentTarget.classList.remove(classes.scaledEmoji);
  };
  const pickReact = (i) => {
    console.log(i);
    handleClose();
  };
  const emojis = [
    { n: "like", v: like },
    { n: "dislike", v: dislike },
    { n: "heart", v: heart },
    { n: "lol", v: lol },
    { n: "wow", v: wow },
    { n: "cry", v: cry },
    { n: "angry", v: angry },
  ];
  return (
    <>
      <Grid
        item
        container
        columnGap={1}
        disableRipple
        component={Button}
        onMouseOver={handleHover}
        onMouseOut={handleClose}
      >
        <Typography>like</Typography>
        <AiFillLike />
        <Popper open={open} anchorEl={anchorEl} placement={"top"} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper className={classes.reactPicker}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                  sx={{ height: "100%" }}
                >
                  {emojis.map((e, i) => (
                    <Grid
                      key={i}
                      container
                      justifyContent="center"
                      className={classes.emojiContainer}
                    >
                      <img
                        alt={e.n}
                        onMouseOver={scaleEmoji}
                        onMouseOut={unscaleEmoji}
                        onClick={() => {
                          pickReact(i);
                        }}
                        id={`emoji_${i}`}
                        src={e.v}
                        className={classes.emoji}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Fade>
          )}
        </Popper>
      </Grid>
    </>
  );
};
export default PostReact;
