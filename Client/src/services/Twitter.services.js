import axios from "axios";
import { ServerURL } from "../global";

export const postTweet = async (pid) => {
  try {
    const res = await axios.post(`${ServerURL}/twitter/PostTweet/${pid}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return "error";
  }
};

export const getTweetsReport = async () => {
  try {
    const res = await axios.get(`${ServerURL}/twitter/GetTweetsReport`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return "error";
  }
};

export const getTweetsFromDB = async () => {
  try {
    const res = await axios.get(`${ServerURL}/twitter/GetTweetsFromDB`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return "error";
  }
};
