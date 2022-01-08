import * as React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { IoSend } from "react-icons/io5";

const PostButton = ({ createPost = () => {} }) => {
  const [loading, setLoading] = React.useState(false);
  const handleClick = async () => {
    setLoading(true);
    await createPost();
    // setTimeout(() => {
    setLoading(0);
    // }, 2000);
  };

  return (
    <LoadingButton
      onClick={handleClick}
      endIcon={<IoSend />}
      loading={loading}
      loadingPosition="end"
      variant="contained"
      sx={{ color: "#fff" }}
    >
      Post
    </LoadingButton>
  );
};

export default PostButton;
