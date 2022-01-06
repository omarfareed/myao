import { Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import BackToMainScreen from "../../components/emptyScreen/NoFriendReq";
import SurferCard from "../../components/surferCard/surferCard";
import Wrapper from "../../components/Wrapper/Wrapper";
import imgMail from "../../Material/Images/requests.svg";
const FriendRequestPage = () => {
  const [Requests, setRequests] = useState([]);
  useEffect(() => {
    const asyncFun = async () => {
      try {
        const { data } = await axios.get("/api/v1/friend/received");
        setRequests([...Requests, ...data.data]);
        console.log(data.data);
      } catch (err) {
        alert(err.message);
      }
    };
    asyncFun();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Grid container alignItems="center" sx={{ minHeight: "85vh" }}>
      <Wrapper>
        <Grid container item xs={11} lg={7} md={8} spacing={3}>
          {Requests.map((e) => (
            <Grid item sm={4} xs={6} key={e.id}>
              <SurferCard user={e} />
            </Grid>
          ))}
          <Grid container justifyContent="center">
            <img
              alt="vector"
              src={imgMail}
              style={{ maxWidth: "25rem", marginBottom: "3rem" }}
            />
          </Grid>
          {Requests.length === 0 && <BackToMainScreen />}
        </Grid>
      </Wrapper>
    </Grid>
  );
};
export default FriendRequestPage;
