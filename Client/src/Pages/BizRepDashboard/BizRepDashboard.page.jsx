import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Routes, Route } from "react-router-dom";
import {
  PendingDeliveries,
  FirstSignUp,
  Sidebar,
} from "../../components/compsIndex";
import {
  BizRepHomePage,
  ChosenCampaign,
  ContactUs,
  About,
  LastTweets,
} from "../pagesIndex";
import { checkFirstTime } from "../../services/General.services";
import "./style.css";

export const BizRepDashboard = () => {
  // Use effect to get the user's details from the database and decide if it's his first time or not
  // If it's his first time, show another registering page
  const [showFirstSignUp, setFirstSignUp] = useState(false);
  const { user } = useAuth0();

  useEffect(() => {
    console.log("user", user);
    checkFirstTime(user.email).then((res) => {
      console.log("res", res);
      if (res === false) setFirstSignUp(true);
    });
  }, []);

  return (
    <div className="biz-dash-container">
      <Sidebar />
      <>
        {showFirstSignUp && (
          <FirstSignUp setFirstSignUp={setFirstSignUp}></FirstSignUp>
        )}
        <Routes>
          <Route path="/" element={<BizRepHomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/lasttweets" element={<LastTweets />} />
          <Route path="campaigns/:campaignID" element={<ChosenCampaign />} />
          <Route path="bizrep/deliveries" element={<PendingDeliveries />} />
        </Routes>
      </>
    </div>
  );
};
