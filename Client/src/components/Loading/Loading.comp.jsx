import React from "react";
import { HashLoader } from "react-spinners";
import "./style.css";

export const Loading = () => {
  return (
    <div className="loading-container">
      <div className="spinner">
        <HashLoader size={120} color="#36d7b7" />
        <br />
        <h1 className="loading">Loading...</h1>
      </div>
    </div>
  );
};
