import GetPosts from "../GlobalForAll/GetPosts";
import useStyle from "./HomeStyle";

const MediumSection = () => {
  const classes = useStyle();
  return (
    <>
      <GetPosts
        linkOfFetching="/api/v1/surfer/surkxf0h9r38/post"
        className={classes.post}
      />
    </>
  );
};
export default MediumSection;
