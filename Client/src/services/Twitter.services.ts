import axios, { AxiosResponse } from "axios";
import { ServerURL } from "../global";
import { Tweet, TweetReport } from "../interfaces/interfaces";

export const postTweet = async (pid: number): Promise<boolean> => {
  try {
    let isPosted: boolean = await axios.post(
      `${ServerURL}/twitter/PostTweet/${pid}`
    );
    return isPosted;
  } catch (err: any) {
    console.log(err.message);
    throw new Error("Error posting tweet");
  }
};

export const getTweetsReport = async (): Promise<TweetReport[]> => {
  try {
    let response: AxiosResponse = await axios.get(
      `${ServerURL}/twitter/GetTweetsReport`
    );
    let tweetsReport: TweetReport[] = response.data;
    return tweetsReport;
  } catch (err: any) {
    console.log(err.message);
    throw new Error("Error getting tweets report");
  }
};

export const getTweetsFromDB = async (): Promise<Tweet[]> => {
  try {
    let response: AxiosResponse = await axios.get(
      `${ServerURL}/twitter/GetTweetsFromDB`
    );
    let lastTweets: Tweet[] = response.data;
    return lastTweets;
  } catch (err: any) {
    console.log(err.message);
    throw new Error("Error getting tweets from DB");
  }
};
