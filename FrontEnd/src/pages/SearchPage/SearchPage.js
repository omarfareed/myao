import { Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../../components/Post/Post";
import SurferCard from "../../components/surferCard/surferCard";
import useStyle from "./SearchPageStyle";

const SearchPage = () => {
  const params = useParams();
  const classes = useStyle();
  const [usersPosts, setUsersPosts] = useState({ posts: [], surfers: [] });
  const fetchingFunc = async () => {
    const { data } = await axios.post("/api/v1/surfer/search", {
      search: params.search,
    });
    console.log(data.data.surfers);
    setUsersPosts(data.data);
  };

  useEffect(() => {
    fetchingFunc();
  }, [params]);
  return (
    <Grid container justifyContent="center" className={classes.page}>
      <Grid container item xs={11} lg={7} md={8} spacing={3}>
        {usersPosts.surfers.map((e) => (
          <Grid item sm={4} xs={6} key={e.id}>
            <SurferCard user={e} />
          </Grid>
        ))}
      </Grid>
      <Grid item xs={11} lg={7} md={8} marginBottom="2rem">
        {usersPosts.posts.map((e) => (
          <Post
            key={e.id}
            data={e}
            surfer_info={e.surfer_info}
            style={{ marginTop: "1rem" }}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default SearchPage;
