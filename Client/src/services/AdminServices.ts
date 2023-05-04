import axios, { AxiosResponse } from "axios";
import { ServerURL } from "../global";
import { UserDetails, UserReport } from "../interfaces/interfaces";
import { Notify } from "../interfaces/enums";

export const getUsers = async (): Promise<UserReport[]> => {
  try {
    let response: AxiosResponse = await axios.get(`${ServerURL}/users/Get`);
    console.log("response.data", response.data);
    let users: UserReport[] = response.data;
    console.log("data", users);
    return users;
  } catch (err: any) {
    console.error(Notify.Error, err.message);
    throw new Error("Error getting users");
  }
};

export const getUserDetailsFromDB = async (
  userID: number
): Promise<UserDetails> => {
  try {
    console.log("user", userID);
    let response: AxiosResponse = await axios.get(
      `${ServerURL}/users/GetUserDetails/${userID}`
    );
    console.log("response.data", response.data);
    let userExtended: UserDetails = response.data[0];
    console.log("data", userExtended);

    return userExtended;
  } catch (err: any) {
    console.error(Notify.Error, err.message);
    throw new Error("Error getting user details");
  }
};
