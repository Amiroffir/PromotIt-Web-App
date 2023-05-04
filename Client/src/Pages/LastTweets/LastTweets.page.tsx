import React, { useEffect, useState } from "react";
import { Tweet } from "react-twitter-widgets";
import { getTweetsFromDB } from "../../services/Twitter.services";
import "./style.css";
import { TweetByID } from "../../interfaces/interfaces";

export const LastTweets = () => {
  const [tweets, setTweets] = useState<TweetByID[]>([]);
  const getLatestTweets = (): void => {
    getTweetsFromDB().then((res: TweetByID[]) => {
      setTweets(res);
    });
  };

  useEffect(() => {
    getLatestTweets();
  }, []);

  return (
    <div className="admin-homepage-container">
      <div className="tweets-container">
        {tweets.map((tweet) => (
          <Tweet tweetId={tweet.tweetID} />
        ))}
      </div>
    </div>
  );
};
