import { Avatar, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import theme from "../../Utilities/Theme";

const useStyle = makeStyles({
  image: {
    "&.MuiAvatar-root": {
      width: "100%",
      height: "8rem",
      borderRadius: "1rem",
      [theme.breakpoints.down("lg")]: {
        height: "7rem",
      },
      [theme.breakpoints.down("md")]: {
        height: "8rem",
      },
      [theme.breakpoints.down("sm")]: {
        height: "5rem",
      },
    },
  },
  name: {
    "&.MuiTypography-root": {
      fontSize: ".9rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: ".68rem",
      },
    },
  },
  card: {
    // backgroundColor: "red",
    maxWidth: "8rem",
    minHeight: "9.8rem",
    marginTop: "1rem",
    [theme.breakpoints.down("lg")]: {
      maxWidth: "7rem",
      minHeight: "8.8rem",
    },
    [theme.breakpoints.down("md")]: {
      maxWidth: "8rem",
      minHeight: "10rem",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "5rem",
      minHeight: "6.5rem",
    },
  },
});
const FriendCard = ({ name, imageLink = undefined }) => {
  const classes = useStyle();

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      className={classes.card}
    >
      <Avatar src={imageLink} className={classes.image}></Avatar>
      <Typography variant="h5" className={classes.name}>
        {name}
      </Typography>
    </Grid>
  );
};

export default FriendCard;
