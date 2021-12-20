import { Button, Grid, Typography } from "@mui/material";
import useStyle from "./SignStyle";
import MainLogo from "../../Material/Images/MainLogo.jpg";
import { useState } from "react";
import InputFieldSimple from "../../components/InputField.js/InputField";

function SignUp() {
  const classes = useStyle();

  const [ErrorName, setErrorName] = useState(false);
  const [ErrorMail, setErrorMail] = useState(false);
  const [ErrorPassword, setErrorPassword] = useState(false);
  const [ErrorConfirm, setErrorConfirm] = useState(false);

  const [Name, setName] = useState("");
  const [Mail, setMail] = useState("");
  const [Password, setPassword] = useState("");
  const [Confirm, setConfirm] = useState("");

  // Make the Button Disabled
  const isDisabled =
    ErrorName ||
    ErrorMail ||
    ErrorPassword ||
    ErrorConfirm ||
    Name.length === 0 ||
    Mail.length === 0 ||
    Password.length === 0 ||
    Confirm.length === 0;

  // Handling Errors of the Fields
  const HandleMail = (e) => {
    if (e.target.value === "") return setErrorMail(false);
    setMail(e.target.value);
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) setErrorMail(true);
    else setErrorMail(false);
  };

  const HandlePassword = (e) => {
    if (e.target.value === "") return setErrorPassword(false);
    setPassword(e.target.value);
    if (e.target.value.length < 8) setErrorPassword(true);
    else setErrorPassword(false);
  };

  const HandleConfirm = (e) => {
    if (e.target.value === "") return setErrorConfirm(false);
    setConfirm(e.target.value);
    if (e.target.value !== Password) setErrorConfirm(true);
    else setErrorConfirm(false);
  };

  const HandleName = (e) => {
    if (e.target.value === "") return setErrorName(false);
    setName(e.target.value);
    if (e.target.value.length < 2) setErrorName(true);
    else setErrorName(false);
  };
  ///////////////////////////////////////////////////
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid container direction="column" className={classes.SignCard}>
        <img src={MainLogo} alt="LOGO" className={classes.logo} />
        <Typography variant="h4" className={classes.SignWord}>
          Sign Up
        </Typography>
        <Typography variant="subtitle2" style={{ textAlign: "center" }}>
          Create New MYAO Account
        </Typography>

        <InputFieldSimple
          label="Name"
          placeholder="Enter name"
          onChange={HandleName}
          error={ErrorName}
        ></InputFieldSimple>

        <InputFieldSimple
          label="Email Address"
          placeholder="Enter email"
          onChange={HandleMail}
          error={ErrorMail}
        ></InputFieldSimple>

        <InputFieldSimple
          label="Password"
          type="password"
          placeholder="Enter password"
          onChange={HandlePassword}
          error={ErrorPassword}
        ></InputFieldSimple>

        <InputFieldSimple
          label="Confirm Password"
          type="password"
          placeholder="Confirm password"
          onChange={HandleConfirm}
          error={ErrorConfirm}
        ></InputFieldSimple>

        <Grid item>
          <Button
            variant="contained"
            //   onClick={HandleSignUp}
            className={classes.Button}
            disableRipple
            disabled={isDisabled}
          >
            Create New Account
          </Button>
        </Grid>
        {/* <Typography variant="body1">Have an account ? Login</Typography> */}
      </Grid>
    </Grid>
  );
}

export default SignUp;
