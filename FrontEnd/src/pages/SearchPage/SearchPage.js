import { Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../../components/Post/post";
import UserCard from "../../components/userCard/userCard";
import Wrapper from "../../components/Wrapper/Wrapper";

const SearchPage = () => {
  const params = useParams();
  const [usersPosts, setUsersPosts] = useState({
    posts: [],
    users: [],
  });
  const fetchingFunc = async () => {
    const { data } = await axios.post("/api/v1/user/search", {
      search: params.search,
    });
    console.log(data.data);
    setUsersPosts(data.data);
  };

  useEffect(() => {
    fetchingFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  return (
    <Wrapper>
      <Grid container item xs={11} lg={7} md={8} spacing={3}>
        {usersPosts.users.map((e) => (
          <Grid item sm={4} xs={6} key={e.id}>
            <UserCard user={e} />
          </Grid>
        ))}
      </Grid>
      <Grid item xs={11} lg={7} md={8} marginBottom="2rem">
        {usersPosts.posts.map((e) => (
          <Post
            key={e.id}
            data={e}
            user_info={e.user_info}
            style={{ marginTop: "1rem" }}
          />
        ))}
      </Grid>
    </Wrapper>
  );
};

export default SearchPage;
