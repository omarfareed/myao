import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
  postContainer: {
    "&.MuiGrid-container": {
      padding: "1rem",
      justifyContent: "center",
    },
  },
  userPhoto: {
    "&.MuiAvatar-root": {
      marginRight: "1rem",
    },
  },
  optionsButton: {
    "&.MuiGrid-item": {
      marginLeft: "auto",
      cursor: "pointer",
      padding: "0.2rem 0",
      borderRadius: "0.3rem",
      "&:hover": {
        backgroundColor: "rgba(0,0,0,0.1)",
      },
    },
  },
  createdDate: {
    "&.MuiTypography-root": {
      color: "rgba(0,0,0,0.5)",
    },
  },
  postContent: {
    "&.MuiGrid-item": {
      margin: "1rem",
    },
  },
  reactionContainer: {
    "&.MuiGrid-container": {},
    "& > .MuiGrid-item": {
      width: "32%",
      color: "rgba(0,0,0,0.6)",
      "&:hover": {
        backgroundColor: "rgba(0,0,0,0.05)",
      },
      // "&:active": {
      //   color: "red",
      //   animation: "likeClick 2s",
      // },
    },
  },
  imgContainer: {
    "&.MuiImageList-root": {
      marginTop: 0,
      "& img": {
        height: "20rem",
      },
    },
  },
  showAllImgs: {
    "&.MuiButton-root": {
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      fontSize: "6rem",
      backgroundColor: "rgba(100,100,100,0.5)",
      color: "#BBB",
      "&:hover": {
        backgroundColor: "rgba(100,100,100,0.6)",
      },
    },
  },
  drop: {
    "& .MuiDrawer-modal": {
      position: "absolute",
      opacity: 0,
    },
  },
  reactPicker: {
    "&.MuiPaper-root": {
      padding: "0 .5rem",
      transform: "translate(25%,-20%)",
      borderRadius: "50px",
      height: "50px",
    },
  },
  emojiContainer: {
    "&.MuiGrid-root": {
      width: "47px",
      cursor: "pointer",
    },
  },
  emoji: {
    width: "35px",
    height: "35px",
  },
  scaledEmoji: {
    transform: "translateY(-.5rem)",
    transition: ".3s all",
    width: "50px",
    height: "50px",
  },
  commentContainer: {
    "&.MuiGrid-container": {
      padding: "1rem",
      justifyContent: "center",
    },
    "& .MuiAvatar-root": {
      width: "3.5rem",
      height: "3.5rem",
    },
  },
  commentContent: {
    "&.MuiGrid-item": {
      backgroundColor: "#EEE",
      padding: "0.5rem 1rem",
      borderRadius: "0.5rem",
      minWidth: "15rem",
      marginBottom: "0.5rem",
    },
  },
  commentLike: {
    "&.MuiTypography-root": {
      cursor: "pointer",
    },
  },
  insertComment: {
    color: "rgba(0,0,0,0.6)",

    "&.MuiInput-root": {
      "&::after": {
        borderBottom: "1px solid rgba(0,0,0,0.6)",
      },
    },
    "&.Mui-focused": {
      "&::after": {
        borderBottom: "1px solid rgba(0,0,0,0.6)",
      },
    },
  },
}));
export default useStyle;
