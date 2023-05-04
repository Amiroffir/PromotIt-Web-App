import React, { ChangeEvent, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { getTweetsReport } from "../../services/Twitter.services";
import { ToastContainer } from "react-toastify";
import { notify } from "../../services/Notifications.services";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import "./style.css";
import { TweetReport } from "../../interfaces/interfaces";
import { Notify } from "../../interfaces/enums";

export const TweetsReports = () => {
  const [tweets, setTweets] = useState<TweetReport[]>([]);
  const [filteredTweets, setFilteredTweets] = useState<TweetReport[]>([]);
  const [IsSort, setIsSort] = useState<string>("Default");
  const navigate: NavigateFunction = useNavigate();

  const getTweetsReports = (): void => {
    getTweetsReport()
      .then((res: TweetReport[]) => {
        if (res === null) {
          notify(Notify.Error, "Server is down, please try again later");
        }
        setTweets(res);
        setFilteredTweets(res);
      })
      .catch((err: Error) => {
        notify(Notify.Error, err.message);
      });
  };
  const filterReport = (e: ChangeEvent<HTMLSelectElement>) => {
    const filter: string = e.target.value;
    console.log(filter);
    if (filter === "Default") setFilteredTweets(tweets);
    else if (filter === "1") {
      let filteredTweets: TweetReport[] = tweets.filter(
        (tweet: TweetReport) => tweet.type === "Campaign"
      );
      setFilteredTweets(filteredTweets);
    } else if (filter === "2") {
      let filteredTweets: TweetReport[] = tweets.filter(
        (tweet: TweetReport) => tweet.type === "Activist&Campaign"
      );
      setFilteredTweets(filteredTweets);
    } else if (filter === "3") {
      let filteredTweets: TweetReport[] = tweets.filter(
        (tweet) => tweet.type === "Activist"
      );
      setFilteredTweets(filteredTweets);
    }
  };
  const sortReport = (sort: string) => {
    if (sort === "type") {
      let sorted: TweetReport[] = [];
      if (IsSort === "desc") {
        setIsSort("asc");
        sorted = filteredTweets.sort((a: TweetReport, b: TweetReport) => {
          if (a.type > b.type) {
            return -1;
          }
          if (a.type < b.type) {
            return 1;
          }
          return 0;
        });
      } else {
        setIsSort("desc");
        sorted = filteredTweets.sort((a: TweetReport, b: TweetReport) => {
          if (a.type < b.type) {
            return -1;
          }
          if (a.type > b.type) {
            return 1;
          }
          return 0;
        });
      }
      let s: TweetReport[] = sorted.filter(
        (tweet: TweetReport) => tweet.type !== ""
      );
      setFilteredTweets(s);
    } else if (sort === "count") {
      if (IsSort === "desc") {
        setIsSort("asc");
        let sortedTweets: TweetReport[] = filteredTweets.sort(
          (a: TweetReport, b: TweetReport) => {
            return a.tweetsCount - b.tweetsCount;
          }
        );
        let s: TweetReport[] = sortedTweets.filter(
          (tweet: TweetReport) => tweet.tweetsCount !== 0
        );
        console.log(sortedTweets);
        setFilteredTweets(s);
      } else {
        setIsSort("desc");
        let sortedTweets: TweetReport[] = filteredTweets.sort(
          (a: TweetReport, b: TweetReport) => {
            return b.tweetsCount - a.tweetsCount;
          }
        );
        let s: TweetReport[] = sortedTweets.filter(
          (tweet: TweetReport) => tweet.tweetsCount !== 0
        );
        setFilteredTweets(s);
      }
    } else if (sort === "handle") {
      if (IsSort === "desc") {
        setIsSort("asc");
        let sortedTweets: TweetReport[] = filteredTweets.sort(
          (a: TweetReport, b: TweetReport) => {
            if (a.handle > b.handle) {
              return -1;
            }
            if (a.handle < b.handle) {
              return 1;
            }
            return 0;
          }
        );
        let s: TweetReport[] = sortedTweets.filter(
          (tweet: TweetReport) => tweet.handle !== ""
        );
        setFilteredTweets(s);
      } else {
        setIsSort("desc");
        let sortedTweets: TweetReport[] = filteredTweets.sort(
          (a: TweetReport, b: TweetReport) => {
            if (a.handle < b.handle) {
              return -1;
            }
            if (a.handle > b.handle) {
              return 1;
            }
            return 0;
          }
        );
        let s: TweetReport[] = sortedTweets.filter(
          (tweet: TweetReport) => tweet.handle !== ""
        );
        setFilteredTweets(s);
      }
    }
  };

  useEffect(() => {
    getTweetsReports();
  }, []);

  return (
    <div className="admin-homepage-container">
      <div className="admin-HLS">
        <div className="back-page-btn">
          <button
            className="btn btn-warning btn-sm"
            onClick={() => navigate("/admin/reports/campaigns")}
          >
            Prev Report {"<"}
          </button>
        </div>
        <h1 className="reports">Tweets Report</h1>
      </div>
      <div className="filter-table">
        <div>
          <FilterListOutlinedIcon />
          Filter By:
        </div>
        <select onChange={(e) => filterReport(e)} className="form-select-sm">
          <option selected>Default</option>
          <option value="1">Campaign</option>
          <option value="2">Activist-Campaign</option>
          <option value="3">Activist</option>
        </select>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">
              Handle
              <ArrowDropDownOutlinedIcon
                className="dropdown-arr"
                onClick={() => sortReport("handle")}
              />
            </th>
            <th scope="col">
              Type
              <ArrowDropDownOutlinedIcon
                className="dropdown-arr"
                onClick={() => sortReport("type")}
              />
            </th>
            <th onClick={() => sortReport("count")} scope="col">
              Tweets Count
              <ArrowDropDownOutlinedIcon
                className="dropdown-arr"
                onClick={() => sortReport("count")}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredTweets &&
            filteredTweets.map((tweet) => {
              return (
                <tr>
                  <td>{tweet.handle}</td>
                  <td>{tweet.type}</td>
                  <td>{tweet.tweetsCount}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};
