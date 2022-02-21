import { Avatar, Grid, IconButton, Paper, Typography } from "@mui/material";
import axios from "axios";
import { MdAdminPanelSettings } from "react-icons/md";
import { SiAdblock } from "react-icons/si";
import { useSelector } from "react-redux";
import FriendSectionButton from "./firstSectionButton";

const ProfilePageHead = ({ profileUser, classes, params }) => {
  const { user } = useSelector((state) => state.reducer);

  const makeAdmin = async () => {
    try {
      await axios.post("/api/v1/user/changeRole", {
        oldRole: "user",
        newRole: "admin",
        user_id: profileUser.id,
        newData: {
          type: 1,
        },
      });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleBlock = async () => {
    await axios.patch(`/api/v1/user/${params.id}`, {
      is_active: 0,
    });
  };
  return (
    <Paper className={classes.imageSection} elevation={3}>
      <Grid container className={classes.secondImage}>
        {profileUser.cover_photo && (
          <img
            alt="coverimage"
            src={profileUser.cover_photo}
            style={{ width: "100%", height: "100%" }}
          />
        )}
        <Grid
          container
          className={classes.cover}
          justifyContent="center"
          alignItems="center"
        >
          <Avatar
            sx={{ width: "95%", height: "95%" }}
            src={profileUser.photo}
          ></Avatar>
        </Grid>
      </Grid>

      <Typography variant="h2" className={classes.personName}>
        {`${profileUser.fname} ${profileUser.lname}`}{" "}
        {user.role === "admin" && (
          <>
            <IconButton size="medium">
              <SiAdblock style={{ fontSize: "2rem" }} onClick={handleBlock} />
            </IconButton>
            <IconButton size="medium" onClick={makeAdmin}>
              <MdAdminPanelSettings style={{ fontSize: "2rem" }} />
            </IconButton>
          </>
        )}
      </Typography>
      <Typography variant="subtitle1" className={classes.role}>
        {profileUser.jop && `${profileUser.jop}`}
      </Typography>
      <Typography variant="subtitle1" className={classes.address}>
        {profileUser.address && `${profileUser.address}`}
      </Typography>
      {params.id !== user.id && user.role === "user" && (
        <FriendSectionButton source_id={user.id} target_id={params.id} />
      )}
    </Paper>
  );
};

export default ProfilePageHead;
