import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
import useStyle from "./ProfileStyle";
import { HiUserAdd } from "react-icons/hi";
import { MdOutlineReport } from "react-icons/md";
import FriendCard from "./FriendCard";
const ProfilePage = () => {
  const classes = useStyle();
  //   const isProfile = useState(false);
  const [arr] = useState([
    "ahmed mostafa",
    "omar fareed",
    "moaz hassan",
    "yousef waer",
    "ahmed assad",
    "ahmed lotfy",
  ]);
  const [about] = useState({
    "Lives in": "Egypt,Cairo",
    "Studied at": "faculty of engineering cairo univeristy",
    "Born in": "9/9/2001",
  });

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
      <Grid container justifyContent="space-between">
        <Paper className={classes.friendSection}>
          <Grid container justifyContent="space-between">
            <Grid container style={{ margin: "0 0 0 1rem" }}>
              <Typography variant="h2">Friends</Typography>
            </Grid>
            {arr.map((el, i) => (
              <Grid
                item
                lg={4}
                md={4}
                xs={4}
                key={el}
                container
                justifyContent="center"
              >
                <FriendCard key={i} name={el}></FriendCard>
              </Grid>
            ))}
          </Grid>
        </Paper>
        <Paper className={classes.friendSection}>
          <Grid container style={{ margin: "1rem 0 0 0" }}>
            <Typography variant="h2">About</Typography>
            <Grid container direction="column">
              {Object.keys(about).map((el) => (
                <Grid
                  item
                  key={el}
                  style={{
                    marginLeft: "1.2rem",
                    marginTop: "2rem",
                    fontSize: ".8rem",
                  }}
                >
                  <Typography variant="h2">
                    {el} {about[el]}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};
/////////////////////////
<Typography variant="h1" style={{ width: "100%", marginTop: "2rem" }}>
  No Informations avaliable
</Typography>;
////////////////////////
export default ProfilePage;
