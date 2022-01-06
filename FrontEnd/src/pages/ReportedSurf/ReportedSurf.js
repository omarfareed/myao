import { Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import SurferCard from "../../components/surferCard/surferCard";
import Wrapper from "../../components/Wrapper/Wrapper";
const ReportedSurf = () => {
  const [rep_sur, set_rep_sur] = useState([]);
  useEffect(() => {
    const asyFun = async () => {
      const { data } = await axios.get("/api/v1/report/surfer");
      set_rep_sur([...data.data]);
    };
    asyFun();
  }, []);
  return (
    <Wrapper>
      <Grid container item xs={11} lg={7} md={8} spacing={3}>
        {rep_sur.map((el) => (
          <Grid item sm={4} xs={6} key={el.id}>
            <SurferCard user={el} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};
export default ReportedSurf;
