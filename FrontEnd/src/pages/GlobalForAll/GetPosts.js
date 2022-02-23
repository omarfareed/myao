import Post from "../../components/post/post";
import { useEffect, useState } from "react";
import axios from "axios";

const GetPosts = ({ linkOfFetching, className, allowScroll = true }) => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [finished, setFinished] = useState(false);
  const [fetching, setFetching] = useState(false);

  const asyncFunc = async () => {
    try {
      if (!finished && !fetching) {
        let data;
        if (allowScroll)
          data = await axios.get(`${linkOfFetching}?limit=8&page=${page}`);
        else data = await axios.get(`${linkOfFetching}`);
        data = data.data;
        console.log(data);
        if (data.data.length === 0) {
          setFinished(true);
        } else {
          setPosts([...posts, ...data.data]);
          setPage((p) => p + 1);
        }
      }
    } catch {
      alert("error");
    }
  };

  const scrollFunc = async () => {
    if (allowScroll) {
      if (posts.length !== 0 && !finished && !fetching) {
        if (
          document.getElementById(`post_id_${posts.length - 1}`) &&
          document
            .getElementById(`post_id_${posts.length - 1}`)
            .getClientRects()[0].top < 2000
        ) {
          try {
            setFetching(true);
            await asyncFunc();
            setFetching(false);
          } catch {
            alert("error");
          }
        }
      }
    }
  };

  useEffect(() => {
    const func = async () => {
      setFetching(true);
      await asyncFunc();
      setFetching(false);
    };
    func();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.onscroll = scrollFunc;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts.length, fetching, finished]);

  return (
    <>
      {posts.map((el, index) => (
        <Post data={el} key={index} />
      ))}
    </>
  );
};
export default GetPosts;
