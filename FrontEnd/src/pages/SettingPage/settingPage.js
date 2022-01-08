import { Button, Grid } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import AvatarImage from "../../components/AvatarImage/AvatarImage";
import InputFieldSimple from "../../components/InputField.js/InputField";
import useStyle from "./settingStyle";

const SettingPage = () => {
  const classes = useStyle();
  const { user } = useSelector((state) => state.reducer);
  const [img, setImg] = useState();
  const recieveImage = (image) => {
    if (image && image !== img) {
      setImg(image);
    }
  };
  const uploadThePhoto = async () => {
    if (img) {
      try {
        const form = new FormData();
        form.append("photo", img);
        await axios.patch("/api/v1/user/me", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (err) {
        alert("error");
      }
    }
  };
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.Page}
    >
      <AvatarImage sendImage={recieveImage} />
      <Grid container direction="column" className={classes.container1}>
        {/* information just for showing */}
        <InputFieldSimple label="Email" disable={true} value={user.email} />
        <InputFieldSimple
          label="Name"
          disable={true}
          value={`${user.fname} ${user.lname}`}
        />
        <Button
          variant="contained"
          className={classes.changePass}
          style={{ marginBottom: "1rem" }}
          onClick={uploadThePhoto}
          disabled={!img}
          disableRipple
        >
          Upload The Image
        </Button>
        <div className={classes.line} />
        {/* <InputFieldSimple label="" /> */}
        <InputFieldSimple
          label="Current Password"
          placeholder="Current Password"
        />
        <InputFieldSimple label="New Password" placeholder="New Password" />
        <InputFieldSimple
          label="Confirm Password"
          placeholder="Confirm your Password"
        />
        <Button
          variant="contained"
          className={classes.changePass}
          disableRipple
        >
          Change password
        </Button>
      </Grid>
    </Grid>
  );
};

export default SettingPage;
