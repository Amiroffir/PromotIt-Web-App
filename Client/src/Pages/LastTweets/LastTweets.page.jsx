import React, { useEffect, useState } from "react";
import { Tweet } from "react-twitter-widgets";
import { getTweetsFromDB } from "../../services/Twitter.services";
import "./style.css";

export const LastTweets = () => {
  const [tweets, setTweets] = useState([]);
  const getLatestTweets = () => {
    getTweetsFromDB().then((res) => {
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
