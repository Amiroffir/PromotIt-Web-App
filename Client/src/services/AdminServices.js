import axios from "axios";
import { ServerURL } from "../global";
export const getUsers = async () => {
  try {
    let response = await axios.get(`${ServerURL}/users/Get`);
    console.log("response.data", response.data);
    let users = response.data;
    console.log("data", users);
    return users;
  } catch {
    console.log("error");
    return "error";
  }
};

export const getUserDetailsFromDB = async (userID) => {
  try {
    console.log("user", userID);
    let response = await axios.get(
      `${ServerURL}/users/GetUserDetails/${userID}`
    );
    console.log("response.data", response.data);
    let userDetails = response.data;
    console.log("data", userDetails);
    return userDetails[0];
  } catch {
    console.log("error");
    return "error";
  }
};
