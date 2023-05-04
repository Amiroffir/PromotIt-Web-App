import React, { useState, useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getCampaigns } from "../../services/General.services";
import { notify } from "../../services/Notifications.services";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import LinkIcon from "@mui/icons-material/Link";
import "./style.css";
import { CampaignsDict } from "../../interfaces/interfaces";
import { Notify } from "../../interfaces/enums";

export const CampaignsReports = () => {
  const [campaigns, setCampaigns] = useState<CampaignsDict[]>([]);
  const [IsSort, setIsSort] = useState<string>("Default");
  const navigate: NavigateFunction = useNavigate();

  const showCampaignsList = async (): Promise<void> => {
    await getCampaigns()
      .then((res: CampaignsDict[]) => {
        if (res !== null) {
          setCampaigns(res);
        } else {
          notify(Notify.Error, "Server is down, please try again later");
        }
      })
      .catch((err: Error) => {
        notify(Notify.Error, err.message);
      });
  };

  const sortReport = (sort: string): void => {
    if (sort === "campaignName") {
      let sorted: CampaignsDict[] = [];
      if (IsSort === "desc") {
        setIsSort("asc");
        sorted = campaigns.sort((a: CampaignsDict, b: CampaignsDict) => {
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
        sorted = campaigns.sort((a: CampaignsDict, b: CampaignsDict) => {
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
      let sorted: CampaignsDict[] = [];
      if (IsSort === "desc") {
        setIsSort("asc");
        sorted = campaigns.sort((a: CampaignsDict, b: CampaignsDict) => {
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
        sorted = campaigns.sort((a: CampaignsDict, b: CampaignsDict) => {
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
      let sorted: CampaignsDict[] = [];
      if (IsSort === "desc") {
        setIsSort("asc");
        sorted = campaigns.sort((a: CampaignsDict, b: CampaignsDict) => {
          if (a[1].DonationsAmount > b[1].DonationsAmount) {
            return -1;
          }
          if (a[1].DonationsAmount < b[1].DonationsAmount) {
            return 1;
          }
          return 0;
        });
      } else {
        setIsSort("desc");
        sorted = campaigns.sort((a: CampaignsDict, b: CampaignsDict) => {
          if (a[1].DonationsAmount < b[1].DonationsAmount) {
            return -1;
          }
          if (a[1].DonationsAmount > b[1].DonationsAmount) {
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
