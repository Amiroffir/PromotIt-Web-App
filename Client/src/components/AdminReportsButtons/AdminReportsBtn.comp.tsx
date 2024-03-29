import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import "./style.css";

export const AdminReportsBtn = () => {
  const navigate: NavigateFunction = useNavigate();

  const handleReports = (name: string): void => {
    navigate(`/admin/reports/${name}`, {
      state: { name },
    });
  };

  return (
    <div className="report-btn-container">
      <button
        onClick={() => handleReports("users")}
        className="btn btn-primary report-btn"
      >
        Users
      </button>

      <button
        onClick={() => handleReports("campaigns")}
        className="btn btn-primary report-btn"
      >
        Campaigns
      </button>

      <button
        onClick={() => handleReports("tweets")}
        className="btn btn-primary report-btn"
      >
        Tweets
      </button>
    </div>
  );
};
