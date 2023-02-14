import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTweetsReport } from "../../services/Twitter.services";
import { ToastContainer } from "react-toastify";
import { notify } from "../../services/Notifications.services";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import "./style.css";

export const TweetsReports = () => {
  const [tweets, setTweets] = useState([]);
  const [filteredTweets, setFilteredTweets] = useState([]);
  const [IsSort, setIsSort] = useState("Default");
  const navigate = useNavigate();

  const getTweetsReports = () => {
    getTweetsReport().then((res) => {
      if (res === null) {
        notify("error", "Server is down, please try again later");
      }
      setTweets(res);
      setFilteredTweets(res);
    });
  };
  const filterReport = (e) => {
    const filter = e.target.value;
    console.log(filter);
    if (filter === "Default") setFilteredTweets(tweets);
    else if (filter === "1") {
      let filteredTweets = tweets.filter((tweet) => tweet.type === "Campaign");
      setFilteredTweets(filteredTweets);
    } else if (filter === "2") {
      let filteredTweets = tweets.filter(
        (tweet) => tweet.type === "Activist&Campaign"
      );
      setFilteredTweets(filteredTweets);
    } else if (filter === "3") {
      let filteredTweets = tweets.filter((tweet) => tweet.type === "Activist");
      console.log(filteredTweets);
      setFilteredTweets(filteredTweets);
    }
  };
  const sortReport = (sort) => {
    if (sort === "type") {
      let sorted = [];
      if (IsSort === "desc") {
        setIsSort("asc");
        sorted = filteredTweets.sort((a, b) => {
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
        sorted = filteredTweets.sort((a, b) => {
          if (a.type < b.type) {
            return -1;
          }
          if (a.type > b.type) {
            return 1;
          }
          return 0;
        });
      }
      let s = sorted.filter((tweet) => tweet.type !== "");
      setFilteredTweets(s);
    } else if (sort === "count") {
      if (IsSort === "desc") {
        setIsSort("asc");
        let sortedTweets = filteredTweets.sort((a, b) => {
          return a.tweetsCount - b.tweetsCount;
        });
        let s = sortedTweets.filter((tweet) => tweet.tweetsCount !== "");
        console.log(sortedTweets);
        setFilteredTweets(s);
      } else {
        setIsSort("desc");
        let sortedTweets = filteredTweets.sort((a, b) => {
          return b.tweetsCount - a.tweetsCount;
        });
        let s = sortedTweets.filter((tweet) => tweet.tweetsCount !== "");
        console.log(sortedTweets);
        setFilteredTweets(s);
      }
    } else if (sort === "handle") {
      if (IsSort === "desc") {
        setIsSort("asc");
        let sortedTweets = filteredTweets.sort((a, b) => {
          if (a.handle > b.handle) {
            return -1;
          }
          if (a.handle < b.handle) {
            return 1;
          }
          return 0;
        });
        let s = sortedTweets.filter((tweet) => tweet.handle !== "");
        setFilteredTweets(s);
      } else {
        setIsSort("desc");
        let sortedTweets = filteredTweets.sort((a, b) => {
          if (a.handle < b.handle) {
            return -1;
          }
          if (a.handle > b.handle) {
            return 1;
          }
          return 0;
        });
        let s = sortedTweets.filter((tweet) => tweet.handle !== "");
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
