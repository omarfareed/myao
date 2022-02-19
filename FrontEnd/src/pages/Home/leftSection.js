import { Grid, Typography } from "@mui/material";
import useStyle from "./HomeStyle";
import { useSelector } from "react-redux";
import UserCard from "../../components/userCard/userCard";
const LeftSection = () => {
  const classes = useStyle();
  const { user } = useSelector((state) => state.reducer);
  return (
    <>
      <Grid container justifyContent="flex-end">
        <Grid item className={classes.LeftSection}>
          <UserCard
            user={user}
            newThings={
              <Typography variant="subtitle1" className={classes.margin}>
                {user.job ? user.job : "NO RULE SPECIFIED"}
              </Typography>
            }
          />
        </Grid>
      </Grid>
    </>
  );
};
export default LeftSection;
