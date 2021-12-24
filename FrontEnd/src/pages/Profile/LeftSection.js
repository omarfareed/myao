import { Grid, Paper, Typography } from "@mui/material";
import { AiFillHome } from "react-icons/ai";
import { IoMdSchool } from "react-icons/io";
import { MdWork } from "react-icons/md";

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
  const infoKeys = {
    education: { convertTo: "studied at", icon: <IoMdSchool /> },
    address: { convertTo: "Lives in", icon: <AiFillHome /> },
    interests: { convertTo: "interests in", icon: <AiFillHome /> },
    job: { convertTo: "works as", icon: <MdWork /> },
    birth_date: { convertTo: "was born at", icon: <MdWork /> },
  };
  const [about] = useState({
    address: "Egypt,Cairo",
    education: "faculty of engineering cairo univeristy",
    birth_date: "9/9/2001",
    interests: "football, programming, chess, basketball",
    job: "programmer",
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
                container
                key={el}
                style={{
                  marginLeft: "0.6rem",
                  marginTop: "2rem",
                  fontSize: ".8rem",
                }}
                columnSpacing={1}
              >
                <Grid
                  item
                  xs={2}
                  style={{
                    fontSize: "1.1rem",
                    color: "#aaa",
                    paddingTop: ".1rem",
                  }}
                >
                  {infoKeys[el].icon}
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="h2" style={{ fontWeight: "normal" }}>
                    {infoKeys[el].convertTo} {about[el]}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
export default LeftSection;
