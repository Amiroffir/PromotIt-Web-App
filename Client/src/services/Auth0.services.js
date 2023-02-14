import axios from "axios";
import { ServerURL } from "../global";
export const getRoles = async (userId) => {
  console.log(userId);
  let result = await axios.get(`${ServerURL}/roles/${userId}`);
  if (result.status === 200) {
    console.log("success");
    return result.data;
  } else {
    console.log("error");
    return "error";
  }
};
