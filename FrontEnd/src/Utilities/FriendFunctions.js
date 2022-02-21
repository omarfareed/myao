import axios from "axios";

// 0 => no relation  // 2 => already a friend  // 4 => sent from // 1 => waiting for accepting
export const addFriend = async (setCondition, receiver) => {
  await axios.post("/api/v1/friend/requests", { receiver });
  setCondition(1);
};
export const removeFriend = async (setCondition, target_id) => {
  await axios.delete(`/api/v1/friend/${target_id}`);
  setCondition(0);
};
export const respondRequest = async (setCondition, target_id, accept) => {
  await axios.put("/api/v1/friend/requests", {
    accept,
    sender: target_id,
  });
  console.log(accept);
  accept ? setCondition(2) : setCondition(0);
};
export const getRelation = async (setCondition, target_id) => {
  const { data } = await axios.get(`/api/v1/friend/${target_id}/relation`);
  setCondition(data.data);
};
