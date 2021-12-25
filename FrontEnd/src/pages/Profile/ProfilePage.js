import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import useStyle from "./ProfileStyle";
import { HiUserAdd } from "react-icons/hi";
import { MdOutlineReport } from "react-icons/md";
import LeftSection from "./LeftSection";
import GetPosts from "../GlobalForAll/GetPosts";
import { useParams } from "react-router-dom";
const ProfilePage = () => {
  const classes = useStyle();
  const params = useParams();
  return (
    <Grid container className={classes.page} direction="column">
      <Paper className={classes.imageSection} elevation={3}>
        <Grid container className={classes.secondImage}>
          <Grid
            container
            className={classes.cover}
            justifyContent="center"
            alignItems="center"
          >
            <Avatar sx={{ width: "95%", height: "95%" }}></Avatar>
          </Grid>
        </Grid>

        <Typography variant="h2" className={classes.personName}>
          Ahmed Aref
        </Typography>
        <Typography variant="subtitle1" className={classes.role}>
          Computer engineering, Full Stack Web Developer
        </Typography>
        <Typography variant="subtitle1" className={classes.address}>
          Egypt,cairo
        </Typography>
        <Button variant="contained" className={classes.AddButton}>
          <HiUserAdd style={{ marginRight: "6px", fontSize: "1.2rem" }} /> Add
          Friend
        </Button>
        <Button
          variant="outlined"
          className={`${classes.AddButton} ${classes.reportButton}`}
          // disableRipple
        >
          <MdOutlineReport style={{ marginRight: "6px", fontSize: "1.3rem" }} />
          Report
        </Button>
      </Paper>
      <Grid container>
        <LeftSection />
        <Grid container className={classes.rightSection} item lg={7}>
          <GetPosts
            className={classes.post}
            linkOfFetching={`/api/v1/surfer/${params.id}/post`}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
