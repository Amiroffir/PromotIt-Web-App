import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getCampaigns } from "../../services/General.services";
import { notify } from "../../services/Notifications.services";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import LinkIcon from "@mui/icons-material/Link";
import "./style.css";

export const CampaignsReports = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [IsSort, setIsSort] = useState("Default");
  const navigate = useNavigate();
  const showCampaignsList = async () => {
    await getCampaigns().then((res) => {
      if (res !== null) {
        setCampaigns(res);
      } else {
        notify("error", "Server is down, please try again later");
      }
    });
  };

  const sortReport = (sort) => {
    if (sort === "campaignName") {
      let sorted = [];
      if (IsSort === "desc") {
        setIsSort("asc");
        sorted = campaigns.sort((a, b) => {
          if (a[1].CampaignName > b[1].CampaignName) {
            return -1;
          }
          if (a[1].CampaignName < b[1].CampaignName) {
            return 1;
          }
          return 0;
        });
      } else {
        setIsSort("desc");
        sorted = campaigns.sort((a, b) => {
          if (a[1].CampaignName < b[1].CampaignName) {
            return -1;
          }
          if (a[1].CampaignName > b[1].CampaignName) {
            return 1;
          }
          return 0;
        });
      }
      setCampaigns(sorted);
    } else if (sort === "campaignBy") {
      let sorted = [];
      if (IsSort === "desc") {
        setIsSort("asc");
        sorted = campaigns.sort((a, b) => {
          if (a[1].NonProfitRepID > b[1].NonProfitRepID) {
            return -1;
          }
          if (a[1].NonProfitRepID < b[1].NonProfitRepID) {
            return 1;
          }
          return 0;
        });
      } else {
        setIsSort("desc");
        sorted = campaigns.sort((a, b) => {
          if (a[1].NonProfitRepID < b[1].NonProfitRepID) {
            return -1;
          }
          if (a[1].NonProfitRepID > b[1].NonProfitRepID) {
            return 1;
          }
          return 0;
        });
      }
      setCampaigns(sorted);
    } else if (sort === "donations") {
      let sorted = [];
      if (IsSort === "desc") {
        setIsSort("asc");
        sorted = campaigns.sort((a, b) => {
          if (a[1].Donations > b[1].Donations) {
            return -1;
          }
          if (a[1].Donations < b[1].Donations) {
            return 1;
          }
          return 0;
        });
      } else {
        setIsSort("desc");
        sorted = campaigns.sort((a, b) => {
          if (a[1].Donations < b[1].Donations) {
            return -1;
          }
          if (a[1].Donations > b[1].Donations) {
            return 1;
          }
          return 0;
        });
      }
      setCampaigns(sorted);
    }
  };

  useEffect(() => {
    showCampaignsList();
  }, []);

  return (
    <div className="admin-homepage-container">
      <div className="admin-HLS">
        <div className="back-page-btn">
          <button
            className="btn btn-warning btn-sm"
            onClick={() => navigate("/admin/reports/users")}
          >
            Prev Report {"<"}
          </button>
        </div>
        <h1 className="reports">Campaigns Report</h1>
        <div className="next-page-btn">
          <button
            className="btn btn-warning btn-sm"
            onClick={() => navigate("/admin/reports/tweets")}
          >
            Next Report {">"}
          </button>
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">
              Campaign Name
              <ArrowDropDownOutlinedIcon
                className="dropdown-arr"
                onClick={() => sortReport("campaignName")}
              />
            </th>
            <th scope="col">Campaign Hash</th>
            <th scope="col">
              By
              <ArrowDropDownOutlinedIcon
                className="dropdown-arr"
                onClick={() => sortReport("campaignBy")}
              />
            </th>
            <th scope="col">Website</th>
            <th scope="col">
              Donations
              <ArrowDropDownOutlinedIcon
                className="dropdown-arr"
                onClick={() => sortReport("donations")}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {campaigns &&
            campaigns.map((campaign) => {
              return (
                <tr>
                  <td>{campaign[1].CampaignName}</td>
                  <td>{campaign[1].CampaignHash}</td>
                  <td>{campaign[1].NonProfitRepID}</td>
                  <td>
                    <a href={campaign[1].CampaignUrl}>
                      <LinkIcon />
                    </a>
                  </td>
                  <td>{campaign[1].DonationsAmount}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};
