import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { HiUserAdd, HiUserRemove } from "react-icons/hi";
import { MdOutlineReport } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import useStyle from "./ProfileStyle";
import ReportPost from "../../components/Post/ReportPost";

const FriendSectionButton = ({ source_id, target_id }) => {
  const classes = useStyle();
  const [condition, setCondition] = useState(0);
  // 0 => no relation  // 2 => already a friend  // 4 => sent from // 1 => waiting for accepting
  useEffect(() => {
    const asyncFunc = async () => {
      const { data } = await axios.get(`/api/v1/friend/${target_id}/relation`);
      setCondition(data.data);
    };
    asyncFunc();
  }, [target_id]); // get type of the relation

  const addFriend = async () => {
    await axios.post("/api/v1/friend/requests", { receiver: target_id });
    setCondition(1);
  };
  const removeFriend = async () => {
    await axios.delete(`/api/v1/friend/${target_id}`);
    setCondition(0);
  };
  const respondRequest = async (accept) => {
    await axios.put("/api/v1/friend/requests", {
      accept,
      sender: target_id,
    });
    console.log(accept);
    accept ? setCondition(2) : setCondition(0);
  };

  return (
    <>
      {condition === 2 ? (
        <Button
          variant="contained"
          className={classes.AddButton}
          onClick={removeFriend}
        >
          <HiUserRemove style={{ marginRight: "8px", fontSize: "1.2rem" }} />{" "}
          Unfriend
        </Button>
      ) : condition === 4 ? (
        <>
          <Button
            variant="contained"
            className={classes.AddButton}
            onClick={() => respondRequest(1)}
          >
            <FaUserCheck style={{ marginRight: "8px", fontSize: "1.2rem" }} />
            Confirm Request
          </Button>
          <Button
            variant="contained"
            className={classes.AddButton}
            onClick={() => respondRequest(0)}
          >
            <FaUserCheck style={{ marginRight: "8px", fontSize: "1.2rem" }} />
            unaccept
          </Button>
        </>
      ) : condition === 1 ? (
        <Button
          variant="contained"
          className={classes.AddButton}
          onClick={() => respondRequest(0)}
        >
          <HiUserRemove style={{ marginRight: "6px", fontSize: "1.2rem" }} />
          Undo Requesting
        </Button>
      ) : (
        <Button
          variant="contained"
          className={classes.AddButton}
          onClick={addFriend}
        >
          <HiUserAdd style={{ marginRight: "6px", fontSize: "1.2rem" }} /> Add
          Friend
        </Button>
      )}
      {/* <ReportPost
        is_post={0}
        reported_id={target_id}
        myButton={
          <Button
            variant="outlined"
            className={`${classes.AddButton} ${classes.reportButton}`}
          >
            <MdOutlineReport style={{ fontSize: "1.3rem" }} />
            Report
          </Button>
        }
      ></ReportPost> */}
    </>
  );
};
export default FriendSectionButton;
