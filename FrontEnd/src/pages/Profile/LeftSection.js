import { Grid, Paper, Typography } from "@mui/material";
import useStyle from "./ProfileStyle";
import FriendCard from "./FriendCard";
import { useState } from "react";
const LeftSection = () => {
  const classes = useStyle();
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
    <Grid container item direction="column" xs={4}>
      <Paper className={classes.friendSection}>
        <Grid container justifyContent="space-between">
          <Grid container style={{ margin: "0 0 0 1rem" }}>
            <Typography variant="h2">Friends</Typography>
          </Grid>
          <Grid container spacing={1.5}>
            {arr.map((el, i) => (
              <Grid item xs={4} key={el}>
                <FriendCard key={i} name={el}></FriendCard>
              </Grid>
            ))}
          </Grid>
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
  );
};
export default LeftSection;
