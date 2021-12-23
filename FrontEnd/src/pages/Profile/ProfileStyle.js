import { makeStyles } from "@mui/styles";
import theme from "../../Utilities/Theme";
const leftMargin = "3rem";
const leftMarginSm = "1.5rem";
const useStyle = makeStyles({
  page: {
    margin: ".5rem auto",
    maxWidth: "70rem",
    height: "300vh",
    [theme.breakpoints.down("lg")]: {
      maxWidth: "95%",
    },
  },
  imageSection: {
    height: "35rem",
    marginBottom: "4rem",
    [theme.breakpoints.down("md")]: {
      height: "33rem",
    },
    [theme.breakpoints.down("sm")]: {
      height: "30rem",
    },
  },
  secondImage: {
    position: "relative",
    height: "20rem",
    backgroundColor: "#aaa",
    [theme.breakpoints.down("md")]: {
      height: "18rem",
    },
    [theme.breakpoints.down("sm")]: {
      height: "16rem",
    },
  },
  cover: {
    position: "absolute",
    top: "100%",
    transform: "translate(2.5rem,-65%)",
    maxWidth: "10rem",
    height: "10rem",
    backgroundColor: "#fff",
    borderRadius: "50%",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "9rem",
      height: "9rem",
      transform: "translate(1.5rem,-65%)",
    },
  },
  personName: {
    "&.MuiTypography-root": {
      margin: "4.5rem 0 .25rem",
      marginLeft: leftMargin,
      fontWeight: "500",
      [theme.breakpoints.down("sm")]: {
        margin: "4rem 0 .25rem",
        marginLeft: leftMarginSm,
      },
    },
  },
  address: {
    "&.MuiTypography-root": {
      marginLeft: leftMargin,
      [theme.breakpoints.down("sm")]: {
        marginLeft: leftMarginSm,
      },
    },
  },
  role: {
    "&.MuiTypography-root": {
      marginLeft: leftMargin,
      color: "#666",
      fontSize: "1rem",
      marginBottom: ".25rem",
      [theme.breakpoints.down("sm")]: {
        marginLeft: leftMarginSm,
        fontSize: ".9rem",
      },
    },
  },
  AddButton: {
    "&.MuiButton-root": {
      borderRadius: "1000rem",
      marginLeft: leftMargin,
      marginTop: "1.5rem",
      color: "white",
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: leftMarginSm,
        fontSize: ".9rem",
      },
    },
  },
  reportButton: {
    "&.MuiButton-root": {
      marginLeft: ".7rem",
      color: "#999",
      border: "2px solid #999",
      padding: "4.5px 9px",
      "&:hover": {
        border: "2px solid #999",
        backgroundColor: "#eee",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: ".9rem",
      },
    },
  },
  friendSection: {
    padding: "1rem",
    marginBottom: "2rem",
    [theme.breakpoints.down("md")]: {
      maxWidth: "100%",
      minHeight: "17rem",
      width: "100%",
      marginTop: "2.5rem",
    },
  },
});
export default useStyle;
