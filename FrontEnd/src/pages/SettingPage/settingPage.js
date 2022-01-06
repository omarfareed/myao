import { Button, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import AvatarImage from "../../components/AvatarImage/AvatarImage";
import InputFieldSimple from "../../components/InputField.js/InputField";
import useStyle from "./settingStyle";

const SettingPage = () => {
  const classes = useStyle();
  const { user } = useSelector((state) => state.reducer);
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.Page}
    >
      <AvatarImage />
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
