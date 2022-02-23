import { Grid, useTheme } from "@mui/material";
import useStyle from "./ProfileStyle";
import LeftSection from "./LeftSection";
import GetPosts from "../GlobalForAll/GetPosts";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ProfilePageHead from "./ProfilePageHead";
import scrollingProfile from "../../Utilities/ScrollingProfile";
const ProfilePage = () => {
  const classes = useStyle();
  const { user } = useSelector((state) => state.reducer);
  const [profileUser, setProfileUser] = useState(user);
  const Theme = useTheme();
  const params = useParams();
  useEffect(() => {
    const fetchingFunc = async () => {
      const { data } = await axios.get(`/api/v1/user/${params.id}`);
      setProfileUser(data.data[0]);
    };
    try {
      if (user.id !== params.id) fetchingFunc();
    } catch (err) {
      alert(err.message);
    }
  }, [params.id, user.id]);
  useEffect(() => {
    scrollingProfile(Theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container className={classes.page} direction="column">
      <ProfilePageHead
        classes={classes}
        params={params}
        profileUser={profileUser}
      />
      <Grid container>
        <Grid item sm={12} lg={5}>
          <LeftSection user={user} />
        </Grid>
        <Grid container className={classes.rightSection} item lg={7}>
          <Grid container rowGap={2}>
            <GetPosts
              className={classes.post}
              linkOfFetching={`/api/v1/post/${params.id}`}
            />
            <div style={{ width: "100%" }}></div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
