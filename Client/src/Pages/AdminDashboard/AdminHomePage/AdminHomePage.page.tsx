import React from "react";
import { AdminReportsBtn, CampaignsList } from "../../../components/compsIndex";
import "./style.css";

export const AdminHomePage = () => {
  return (
    <div className="admin-homepage-container">
      <h1 className="reports">Reports</h1>
      <div className="reports">
        <AdminReportsBtn />
      </div>

      <h1 className="runningCampaigns">Running Campaigns</h1>

      <div className="runningCampaigns">
        <CampaignsList />
      </div>
    </div>
  );
};
