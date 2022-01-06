import { Grid } from "@mui/material";
// import GetPosts from "../GlobalForAll/GetPosts";
import fav from "../../Material/Images/fav.svg";
import Wrapper from "../../components/Wrapper/Wrapper";
import BackToMainScreen from "../../components/emptyScreen/NoFriendReq";

const FavPosts = () => {
  return (
    <Wrapper>
      <Grid container justifyContent="center" minHeight="85vh">
        {/* <GetPosts linkOfFetching="" /> */}
        <img
          src={fav}
          alt="add"
          style={{ width: "25rem", marginBottom: "3rem" }}
        />
        <BackToMainScreen />
      </Grid>
    </Wrapper>
  );
};
export default FavPosts;
