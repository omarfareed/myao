import GetPosts from "../GlobalForAll/GetPosts";

const MediumSection = () => {
  return (
    <div style={{ margin: "1rem auto", width: "40rem", maxWidth: "95%" }}>
      <GetPosts linkOfFetching="/api/v1/surfer/surkxf0h9r38/post" />
    </div>
  );
};
export default MediumSection;
