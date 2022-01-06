import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
// import { useEffect } from "react";
import { HiUserAdd, HiUserRemove } from "react-icons/hi";
import { MdOutlineReport } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import useStyle from "./ProfileStyle";
const FriendSectionButton = ({ source_id, target_id }) => {
  const classes = useStyle();
  const [condition, setCondition] = useState(0);
  // 0 => no relation  // 2 => already a friend  // 4 => sent from // 1 => waiting for accepting
  useEffect(() => {
    const asyncFunc = async () => {
      const { data } = await axios.patch("/api/v1/friend", { target_id });
      setCondition(data.data.type);
    };
    asyncFunc();
  }, [target_id]); // get type of the relation

  const addFriend = async () => {
    await axios.post("/api/v1/friend", { source_id, target_id });
    setCondition(1);
  };
  const noRelation = async () => {
    await axios.put("/api/v1/friend", { target_id });
    setCondition(0);
  };
  const acceptRequest = async () => {
    try {
      await axios.post("/api/v1/friend/accept", {
        friendship_time: "2021-12-29",
        source_id: target_id,
      });
      setCondition(2);
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <>
      {condition === 2 ? (
        <Button
          variant="contained"
          className={classes.AddButton}
          onClick={noRelation}
        >
          <HiUserRemove style={{ marginRight: "8px", fontSize: "1.2rem" }} />{" "}
          Unfriend
        </Button>
      ) : condition === 4 ? (
        <Button
          variant="contained"
          className={classes.AddButton}
          onClick={acceptRequest}
        >
          <FaUserCheck style={{ marginRight: "8px", fontSize: "1.2rem" }} />
          Confirm Request
        </Button>
      ) : condition === 1 ? (
        <Button
          variant="contained"
          className={classes.AddButton}
          onClick={noRelation}
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
      <Button
        variant="outlined"
        className={`${classes.AddButton} ${classes.reportButton}`}
        // disableRipple
      >
        <MdOutlineReport style={{ marginRight: "6px", fontSize: "1.3rem" }} />
        Report
      </Button>
    </>
  );
};
export default FriendSectionButton;
