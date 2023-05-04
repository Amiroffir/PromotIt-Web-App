import React from "react";
import { Link } from "react-router-dom";
import { CampaignsList } from "../../../components/compsIndex";
import "./style.css";

export const BizRepHomePage = () => {
  return (
    <div className="admin-homepage-container">
      <div className="delivs-container">
        <Link to="/bizrep/deliveries">
          <button className="btn btn-warning delivs-btn">
            Pending Deliveries
          </button>
        </Link>
      </div>
      <div className="runningCampaigns biz-campaigns">
        <h1 className="runningCampaigns">All Campaigns</h1>
        <CampaignsList />
      </div>
    </div>
  );
};
