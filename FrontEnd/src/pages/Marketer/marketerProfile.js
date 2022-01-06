import { Button, Grid, Paper, Typography } from "@mui/material";
import useStyle from "../Profile/ProfileStyle";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import useStyleMarketer from "./marketerStyle";
import { useSelector } from "react-redux";
import GetProducts from "../GlobalForAll/GetProducts";
// import { useParams } from "react-router-dom";
const MarketerPage = () => {
  const classes = useStyle();
  const classesMar = useStyleMarketer();
  const { user } = useSelector((state) => state.reducer);
  // const params = useParams();
  // const isProfile = useState(false);
  return (
    <Grid container className={classes.page} direction="column">
      <Paper className={classesMar.MarketerImageSection} elevation={3}>
        <Grid container className={classes.secondImage}></Grid>
        <Grid container alignItems="center" direction="column">
          <Typography
            variant="h4"
            className={`${classes.personName} ${classesMar.marketerTitle}`}
          >
            {`${user.fname} ${user.lname}`}
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
      <Grid container sx={{ margin: "2rem auto 5rem", width: "50%" }}>
        {<GetProducts linkOfFetching={`/api/v1/product`} />}
      </Grid>
    </Grid>
  );
};
/////////////////////////
////////////////////////
export default MarketerPage;
