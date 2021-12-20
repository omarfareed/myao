import { Button, Grid, Paper, Typography } from "@mui/material";
import useStyle from "../Profile/ProfileStyle";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import useStyleMarketer from "./marketerStyle";

const MarketerPage = () => {
  const classes = useStyle();
  const classesMar = useStyleMarketer();
  //   const isProfile = useState(false);

  return (
    <Grid container className={classes.page} direction="column">
      <Paper className={classesMar.MarketerImageSection} elevation={3}>
        <Grid container className={classes.secondImage}></Grid>
        <Grid container alignItems="center" direction="column">
          <Typography
            variant="h4"
            className={`${classes.personName} ${classesMar.marketerTitle}`}
          >
            Blaza Market
          </Typography>
          <Button
            variant="contained"
            className={classes.AddButton}
            style={{ margin: "1.2rem 0" }}
          >
            <BsFillArrowDownCircleFill
              style={{ marginRight: "6px", fontSize: "1.2rem" }}
            />
            View Products
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
};
/////////////////////////
////////////////////////
export default MarketerPage;
