import React from "react";
import { Routes, Route } from "react-router-dom";
import { About, AdminHomePage, ContactUs } from "../pagesIndex";
import {
  TweetsReports,
  CampaignsReports,
  UsersReports,
  Sidebar,
} from "../../components/compsIndex";
import { LastTweets } from "../LastTweets/LastTweets.page";
import "./style.css";
export const AdminDashboard = () => {
  return (
    <div className="admin-dash-container">
      <Sidebar />
      <Routes>
        <Route path="/" element={<AdminHomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/lasttweets" element={<LastTweets />} />
        <Route path="admin/reports/users" element={<UsersReports />} />
        <Route path="admin/reports/campaigns" element={<CampaignsReports />} />
        <Route path="admin/reports/tweets" element={<TweetsReports />} />
      </Routes>
    </div>
  );
};
