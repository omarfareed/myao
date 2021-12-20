import { Avatar, Grid } from "@mui/material";
import useStyle from "./AvatarStyle";
import { AiFillCamera } from "react-icons/ai";
import { useRef } from "react";
const AvatarImage = () => {
  const classes = useStyle();
  const ref = useRef();
  const uploadImage = () => {
    ref.current.click();
    // console.log(ref.current.files[0]);
  };
  return (
    <Grid item className={classes.avatarContainer}>
      <Avatar
        sx={{ width: "11rem", height: "11rem" }}
        className={classes.avatar}
        onClick={uploadImage}
      />
      <Grid
        container
        justifyContent="center"
        className={`${classes.camera} cccc`}
      >
        <AiFillCamera />
      </Grid>
      <form>
        <input
          ref={ref}
          type="file"
          accept="image/*"
          hidden
          id="settingImage"
        />
      </form>
    </Grid>
  );
};
export default AvatarImage;
