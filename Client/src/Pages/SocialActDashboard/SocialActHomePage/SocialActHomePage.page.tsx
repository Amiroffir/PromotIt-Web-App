import React from "react";
import { CampaignsList } from "../../../components/compsIndex";

import "./style.css";

export const SocialActHomePage = () => {
  return (
    <div className="admin-homepage-container">
      <div className="runningCampaigns">
        {}

        <h1 className="runningCampaigns">All Campaigns</h1>
        <CampaignsList />
      </div>
    </div>
  );
};
