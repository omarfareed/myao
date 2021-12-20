import { Button, Grid, Typography } from "@mui/material";
import useStyle from "./SignStyle";
import MainLogo from "../../Material/Images/MainLogo.jpg";
import { useState } from "react";
import InputFieldSimple from "../../components/InputField.js/InputField";

function SignIn() {
  const classes = useStyle();

  const [ErrorMail, setErrorMail] = useState(false);
  const [ErrorPassword, setErrorPassword] = useState(false);

  const [Mail, setMail] = useState("");
  const [Password, setPassword] = useState("");

  // Make the Button Disabled
  const isDisabled =
    ErrorMail || ErrorPassword || Mail.length === 0 || Password.length === 0;

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

  ///////////////////////////////////////////////////
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      className={classes.SignPage}
    >
      <Grid container direction="column" className={classes.SignCard}>
        <img src={MainLogo} alt="LOGO" className={classes.logo} />
        <Typography variant="h4" className={classes.SignWord}>
          Login
        </Typography>
        <Typography
          variant="subtitle2"
          style={{ textAlign: "center", marginBottom: "1.3rem" }}
        >
          Sign In To Your MYAO Account
        </Typography>

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

        <Grid item>
          <Button
            variant="contained"
            //   onClick={HandleSignUp}
            className={classes.Button}
            disableRipple
            disabled={isDisabled}
          >
            Log In
          </Button>
        </Grid>
        {/* <Typography variant="body1">Have an account ? Login</Typography> */}
      </Grid>
    </Grid>
  );
}

export default SignIn;
