import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { User, useAuth0 } from "@auth0/auth0-react";
import { checkFirstTime } from "../../services/General.services";
import {
  AddCampaign,
  ContactUs,
  NonProfitHomePage,
  About,
  LastTweets,
} from "../pagesIndex";
import {
  EditCampaign,
  MyCampaigns,
  Sidebar,
  FirstSignUp,
} from "../../components/compsIndex";
import "./style.css";

export const NonProfitRepDashboard = () => {
  const [showFirstSignUp, setFirstSignUp] = useState<boolean>(false);
  const { user }: User = useAuth0();

  useEffect(() => {
    checkFirstTime(user.email).then((res: boolean) => {
      if (res === false) setFirstSignUp(true);
    });
  }, []);

  return (
    <div className="nonProfit-dash-container">
      <Sidebar />
      <>
        {showFirstSignUp && (
          <FirstSignUp setFirstSignUp={setFirstSignUp}></FirstSignUp>
        )}
        <Routes>
          <Route path="/" element={<NonProfitHomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/lasttweets" element={<LastTweets />} />
          <Route path="nonProfit/myCampaigns" element={<MyCampaigns />} />
          <Route path="campaigns/addNew" element={<AddCampaign />} />
          <Route path="campaigns/edit/:campaignID" element={<EditCampaign />} />
        </Routes>
      </>
    </div>
  );
};
