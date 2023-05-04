import axios, { AxiosResponse } from "axios";
import { ServerURL } from "../global";
import { Auth0Role, Auth0Response } from "../interfaces/interfaces";

export const getRoles = async (userId: string): Promise<Auth0Role> => {
  console.log(userId);
  try {
    let response: AxiosResponse = await axios.get(
      `${ServerURL}/roles/${userId}`
    );
    if (response.status === 200) {
      let auth0User: Auth0Response[] = response.data;
      let role: Auth0Role = { name: auth0User[0].name };
      return role;
    } else {
      console.error("error");
      return { name: "" };
    }
  } catch (err: any) {
    console.error(err.message);
    return { name: "" };
  }
};
