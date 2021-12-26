import Post from "../../components/Post/Post";
import { useEffect, useState } from "react";
import axios from "axios";

const GetPosts = ({ linkOfFetching, className, surfer_info_ready = null }) => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [finished, setFinished] = useState(false);
  const [fetching, setFetching] = useState(false);
  const asyncFunc = async () => {
    if (!finished && !fetching) {
      let data;
      // if (isItTheUser) {
      data = await axios.get(`${linkOfFetching}?limit=8&page=${page}`);
      data = data.data;
      // } else {
      //   data = await axios.get("/api/v1/post/detailedPosts");
      // }
      if (data.data.length == 0) return setFinished(true);
      setPosts([...posts, ...data.data]);
      setPage((p) => p + 1);
    }
  };

  const scrollFunc = async () => {
    if (posts.length !== 0 && !finished && !fetching) {
      if (
        document
          .getElementById(`post_id_${posts.length - 1}`)
          .getClientRects()[0].top < 1000
      ) {
        setFetching(true);
        asyncFunc();
        setFetching(false);
      }
    }
  };

  useEffect(() => {
    asyncFunc();
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", scrollFunc);
    return () => document.removeEventListener("scroll", scrollFunc);
  }, [posts.length]);

  return (
    <>
      {posts.map((el, index) => (
        <Post
          id={`post_id_${index}`}
          data={el}
          key={index}
          className={className}
          surfer_info={surfer_info_ready ? surfer_info_ready : {}}
        />
      ))}
    </>
  );
};
export default GetPosts;