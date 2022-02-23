import { useEffect, useState } from "react";
import { HiUserAdd, HiUserRemove } from "react-icons/hi";
// import { MdOutlineReport } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import useStyle from "./ProfileStyle";
import {
  addFriend,
  getRelation,
  removeFriend,
  respondRequest,
} from "../../Utilities/FriendFunctions";
import FriendButton from "../../components/FriendButton/FriendButton";
// import ReportPost from "../../components/Post/ReportPost";
const FriendSectionButton = ({ source_id, target_id }) => {
  const classes = useStyle();
  const [condition, setCondition] = useState(0);
  useEffect(() => {
    getRelation(setCondition, target_id);
  }, [target_id]); // get type of the relation

  return (
    <>
      {condition === 1 ? (
        <>
          <FriendButton
            label="Unfriend"
            onClick={removeFriend}
            Icon={HiUserRemove}
            params={[setCondition, target_id]}
            className={classes.AddButton}
          />
        </>
      ) : condition === 3 ? (
        <>
          <FriendButton
            label="Confirm Request"
            onClick={respondRequest}
            Icon={FaUserCheck}
            params={[setCondition, target_id, 1]}
            className={classes.AddButton}
          />
          <FriendButton
            label="Unaccept"
            onClick={respondRequest}
            Icon={FaUserCheck}
            params={[setCondition, target_id, 0]}
            className={classes.AddButton}
          />
        </>
      ) : condition === 2 ? ( //
        <FriendButton
          label="Undo Requesting"
          onClick={respondRequest}
          Icon={HiUserRemove}
          params={[setCondition, target_id, 0]}
          className={classes.AddButton}
        />
      ) : (
        <FriendButton
          label="Add Friend"
          onClick={addFriend}
          Icon={HiUserAdd}
          params={[setCondition, target_id]}
          className={classes.AddButton}
        />
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
