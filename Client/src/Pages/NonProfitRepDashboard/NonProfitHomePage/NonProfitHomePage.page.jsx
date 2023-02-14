import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpwardRounded } from "@mui/icons-material";
import { CampaignsList } from "../../../components/compsIndex";
import "./style.css";

export const NonProfitHomePage = () => {
  return (
    <div className="admin-homepage-container">
      <div className="nonProfit-homepage-bottom">
        <div className="nonProfit-homepage-bottom-left">
          <h1>My Campaigns</h1>
          <Link to="nonProfit/myCampaigns">
            <div className="my-arrows">
              <ArrowUpwardRounded className="arrow" />
            </div>
          </Link>
        </div>
        <div className="nonProfit-homepage-bottom-right">
          <h1>Add Campaign</h1>
          <Link to="campaigns/addNew">
            <div className="my-arrows">
              <ArrowUpwardRounded className="arrow" />
            </div>
          </Link>
        </div>
      </div>
      <div className="campaigns-non">
        <h1 className="reports">All Campaigns</h1>
        <CampaignsList />
      </div>
    </div>
  );
};
