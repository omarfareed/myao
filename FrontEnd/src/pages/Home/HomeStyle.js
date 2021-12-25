import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  post: {
    "&.MuiPaper-root": {
      margin: "2rem 0",
    },
  },
  LeftSection: {
    margin: "2rem 1rem 0 0",
    width: "15rem",
    position: "fixed",
  },
  avatarleft: {
    "&.MuiAvatar-root": {
      width: "4.5rem",
      height: "4.5rem",
      marginBottom: "1.5rem",
      position: "absolute",
      top: "100%",
      transform: "translateY(-50%)",
    },
  },
  margin: {
    "&.MuiTypography-root": {
      marginLeft: "1rem",
      marginRight: "1rem",
      marginBottom: "1rem",
    },
    textAlign: "center",
  },
  nameLeft: {
    "&.MuiTypography-root": {
      fontWeight: "500",
      marginBottom: "5px",
    },
  },
  avatarContainer: {
    position: "relative",
    height: "5rem",
    marginBottom: "3rem",
    borderRadius: "5px 5px 0 0",
    backgroundColor: "#ccc",
  },
});

export default useStyle;
